# Figma Design Specifications - Rental Properties Platform

## Design System

### Color Palette
- **Primary:** #3B82F6 (Blue)
- **Secondary:** #10B981 (Green) 
- **Accent:** #F59E0B (Amber)
- **Neutral:** #6B7280 (Gray)
- **Background:** #FFFFFF (White)
- **Dark Background:** #1F2937 (Dark Gray)
- **Text Primary:** #111827 (Dark Gray)
- **Text Secondary:** #6B7280 (Gray)

### Typography
- **Headings:** Inter, 600 weight
- **Body Text:** Inter, 400 weight
- **Buttons:** Inter, 500 weight
- **H1:** 32px
- **H2:** 24px
- **H3:** 20px
- **Body:** 16px
- **Small:** 14px

### Spacing System
- **XS:** 4px
- **SM:** 8px
- **MD:** 16px
- **LG:** 24px
- **XL:** 32px
- **2XL:** 48px

### Components

#### Buttons
- **Primary:** Blue background, white text, 8px border radius
- **Secondary:** White background, blue border, blue text
- **Outline:** Transparent background, blue border, blue text
- **Ghost:** Transparent background, blue text

#### Cards
- **Base:** White background, subtle shadow, 12px border radius
- **Hover:** Slightly elevated shadow
- **Padding:** 24px

#### Form Elements
- **Input Fields:** White background, gray border, 8px border radius
- **Focus State:** Blue border, blue shadow
- **Labels:** Gray text, 14px, medium weight

## Page Layouts

### 1. Homepage/Landing Page

#### Header (64px height)
- Logo left
- Navigation center (Properties, About, Contact)
- User actions right (Login, Sign Up, Host Property button)

#### Hero Section
- Background: Light gradient
- Headline: "Find Your Perfect Rental"
- Subheadline: "Discover amazing properties for rent in your area"
- Search bar with location, property type, price range
- CTA: "Search Properties" button

#### Featured Properties
- Grid layout (3 columns on desktop)
- Property cards with image, title, price, location, rating
- "View All Properties" button

#### Categories
- Horizontal scroll of property type icons
- Apartments, Houses, Condos, Studios, Townhouses

#### Trust Indicators
- Stats: "500+ Properties", "10,000+ Happy Tenants", "50+ Cities"
- Testimonials carousel

#### Footer
- Company info, links, social media, copyright

### 2. Property Search Results Page

#### Header
- Breadcrumb navigation
- Search bar with filters
- Sort dropdown (Price, Distance, Rating)

#### Sidebar Filters (280px width)
- Price range slider
- Property type checkboxes
- Amenities checkboxes
- Bedrooms/Bathrooms dropdown
- More filters accordion

#### Main Content
- Grid of property cards (2-3 columns)
- Pagination at bottom
- Map view toggle button

#### Property Card
- Image (300x200px)
- Price per month
- Property title
- Location with pin icon
- Bedrooms, Bathrooms, Square footage
- Rating stars
- Save heart icon

### 3. Property Detail Page

#### Image Gallery
- Main image (800x500px)
- Thumbnail carousel below
- Virtual tour button

#### Property Information
- Price and availability status
- Property title and address
- Share and save buttons

#### Key Details Grid
- 4 columns: Bedrooms, Bathrooms, Square Feet, Year Built
- 4 columns: Property Type, Parking, Furnished, Pet Policy

#### Description Tabs
- Overview tab with full description
- Amenities list with icons
- Location with map
- Reviews section
- Host information

#### Booking Card (sticky)
- Check-in/Check-out dates
- Number of guests
- Price breakdown
- "Book Now" button

### 4. User Dashboard

#### Navigation Sidebar
- Profile
- My Properties
- Bookings
- Favorites
- Messages
- Settings

#### Main Content Area
- Welcome message
- Quick stats cards
- Recent activity
- Upcoming bookings

#### My Properties Section
- List of user's properties
- Edit, delete, view analytics buttons
- Add new property button

### 5. Host Property Form

#### Multi-step Form
- Step 1: Basic Information (title, type, address)
- Step 2: Property Details (bedrooms, bathrooms, amenities)
- Step 3: Photos (upload with drag-and-drop)
- Step 4: Pricing & Availability
- Step 5: House Rules & Description

#### Progress Bar
- Visual indicator of current step
- Clickable steps for navigation

### 6. Authentication Pages

#### Login Page
- Centered form card
- Email and password fields
- "Forgot password" link
- Social login buttons (Google, Facebook)
- "Sign up" link at bottom

#### Sign Up Page
- Multi-step registration
- Personal information
- Account type selection (Tenant/Host)
- Email verification

## Mobile Responsive Design

### Breakpoints
- **Mobile:** 320px - 768px
- **Tablet:** 768px - 1024px
- **Desktop:** 1024px+

### Mobile Adaptations
- Single column layouts
- Hamburger menu for navigation
- Touch-friendly button sizes (44px minimum)
- Simplified forms
- Bottom navigation for key actions

## Micro-interactions

#### Button States
- Hover: Scale 1.02, shadow increase
- Active: Scale 0.98
- Loading: Spinner with disabled state

#### Card Interactions
- Hover: Elevate with shadow, scale 1.01
- Save button: Heart animation when clicked

#### Form Validation
- Real-time validation feedback
- Success checkmarks
- Error states with red borders

## Icon Library
- Use Lucide React icons
- Consistent sizing: 16px, 20px, 24px
- Color usage: Primary blue for actions, gray for inactive

## Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader friendly labels
- High contrast mode support
- Focus indicators on all interactive elements

## Loading States
- Skeleton screens for content loading
- Progress bars for file uploads
- Spinners for button actions
- Empty states with illustrations

## Error Handling
- 404 page with search suggestions
- Network error notifications
- Form validation messages
- Modal dialogs for confirmations
