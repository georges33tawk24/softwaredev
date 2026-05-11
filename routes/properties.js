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

// Update property
router.put('/:id', protect, async (req, res) => {
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

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedProperty
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
