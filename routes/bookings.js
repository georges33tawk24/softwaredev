const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Property = require('../models/Property');
const { protect } = require('../middleware/auth');

// Get user bookings
router.get('/', protect, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const filter = { guest: req.user._id };
    if (status) filter.status = status;

    const bookings = await Booking.find(filter)
      .populate('property', 'title images location pricing')
      .populate('owner', 'firstName lastName email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Booking.countDocuments(filter);

    res.json({
      success: true,
      data: bookings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
});

// Get booking by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('property')
      .populate('guest', 'firstName lastName email phone')
      .populate('owner', 'firstName lastName email phone');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns the booking or is the property owner
    if (booking.guest._id.toString() !== req.user._id.toString() && 
        booking.owner._id.toString() !== req.user._id.toString() &&
        !['admin', 'super_admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ message: 'Server error while fetching booking' });
  }
});

// Create new booking
router.post('/', protect, async (req, res) => {
  try {
    const { propertyId, dates, guests } = req.body;

    // Check if property exists and is available
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (!property.availability.available) {
      return res.status(400).json({ message: 'Property is not available' });
    }

    // Calculate pricing
    const checkIn = new Date(dates.checkIn);
    const checkOut = new Date(dates.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    const subtotal = property.pricing.nightly * nights;
    const cleaningFee = property.pricing.cleaningFee || 0;
    const serviceFee = property.pricing.serviceFee || 0;
    const taxes = subtotal * 0.1; // 10% tax
    const total = subtotal + cleaningFee + serviceFee + taxes;

    const bookingData = {
      property: propertyId,
      guest: req.user._id,
      owner: property.owner,
      dates: {
        checkIn,
        checkOut
      },
      pricing: {
        nightlyRate: property.pricing.nightly,
        nights,
        subtotal,
        cleaningFee,
        serviceFee,
        taxes,
        securityDeposit: property.pricing.securityDeposit || 0,
        total,
        currency: property.pricing.currency
      },
      guests,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: req.body.paymentMethod,
      specialRequests: req.body.specialRequests || []
    };

    const booking = await Booking.create(bookingData);

    // Populate the booking before returning
    await booking.populate('property', 'title images location pricing');
    await booking.populate('owner', 'firstName lastName email phone');

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error while creating booking' });
  }
});

// Update booking
router.put('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns the booking or is admin
    if (booking.guest.toString() !== req.user._id.toString() && 
        !['admin', 'super_admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedBooking
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ message: 'Server error while updating booking' });
  }
});

// Cancel booking
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user can cancel the booking
    const canCancel = booking.guest.toString() === req.user._id.toString() || 
                     booking.owner.toString() === req.user._id.toString() ||
                     ['admin', 'super_admin'].includes(req.user.role);

    if (!canCancel) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if booking can be cancelled (not in the past)
    const now = new Date();
    const checkIn = new Date(booking.dates.checkIn);
    if (now > checkIn) {
      return res.status(400).json({ message: 'Cannot cancel past bookings' });
    }

    booking.status = 'cancelled';
    booking.cancellation = {
      reason: req.body.reason || 'User cancelled',
      cancelledBy: req.user._id,
      cancelledAt: new Date()
    };

    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Server error while cancelling booking' });
  }
});

module.exports = router;
