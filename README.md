# Rental Platform

A comprehensive rental services platform with admin panels, built with Node.js, Express, MongoDB, and React.

## Features

### User Features
- **Authentication & Authorization**: Secure user registration, login, and role-based access control
- **Property Browsing**: Search, filter, and browse rental properties
- **Property Details**: Detailed property information with images, amenities, and pricing
- **Booking System**: Easy booking process with date selection and guest management
- **User Dashboard**: Personal dashboard with booking history and statistics
- **Profile Management**: Complete user profile with addresses and preferences
- **Reviews & Ratings**: Leave reviews for properties and hosts
- **Payment Integration**: Secure payment processing with Stripe

### Admin Features
- **Admin Dashboard**: Comprehensive admin panel with analytics
- **User Management**: Manage users, roles, and permissions
- **Property Management**: Approve, edit, and manage property listings
- **Booking Management**: View and manage all bookings
- **Analytics & Reports**: Detailed insights and reporting
- **Content Moderation**: Review and moderate user-generated content

## Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **Stripe**: Payment processing
- **Cloudinary**: Image storage
- **Nodemailer**: Email services

### Frontend
- **React**: UI library
- **TypeScript**: Type safety
- **Material-UI**: Component library
- **React Router**: Navigation
- **React Hook Form**: Form handling
- **Yup**: Form validation
- **Axios**: HTTP client

## Project Structure

```
rental-platform/
├── server.js                 # Main server file
├── package.json              # Backend dependencies
├── .env.example              # Environment variables template
├── models/                   # Database models
│   ├── User.js
│   ├── Property.js
│   ├── Booking.js
│   └── Review.js
├── routes/                   # API routes
│   ├── auth.js
│   ├── users.js
│   ├── properties.js
│   ├── bookings.js
│   └── admin.js
├── middleware/               # Custom middleware
│   └── auth.js
├── utils/                    # Utility functions
│   └── emailService.js
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main App component
│   └── package.json         # Frontend dependencies
└── uploads/                  # File uploads directory
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd rental-platform
```

2. Install backend dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/rental_platform
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:3000
```

5. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install frontend dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

5. Start the frontend development server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/verify-email` - Verify email

### Properties
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/properties` - Get all properties
- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/stats` - Get platform statistics

## Usage

### For Users
1. Register an account or log in
2. Browse properties using search and filters
3. View property details and availability
4. Make a booking with secure payment
5. Manage bookings and leave reviews
6. Update profile and preferences

### For Admins
1. Log in with admin credentials
2. Access the admin dashboard
3. Manage users, properties, and bookings
4. View analytics and reports
5. Moderate content and handle disputes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please email support@rentalplatform.com or create an issue in the repository.

## Future Enhancements

- Real-time notifications
- Advanced search with map integration
- Mobile app development
- Multi-language support
- Advanced analytics dashboard
- Property management tools for hosts
- Integration with external booking platforms
- Smart pricing recommendations
- AI-powered property recommendations
