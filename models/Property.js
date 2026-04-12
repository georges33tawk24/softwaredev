const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Property description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['apartment', 'house', 'villa', 'condo', 'studio', 'loft', 'cabin', 'commercial', 'office', 'storage', 'vehicle', 'equipment', 'other']
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['residential', 'commercial', 'vacation', 'short_term', 'long_term', 'vehicle', 'equipment']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    zipCode: {
      type: String,
      required: [true, 'ZIP code is required']
    },
    country: {
      type: String,
      required: [true, 'Country is required']
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  pricing: {
    nightly: {
      type: Number,
      required: [true, 'Nightly rate is required'],
      min: [0, 'Price must be positive']
    },
    weekly: {
      type: Number,
      min: [0, 'Price must be positive']
    },
    monthly: {
      type: Number,
      min: [0, 'Price must be positive']
    },
    securityDeposit: {
      type: Number,
      min: [0, 'Deposit must be positive']
    },
    cleaningFee: {
      type: Number,
      min: [0, 'Cleaning fee must be positive']
    },
    serviceFee: {
      type: Number,
      min: [0, 'Service fee must be positive']
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  amenities: [{
    type: String,
    enum: [
      'wifi', 'parking', 'pool', 'gym', 'air_conditioning', 'heating',
      'kitchen', 'laundry', 'tv', 'workspace', 'pet_friendly', 'smoking_allowed',
      'wheelchair_accessible', 'elevator', 'balcony', 'garden', 'security',
      'power_backup', 'water_heater', 'refrigerator', 'microwave', 'dishwasher',
      'oven', 'coffee_maker', 'toaster', 'blender', 'iron', 'hair_dryer'
    ]
  }],
  images: [{
    url: String,
    public_id: String,
    caption: String,
    isPrimary: { type: Boolean, default: false }
  }],
  availability: {
    available: { type: Boolean, default: true },
    blockedDates: [Date],
    minStay: { type: Number, default: 1 },
    maxStay: { type: Number, default: 365 },
    checkInTime: { type: String, default: '15:00' },
    checkOutTime: { type: String, default: '11:00' }
  },
  capacity: {
    guests: { type: Number, required: [true, 'Guest capacity is required'], min: 1 },
    bedrooms: { type: Number, min: 0 },
    beds: { type: Number, min: 0 },
    bathrooms: { type: Number, min: 0 }
  },
  rules: [{
    type: String,
    trim: true
  }],
  policies: {
    cancellation: {
      type: String,
      enum: ['flexible', 'moderate', 'strict', 'super_strict'],
      default: 'moderate'
    },
    checkInInstructions: String,
    checkOutInstructions: String,
    houseRules: [String]
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'inactive', 'suspended', 'deleted'],
    default: 'active'
  },
  featured: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  stats: {
    views: { type: Number, default: 0 },
    bookings: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 }
  },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true },
    response: {
      text: String,
      respondedAt: Date,
      respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    createdAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Index for search functionality
propertySchema.index({ 'location.city': 1, category: 1, status: 1 });
propertySchema.index({ 'pricing.nightly': 1 });
propertySchema.index({ 'stats.averageRating': -1 });

// Virtual for average rating calculation
propertySchema.virtual('averageRating').get(function() {
  if (this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / this.reviews.length).toFixed(1);
});

// Method to check availability for dates
propertySchema.methods.isAvailable = function(startDate, endDate) {
  const requestedStart = new Date(startDate);
  const requestedEnd = new Date(endDate);
  
  return !this.availability.blockedDates.some(blockedDate => {
    const blocked = new Date(blockedDate);
    return blocked >= requestedStart && blocked <= requestedEnd;
  });
};

module.exports = mongoose.model('Property', propertySchema);
