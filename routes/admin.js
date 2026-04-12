const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Property = require('../models/Property');
const Booking = require('../models/Booking');
const { protect, authorize } = require('../middleware/auth');

// Get platform statistics
router.get('/stats', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const adminUsers = await User.countDocuments({ role: { $in: ['admin', 'super_admin'] } });
    
    const totalProperties = await Property.countDocuments();
    const activeProperties = await Property.countDocuments({ status: 'active' });
    
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    
    // Calculate total revenue
    const revenueResult = await Booking.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$pricing.total' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // Get recent users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('firstName lastName email createdAt isVerified role');

    // Get recent bookings
    const recentBookings = await Booking.find()
      .populate('property', 'title')
      .populate('guest', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get top properties
    const topProperties = await Property.find({ status: 'active' })
      .sort({ 'stats.revenue': -1 })
      .limit(5)
      .select('title stats.revenue stats.bookings stats.averageRating');

    res.json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          verified: verifiedUsers,
          admin: adminUsers,
          unverified: totalUsers - verifiedUsers
        },
        properties: {
          total: totalProperties,
          active: activeProperties
        },
        bookings: {
          total: totalBookings,
          pending: pendingBookings,
          completed: completedBookings
        },
        revenue: totalRevenue,
        recentUsers,
        recentBookings,
        topProperties
      }
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ message: 'Server error while fetching admin statistics' });
  }
});

// Get all users with pagination and filtering
router.get('/users', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      role,
      verified,
      search
    } = req.query;

    const filter = {};
    if (role) filter.role = role;
    if (verified !== undefined) filter.isVerified = verified === 'true';
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      data: users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get admin users error:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
});

// Update user role
router.put('/users/:id/role', protect, authorize('super_admin'), async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['user', 'admin', 'super_admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ message: 'Server error while updating user role' });
  }
});

// Delete user
router.delete('/users/:id', protect, authorize('super_admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent super admin from deleting themselves
    if (req.user._id.toString() === user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error while deleting user' });
  }
});

// Get all properties
router.get('/properties', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      category,
      search
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } },
        { 'location.state': { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const properties = await Property.find(filter)
      .populate('owner', 'firstName lastName email')
      .sort({ createdAt: -1 })
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
    console.error('Get admin properties error:', error);
    res.status(500).json({ message: 'Server error while fetching properties' });
  }
});

// Update property status
router.put('/properties/:id/status', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['draft', 'active', 'inactive', 'suspended'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Update property status error:', error);
    res.status(500).json({ message: 'Server error while updating property status' });
  }
});

// Get all bookings
router.get('/bookings', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      paymentStatus
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const skip = (Number(page) - 1) * Number(limit);

    const bookings = await Booking.find(filter)
      .populate('property', 'title')
      .populate('guest', 'firstName lastName email')
      .populate('owner', 'firstName lastName email')
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
    console.error('Get admin bookings error:', error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
});

module.exports = router;
