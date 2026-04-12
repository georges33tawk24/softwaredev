# Rental Platform - Figma Design Specification

## Design System

### Color Palette
```css
/* Primary Colors */
Primary: #1976d2 (Material Blue 700)
Primary Light: #42a5f5 (Material Blue 400)
Primary Dark: #1565c0 (Material Blue 800)

/* Secondary Colors */
Secondary: #dc004e (Material Pink A400)
Secondary Light: #ff5983 (Material Pink A200)
Secondary Dark: #9a0036 (Material Pink A700)

/* Neutral Colors */
White: #ffffff
Grey 50: #fafafa
Grey 100: #f5f5f5
Grey 200: #eeeeee
Grey 300: #e0e0e0
Grey 500: #9e9e9e
Grey 700: #616161
Grey 900: #212121

/* Status Colors */
Success: #4caf50
Warning: #ff9800
Error: #f44336
Info: #2196f3

/* Gradient */
Hero Gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
```

### Typography
```css
/* Font Family */
Primary: Roboto, sans-serif
Secondary: Inter, sans-serif

/* Font Sizes & Weights */
H1: 32px / 48px, Bold (700)
H2: 28px / 42px, Bold (700)
H3: 24px / 36px, Bold (700)
H4: 20px / 30px, Medium (500)
H5: 16px / 24px, Medium (500)
H6: 14px / 21px, Medium (500)
Body Large: 16px / 24px, Regular (400)
Body: 14px / 21px, Regular (400)
Caption: 12px / 18px, Regular (400)
```

### Spacing System
```css
/* Base Unit: 8px */
XS: 4px
SM: 8px
MD: 16px
LG: 24px
XL: 32px
XXL: 48px
```

### Border Radius
```css
Small: 4px
Medium: 8px
Large: 12px
XL: 16px
```

### Shadows
```css
Elevation 1: 0px 2px 4px rgba(0,0,0,0.1)
Elevation 2: 0px 4px 8px rgba(0,0,0,0.12)
Elevation 3: 0px 8px 16px rgba(0,0,0,0.14)
Elevation 4: 0px 16px 32px rgba(0,0,0,0.16)
```

## Component Library

### 1. Navigation Bar
**Dimensions:** 64px height, full width
**Background:** #1976d2 (Primary)
**Text Color:** White

**Elements:**
- Logo: "Rental Platform" (Left, 24px, Bold)
- Nav Items: Home, Properties, Bookings, Dashboard, Admin (Right)
- User Avatar: 32x32px circular (Rightmost)
- Mobile Menu: Hamburger icon (Mobile only)

**States:**
- Hover: Background rgba(255,255,255,0.1)
- Active: Background rgba(255,255,255,0.2)

### 2. Hero Section
**Dimensions:** Full width, 400px height
**Background:** Gradient (135deg, #667eea 0%, #764ba2 100%)
**Text Color:** White

**Content:**
- Title: "Find Your Perfect Rental" (H1, Center)
- Subtitle: "Discover amazing properties..." (H5, Center)
- CTA Buttons: "Search Properties" (Primary, White), "Sign Up" (Outlined, White)

### 3. Property Card
**Dimensions:** 320px width, auto height
**Border Radius:** 8px
**Shadow:** Elevation 2
**Hover State:** Transform translateY(-4px), Shadow Elevation 4

**Structure:**
- Image: 320x200px, Top
- Title: H6, 16px, Bold
- Location: Body, with Location Icon
- Guest Count: Body, with People Icon
- Rating: Body, with Star Icon
- Price: H6, Primary Color
- CTA Button: "View Details"

### 4. Search & Filter Bar
**Dimensions:** Full width, 80px height
**Background:** Grey 50 (#fafafa)
**Border Radius:** 8px

**Fields:**
- Location Search: 25% width
- Category Dropdown: 15% width
- Min Price: 15% width
- Max Price: 15% width
- Guests: 15% width
- Search Button: 10% width

### 5. Property Detail Page
**Layout:** 2-column grid (70% content, 30% sidebar)

**Main Content:**
- Image Gallery: Full width, 400px height
- Property Title: H2
- Property Info: Location, Capacity, Rating
- Description: Body Large
- Amenities: Grid of icons
- Reviews Section

**Sidebar:**
- Booking Card: Sticky, 300px width
- Price Display
- Date Pickers
- Guest Selector
- Booking CTA Button

### 6. Authentication Forms
**Dimensions:** 400px width, auto height
**Centered** on page
**Background:** White
**Border Radius:** 8px
**Shadow:** Elevation 3

**Fields:**
- Email Input
- Password Input
- Remember Me Checkbox
- Submit Button
- Social Login Options

### 7. Dashboard
**Layout:** Grid layout, responsive

**Components:**
- Stats Cards: 4 columns (Desktop)
- Recent Bookings Table
- Quick Actions
- Chart Area

### 8. Admin Panel
**Layout:** Sidebar + Main Content

**Sidebar:**
- 240px width
- Navigation Menu
- Active state highlighting

**Main Content:**
- Page Header
- Data Tables
- Action Buttons
- Filters

## Page Layouts

### 1. Home Page
```
┌─────────────────────────────────────┐
│ Navigation Bar (64px)               │
├─────────────────────────────────────┤
│ Hero Section (400px)               │
├─────────────────────────────────────┤
│ Stats Section (200px)              │
├─────────────────────────────────────┤
│ Features Section (600px)            │
├─────────────────────────────────────┤
│ CTA Section (300px)               │
└─────────────────────────────────────┘
```

### 2. Properties Page
```
┌─────────────────────────────────────┐
│ Navigation Bar (64px)               │
├─────────────────────────────────────┤
│ Page Title (80px)                  │
├─────────────────────────────────────┤
│ Search & Filters (120px)            │
├─────────────────────────────────────┤
│ Properties Grid (Auto)             │
│ ┌─────┐ ┌─────┐ ┌─────┐           │
│ │Card │ │Card │ │Card │           │
│ └─────┘ └─────┘ └─────┘           │
├─────────────────────────────────────┤
│ Pagination (80px)                 │
└─────────────────────────────────────┘
```

### 3. Property Detail Page
```
┌─────────────────────────────────────┐
│ Navigation Bar (64px)               │
├─────────────────────────────────────┤
│ Breadcrumb (40px)                  │
├─────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────┐ │
│ │                 │ │ Booking     │ │
│ │   Image Gallery │ │ Card        │ │
│ │                 │ │ (Sticky)    │ │
│ ├─────────────────┤ │             │ │
│ │                 │ │             │ │
│ │  Property Info  │ │             │ │
│ │                 │ │             │ │
│ ├─────────────────┤ │             │ │
│ │                 │ │             │ │
│ │   Description   │ │             │ │
│ │                 │ │             │ │
│ ├─────────────────┤ │             │ │
│ │                 │ │             │ │
│ │   Amenities     │ │             │ │
│ │                 │ │             │ │
│ ├─────────────────┤ │             │ │
│ │                 │ │             │ │
│ │    Reviews      │ │             │ │
│ │                 │ │             │ │
│ └─────────────────┘ └─────────────┘ │
└─────────────────────────────────────┘
```

## Responsive Design

### Breakpoints
```css
Mobile: 0px - 599px
Tablet: 600px - 959px
Desktop: 960px - 1279px
Large Desktop: 1280px+
```

### Mobile Adaptations
- Navigation: Hamburger menu
- Property Cards: Full width
- Forms: Full width with proper spacing
- Tables: Horizontal scroll
- Images: Responsive height

### Tablet Adaptations
- Navigation: Condensed layout
- Property Cards: 2 columns
- Forms: Centered, max width 600px
- Sidebars: Below content on tablet

## Interactive Elements

### Button Styles
```css
Primary Button:
- Background: #1976d2
- Text: White
- Border Radius: 4px
- Padding: 8px 16px
- Hover: Background #1565c0

Secondary Button:
- Background: Transparent
- Text: #1976d2
- Border: 1px solid #1976d2
- Hover: Background rgba(25, 118, 210, 0.04)

Outlined Button:
- Background: Transparent
- Text: Current color
- Border: 1px solid current color
- Hover: Background rgba(0,0,0,0.04)
```

### Form Elements
```css
Text Field:
- Height: 56px
- Border: 1px solid #e0e0e0
- Border Radius: 4px
- Focus Border: #1976d2
- Padding: 16px

Select Dropdown:
- Height: 56px
- Same styling as Text Field

Checkbox:
- Size: 20px
- Color: #1976d2
```

### Card Hover Effects
```css
Property Card:
- Transform: translateY(-4px)
- Shadow: 0px 8px 16px rgba(0,0,0,0.14)
- Transition: 0.2s ease

Button Hover:
- Transform: scale(1.02)
- Transition: 0.2s ease
```

## Icon Library
Use Material Design Icons:
- Navigation: Home, Apartment, CalendarToday, Dashboard
- Actions: Search, PersonAdd, Login, Logout
- Property: LocationOn, People, Star, Bed, Bathroom
- Amenities: Wifi, Pool, Kitchen, LocalParking, FitnessCenter

## Animation Guidelines

### Page Transitions
- Fade In: 0.3s ease
- Slide Up: 0.3s ease
- Scale: 0.2s ease

### Micro-interactions
- Button Press: 0.1s ease
- Card Hover: 0.2s ease
- Form Focus: 0.2s ease

## Figma Implementation Steps

### 1. Setup
1. Create new Figma file
2. Set up frames for each breakpoint
3. Create color styles
4. Create text styles
5. Create component library

### 2. Components
1. Design Navigation Bar
2. Create Property Card component
3. Design Button variants
4. Create Form elements
5. Design Search/Filter bar

### 3. Pages
1. Home Page layout
2. Properties listing page
3. Property detail page
4. Authentication pages
5. Dashboard and Admin pages

### 4. Responsive
1. Mobile adaptations
2. Tablet layouts
3. Desktop optimizations

### 5. Prototyping
1. Link pages together
2. Add hover states
3. Create click interactions
4. Test user flows

## Assets Needed
- Hero background images
- Property placeholder images
- User avatars
- Icon set
- Logo variations

This specification provides everything needed to create a comprehensive Figma design for the rental platform.
