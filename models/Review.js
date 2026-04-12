const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['property', 'host', 'guest'],
    required: true
  },
  rating: {
    overall: { type: Number, required: true, min: 1, max: 5 },
    cleanliness: { type: Number, min: 1, max: 5 },
    communication: { type: Number, min: 1, max: 5 },
    checkIn: { type: Number, min: 1, max: 5 },
    accuracy: { type: Number, min: 1, max: 5 },
    location: { type: Number, min: 1, max: 5 },
    value: { type: Number, min: 1, max: 5 }
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  images: [{
    url: String,
    public_id: String,
    caption: String
  }],
  helpful: {
    count: { type: Number, default: 0 },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  response: {
    text: String,
    respondedAt: Date,
    respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  status: {
    type: String,
    enum: ['pending', 'published', 'hidden', 'flagged'],
    default: 'pending'
  },
  flags: [{
    reason: String,
    flaggedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    flaggedAt: { type: Date, default: Date.now }
  }],
  verified: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Index for efficient queries
reviewSchema.index({ property: 1, status: 1 });
reviewSchema.index({ reviewer: 1, type: 1 });
reviewSchema.index({ reviewee: 1, type: 1 });
reviewSchema.index({ 'rating.overall': -1 });

// Ensure one review per booking per type
reviewSchema.index({ booking: 1, type: 1 }, { unique: true });

// Virtual for average rating
reviewSchema.virtual('averageRating').get(function() {
  const ratings = Object.values(this.rating).filter(r => typeof r === 'number');
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return (sum / ratings.length).toFixed(1);
});

// Method to mark as helpful
reviewSchema.methods.markHelpful = function(userId) {
  if (!this.helpful.users.includes(userId)) {
    this.helpful.users.push(userId);
    this.helpful.count += 1;
  }
  return this.save();
};

// Method to remove helpful vote
reviewSchema.methods.removeHelpful = function(userId) {
  const index = this.helpful.users.indexOf(userId);
  if (index > -1) {
    this.helpful.users.splice(index, 1);
    this.helpful.count -= 1;
  }
  return this.save();
};

module.exports = mongoose.model('Review', reviewSchema);
