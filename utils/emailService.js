const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    const port = Number(process.env.EMAIL_PORT) || 587;
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 8000,
    });
  }

  async sendEmail(options) {
    try {
      const mailOptions = {
        from: `"Rental Platform" <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  }

  async sendWelcomeEmail(user) {
    const html = `
      <h2>Welcome to Rental Platform!</h2>
      <p>Hi ${user.firstName},</p>
      <p>Thank you for joining our rental platform. Your account has been successfully created.</p>
      <p>You can now:</p>
      <ul>
        <li>Browse available properties</li>
        <li>Make bookings</li>
        <li>Manage your profile</li>
        <li>Leave reviews</li>
      </ul>
      <p>If you have any questions, feel free to contact our support team.</p>
      <p>Best regards,<br>Rental Platform Team</p>
    `;

    return this.sendEmail({
      to: user.email,
      subject: 'Welcome to Rental Platform!',
      html,
      text: `Welcome to Rental Platform! Hi ${user.firstName}, thank you for joining our platform.`
    });
  }

  async sendPasswordResetEmail(user, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    const html = `
      <h2>Password Reset Request</h2>
      <p>Hi ${user.firstName},</p>
      <p>You requested a password reset for your account. Click the link below to reset your password:</p>
      <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>This link will expire in 10 minutes.</p>
      <p>If you didn't request this password reset, please ignore this email.</p>
      <p>Best regards,<br>Rental Platform Team</p>
    `;

    return this.sendEmail({
      to: user.email,
      subject: 'Password Reset - Rental Platform',
      html,
      text: `Password reset link: ${resetUrl}`
    });
  }

  async sendBookingConfirmationEmail(user, booking, property) {
    const html = `
      <h2>Booking Confirmed!</h2>
      <p>Hi ${user.firstName},</p>
      <p>Your booking has been confirmed. Here are the details:</p>
      <div style="border: 1px solid #ddd; padding: 20px; margin: 20px 0;">
        <h3>${property.title}</h3>
        <p><strong>Booking Number:</strong> ${booking.bookingNumber}</p>
        <p><strong>Check-in:</strong> ${new Date(booking.dates.checkIn).toLocaleDateString()}</p>
        <p><strong>Check-out:</strong> ${new Date(booking.dates.checkOut).toLocaleDateString()}</p>
        <p><strong>Total Amount:</strong> $${booking.pricing.total}</p>
        <p><strong>Guests:</strong> ${booking.guests.adults} adults${booking.guests.children > 0 ? `, ${booking.guests.children} children` : ''}</p>
      </div>
      <p>You can view your booking details in your dashboard.</p>
      <p>Best regards,<br>Rental Platform Team</p>
    `;

    return this.sendEmail({
      to: user.email,
      subject: `Booking Confirmed - ${booking.bookingNumber}`,
      html,
      text: `Booking confirmed! Booking Number: ${booking.bookingNumber}`
    });
  }

  async sendBookingNotificationEmail(owner, booking, property, guest) {
    const html = `
      <h2>New Booking Received!</h2>
      <p>Hi ${owner.firstName},</p>
      <p>You have received a new booking for your property:</p>
      <div style="border: 1px solid #ddd; padding: 20px; margin: 20px 0;">
        <h3>${property.title}</h3>
        <p><strong>Guest:</strong> ${guest.firstName} ${guest.lastName}</p>
        <p><strong>Check-in:</strong> ${new Date(booking.dates.checkIn).toLocaleDateString()}</p>
        <p><strong>Check-out:</strong> ${new Date(booking.dates.checkOut).toLocaleDateString()}</p>
        <p><strong>Total Amount:</strong> $${booking.pricing.total}</p>
      </div>
      <p>Please log in to your dashboard to manage this booking.</p>
      <p>Best regards,<br>Rental Platform Team</p>
    `;

    return this.sendEmail({
      to: owner.email,
      subject: `New Booking - ${booking.bookingNumber}`,
      html,
      text: `New booking received! Booking Number: ${booking.bookingNumber}`
    });
  }

  async sendVerificationEmail(user, verificationToken) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
    
    const html = `
      <h2>Email Verification</h2>
      <p>Hi ${user.firstName},</p>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
      <p>Best regards,<br>Rental Platform Team</p>
    `;

    return this.sendEmail({
      to: user.email,
      subject: 'Verify Your Email - Rental Platform',
      html,
      text: `Verify your email: ${verificationUrl}`
    });
  }
}

module.exports = new EmailService();
