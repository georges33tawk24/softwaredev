const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const { protect } = require('../middleware/auth');

function escapeRegex(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Get all properties with filters
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      location,
      search,
      category,
      type,
      minPrice,
      maxPrice,
      guests,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = { status: 'active' };

    const searchTerm = (search || location || '').trim();
    if (searchTerm) {
      const rx = escapeRegex(searchTerm);
      filter.$or = [
        { title: { $regex: rx, $options: 'i' } },
        { description: { $regex: rx, $options: 'i' } },
        { 'location.address': { $regex: rx, $options: 'i' } },
        { 'location.city': { $regex: rx, $options: 'i' } },
        { 'location.state': { $regex: rx, $options: 'i' } },
        { 'location.country': { $regex: rx, $options: 'i' } }
      ];
    }
    
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (minPrice || maxPrice) {
      filter['pricing.nightly'] = {};
      if (minPrice) filter['pricing.nightly'].$gte = Number(minPrice);
      if (maxPrice) filter['pricing.nightly'].$lte = Number(maxPrice);
    }
    if (guests) filter['capacity.guests'] = { $gte: Number(guests) };

    const skip = (Number(page) - 1) * Number(limit);

    const properties = await Property.find(filter)
      .populate('owner', 'firstName lastName email')
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Property.countDocuments(filter);

    res.json({
      success: true,
      data: properties,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ message: 'Server error while fetching properties' });
  }
});

// Get property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'firstName lastName email phone')
      .populate('reviews.user', 'firstName lastName');

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ message: 'Server error while fetching property' });
  }
});

// Create new property
router.post('/', protect, async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      owner: req.user._id
    };

    const property = await Property.create(propertyData);
    
    res.status(201).json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ message: 'Server error while creating property' });
  }
});

// Update property (partial merge — avoids wiping nested docs when admin edits a few fields)
router.put('/:id', protect, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.owner.toString() !== req.user._id.toString() &&
        !['admin', 'super_admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const $set = {};
    const b = req.body;

    if (b.title !== undefined) $set.title = b.title;
    if (b.description !== undefined) $set.description = b.description;
    if (b.category !== undefined) $set.category = b.category;
    if (b.type !== undefined) $set.type = b.type;
    if (b.status !== undefined) $set.status = b.status;
    if (b.featured !== undefined) $set.featured = b.featured;
    if (b.verified !== undefined) $set.verified = b.verified;
    if (b.amenities !== undefined) $set.amenities = b.amenities;

    if (b.location && typeof b.location === 'object') {
      const loc = b.location;
      if (loc.address !== undefined) $set['location.address'] = loc.address;
      if (loc.city !== undefined) $set['location.city'] = loc.city;
      if (loc.state !== undefined) $set['location.state'] = loc.state;
      if (loc.zipCode !== undefined) $set['location.zipCode'] = loc.zipCode;
      if (loc.country !== undefined) $set['location.country'] = loc.country;
      if (loc.coordinates !== undefined) $set['location.coordinates'] = loc.coordinates;
    }

    if (b.pricing && typeof b.pricing === 'object') {
      const p = b.pricing;
      if (p.nightly !== undefined) $set['pricing.nightly'] = Number(p.nightly);
      if (p.weekly !== undefined) $set['pricing.weekly'] = p.weekly;
      if (p.monthly !== undefined) $set['pricing.monthly'] = p.monthly;
      if (p.currency !== undefined) $set['pricing.currency'] = p.currency;
      if (p.cleaningFee !== undefined) $set['pricing.cleaningFee'] = p.cleaningFee;
      if (p.serviceFee !== undefined) $set['pricing.serviceFee'] = p.serviceFee;
      if (p.securityDeposit !== undefined) $set['pricing.securityDeposit'] = p.securityDeposit;
    }

    if (b.capacity && typeof b.capacity === 'object') {
      const c = b.capacity;
      if (c.guests !== undefined) $set['capacity.guests'] = c.guests;
      if (c.bedrooms !== undefined) $set['capacity.bedrooms'] = c.bedrooms;
      if (c.beds !== undefined) $set['capacity.beds'] = c.beds;
      if (c.bathrooms !== undefined) $set['capacity.bathrooms'] = c.bathrooms;
    }

    if (b.availability && typeof b.availability === 'object') {
      Object.keys(b.availability).forEach((k) => {
        $set[`availability.${k}`] = b.availability[k];
      });
    }

    if (b.policies && typeof b.policies === 'object') {
      Object.keys(b.policies).forEach((k) => {
        $set[`policies.${k}`] = b.policies[k];
      });
    }

    if (Object.keys($set).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { $set },
      { new: true, runValidators: true }
    ).populate('owner', 'firstName lastName email');

    res.json({
      success: true,
      data: updatedProperty,
    });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({ message: 'Server error while updating property' });
  }
});

// Delete property
router.delete('/:id', protect, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check if user owns the property or is admin
    if (property.owner.toString() !== req.user._id.toString() && 
        !['admin', 'super_admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({ message: 'Server error while deleting property' });
  }
});

module.exports = router;
