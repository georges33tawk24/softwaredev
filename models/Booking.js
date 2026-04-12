const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingNumber: {
    type: String,
    required: true,
    unique: true,
    default: function() {
      return 'BK' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    }
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dates: {
    checkIn: {
      type: Date,
      required: [true, 'Check-in date is required']
    },
    checkOut: {
      type: Date,
      required: [true, 'Check-out date is required']
    }
  },
  pricing: {
    nightlyRate: { type: Number, required: true },
    nights: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    cleaningFee: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 },
    taxes: { type: Number, default: 0 },
    securityDeposit: { type: Number, default: 0 },
    total: { type: Number, required: true },
    currency: { type: String, default: 'USD' }
  },
  guests: {
    adults: { type: Number, required: true, min: 1 },
    children: { type: Number, default: 0, min: 0 },
    infants: { type: Number, default: 0, min: 0 }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'paid', 'cancelled', 'completed', 'refunded'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash'],
    required: true
  },
  paymentDetails: {
    stripePaymentIntentId: String,
    stripeChargeId: String,
    transactionId: String,
    paidAt: Date,
    refundedAt: Date,
    refundAmount: Number,
    refundReason: String
  },
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    timestamp: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false }
  }],
  reviews: {
    guestReview: {
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      createdAt: Date
    },
    propertyReview: {
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      createdAt: Date
    },
    hostReview: {
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      createdAt: Date
    }
  },
  cancellation: {
    reason: String,
    cancelledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cancelledAt: Date,
    refundAmount: Number,
    refundPolicy: String
  },
  specialRequests: [String],
  notes: String,
  checkInInstructions: String,
  checkOutInstructions: String,
  documents: [{
    type: { type: String, enum: ['contract', 'invoice', 'receipt', 'other'] },
    url: String,
    name: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  timeline: [{
    event: { type: String, required: true },
    description: String,
    timestamp: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }]
}, {
  timestamps: true
});

// Index for efficient queries
bookingSchema.index({ property: 1, 'dates.checkIn': -1 });
bookingSchema.index({ guest: 1, status: 1 });
bookingSchema.index({ owner: 1, status: 1 });
bookingSchema.index({ bookingNumber: 1 });

// Virtual for duration in nights
bookingSchema.virtual('duration').get(function() {
  const checkIn = new Date(this.dates.checkIn);
  const checkOut = new Date(this.dates.checkOut);
  const diffTime = Math.abs(checkOut - checkIn);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Pre-save middleware to validate dates
bookingSchema.pre('save', function(next) {
  if (this.dates.checkIn >= this.dates.checkOut) {
    return next(new Error('Check-out date must be after check-in date'));
  }
  next();
});

// Method to add timeline event
bookingSchema.methods.addTimelineEvent = function(event, description, user) {
  this.timeline.push({
    event,
    description,
    user,
    timestamp: new Date()
  });
  return this.save();
};

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const checkIn = new Date(this.dates.checkIn);
  const hoursUntilCheckIn = (checkIn - now) / (1000 * 60 * 60);
  
  // Can cancel if more than 24 hours before check-in
  return hoursUntilCheckIn > 24 && ['pending', 'confirmed', 'paid'].includes(this.status);
};

module.exports = mongoose.model('Booking', bookingSchema);
