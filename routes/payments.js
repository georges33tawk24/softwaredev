const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

// Create payment intent
router.post('/create-payment-intent', protect, async (req, res) => {
  try {
    const { bookingId, amount, currency = 'usd' } = req.body;

    // Verify booking exists and belongs to user
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.guest.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        bookingId: booking._id.toString(),
        bookingNumber: booking.bookingNumber
      }
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({ message: 'Server error while creating payment intent' });
  }
});

// Confirm payment
router.post('/confirm-payment', protect, async (req, res) => {
  try {
    const { paymentIntentId, bookingId } = req.body;

    // Verify payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment not successful' });
    }

    // Update booking payment status
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        paymentStatus: 'paid',
        paymentDetails: {
          stripePaymentIntentId: paymentIntentId,
          stripeChargeId: paymentIntent.charges.data[0]?.id,
          transactionId: paymentIntent.id,
          paidAt: new Date()
        },
        status: 'confirmed'
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({
      success: true,
      message: 'Payment confirmed successfully',
      booking
    });
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({ message: 'Server error while confirming payment' });
  }
});

// Get payment methods
router.get('/payment-methods', protect, async (req, res) => {
  try {
    // This would typically integrate with a payment provider
    // For now, return basic payment methods
    res.json({
      success: true,
      paymentMethods: [
        {
          id: 'card',
          type: 'credit_card',
          brand: 'Visa',
          last4: '4242',
          expiryMonth: '12',
          expiryYear: '2025',
          isDefault: true
        }
      ]
    });
  } catch (error) {
    console.error('Get payment methods error:', error);
    res.status(500).json({ message: 'Server error while fetching payment methods' });
  }
});

module.exports = router;
