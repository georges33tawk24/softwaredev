// HTML to Design Import Script
// This script sends your HTML to html.to.design for Figma import

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rental Platform - Figma Export</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Roboto', sans-serif;
            background: #fafafa;
        }
        
        /* Navigation */
        .navbar {
            background: #1976d2;
            height: 64px;
            display: flex;
            align-items: center;
            padding: 0 24px;
            color: white;
        }
        
        .navbar-brand {
            font-size: 20px;
            font-weight: bold;
            margin-right: auto;
            cursor: pointer;
        }
        
        .navbar-nav {
            display: flex;
            gap: 16px;
            align-items: center;
        }
        
        .nav-button {
            background: none;
            border: none;
            color: white;
            padding: 8px 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            border-radius: 4px;
            transition: background 0.2s;
        }
        
        .nav-button:hover {
            background: rgba(255,255,255,0.1);
        }
        
        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 80px 24px;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 16px;
        }
        
        .hero h5 {
            font-size: 20px;
            margin-bottom: 32px;
            opacity: 0.9;
        }
        
        .hero-buttons {
            display: flex;
            gap: 16px;
            justify-content: center;
        }
        
        .btn-primary {
            background: white;
            color: #1976d2;
            border: none;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .btn-outline {
            background: transparent;
            color: white;
            border: 1px solid white;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: 500;
            cursor: pointer;
        }
        
        /* Stats Section */
        .stats {
            padding: 48px 24px;
            background: white;
        }
        
        .stats-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }
        
        .stat-item {
            text-align: center;
            flex: 1;
            min-width: 150px;
        }
        
        .stat-number {
            font-size: 32px;
            font-weight: bold;
            color: #1976d2;
        }
        
        .stat-label {
            font-size: 16px;
            color: #666;
        }
        
        /* Features Section */
        .features {
            padding: 80px 24px;
            background: white;
        }
        
        .features-container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .features h2 {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 16px;
        }
        
        .features-subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 48px;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
        }
        
        .feature-card {
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 24px;
            text-align: center;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .feature-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }
        
        .feature-icon {
            color: #1976d2;
            margin-bottom: 16px;
        }
        
        .feature-title {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 8px;
        }
        
        .feature-description {
            color: #666;
            font-size: 14px;
        }
        
        /* Properties Section */
        .properties {
            padding: 48px 24px;
            background: #fafafa;
        }
        
        .properties h2 {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 32px;
        }
        
        .search-bar {
            background: #f5f5f5;
            padding: 24px;
            border-radius: 8px;
            margin-bottom: 32px;
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
            align-items: center;
        }
        
        .search-input {
            flex: 1;
            min-width: 200px;
            padding: 12px 16px;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            font-size: 14px;
        }
        
        .search-btn {
            background: #1976d2;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
        }
        
        .properties-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 24px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .property-card {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .property-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.14);
        }
        
        .property-image {
            width: 100%;
            height: 200px;
            background: linear-gradient(45deg, #e0e0e0, #f5f5f5);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
        }
        
        .property-content {
            padding: 16px;
        }
        
        .property-title {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 8px;
        }
        
        .property-location {
            display: flex;
            align-items: center;
            gap: 4px;
            color: #666;
            font-size: 14px;
            margin-bottom: 4px;
        }
        
        .property-guests {
            display: flex;
            align-items: center;
            gap: 4px;
            color: #666;
            font-size: 14px;
            margin-bottom: 4px;
        }
        
        .property-rating {
            display: flex;
            align-items: center;
            gap: 4px;
            color: #666;
            font-size: 14px;
            margin-bottom: 8px;
        }
        
        .property-price {
            font-size: 16px;
            font-weight: 500;
            color: #1976d2;
            margin-bottom: 12px;
        }
        
        .property-btn {
            background: #1976d2;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .navbar-nav {
                display: none;
            }
            
            .hero-buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .search-bar {
                flex-direction: column;
            }
            
            .search-input, .search-btn {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="navbar-brand">Rental Platform</div>
        <div class="navbar-nav">
            <button class="nav-button">
                <i class="material-icons">home</i>
                Home
            </button>
            <button class="nav-button">
                <i class="material-icons">apartment</i>
                Properties
            </button>
            <button class="nav-button">
                <i class="material-icons">calendar_today</i>
                Bookings
            </button>
            <button class="nav-button">
                <i class="material-icons">dashboard</i>
                Dashboard
            </button>
            <button class="nav-button">
                <i class="material-icons">login</i>
                Login
            </button>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <h1>Find Your Perfect Rental</h1>
        <h5>Discover amazing properties for your next vacation or business trip</h5>
        <div class="hero-buttons">
            <button class="btn-primary">
                <i class="material-icons">search</i>
                Search Properties
            </button>
            <button class="btn-outline">Sign Up</button>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
        <div class="stats-container">
            <div class="stat-item">
                <div class="stat-number">10,000+</div>
                <div class="stat-label">Properties</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">50,000+</div>
                <div class="stat-label">Happy Guests</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">100+</div>
                <div class="stat-label">Cities</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">4.8</div>
                <div class="stat-label">Average Rating</div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features">
        <div class="features-container">
            <h2>Why Choose Our Platform</h2>
            <p class="features-subtitle">We make finding and booking rentals simple and secure</p>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="material-icons" style="font-size: 48px;">apartment</i>
                    </div>
                    <div class="feature-title">Wide Selection</div>
                    <div class="feature-description">Choose from thousands of properties worldwide</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="material-icons" style="font-size: 48px;">home</i>
                    </div>
                    <div class="feature-title">Comfortable Stays</div>
                    <div class="feature-description">Find your perfect home away from home</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="material-icons" style="font-size: 48px;">star</i>
                    </div>
                    <div class="feature-title">Verified Reviews</div>
                    <div class="feature-description">Read authentic reviews from real guests</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="material-icons" style="font-size: 48px;">location_on</i>
                    </div>
                    <div class="feature-title">Prime Locations</div>
                    <div class="feature-description">Properties in the best locations</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="material-icons" style="font-size: 48px;">calendar_today</i>
                    </div>
                    <div class="feature-title">Easy Booking</div>
                    <div class="feature-description">Simple and secure booking process</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="material-icons" style="font-size: 48px;">search</i>
                    </div>
                    <div class="feature-title">Advanced Search</div>
                    <div class="feature-description">Find exactly what you're looking for</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Properties Section -->
    <section class="properties">
        <h2>Find Your Perfect Rental</h2>
        <div class="search-bar">
            <input type="text" class="search-input" placeholder="Search location...">
            <select class="search-input">
                <option>All Categories</option>
                <option>Apartment</option>
                <option>House</option>
                <option>Villa</option>
                <option>Condo</option>
            </select>
            <input type="number" class="search-input" placeholder="Min Price">
            <input type="number" class="search-input" placeholder="Max Price">
            <input type="number" class="search-input" placeholder="Guests">
            <button class="search-btn">Search</button>
        </div>
        
        <div class="properties-grid">
            <div class="property-card">
                <div class="property-image">
                    <i class="material-icons" style="font-size: 48px;">image</i>
                </div>
                <div class="property-content">
                    <div class="property-title">Luxury Beach Villa</div>
                    <div class="property-location">
                        <i class="material-icons" style="font-size: 16px;">location_on</i>
                        Miami, FL
                    </div>
                    <div class="property-guests">
                        <i class="material-icons" style="font-size: 16px;">people</i>
                        8 guests
                    </div>
                    <div class="property-rating">
                        <i class="material-icons" style="font-size: 16px;">star</i>
                        4.5 (18 reviews)
                    </div>
                    <div class="property-price">$250/night</div>
                    <button class="property-btn">View Details</button>
                </div>
            </div>
            
            <div class="property-card">
                <div class="property-image">
                    <i class="material-icons" style="font-size: 48px;">image</i>
                </div>
                <div class="property-content">
                    <div class="property-title">Modern Downtown Apartment</div>
                    <div class="property-location">
                        <i class="material-icons" style="font-size: 16px;">location_on</i>
                        New York, NY
                    </div>
                    <div class="property-guests">
                        <i class="material-icons" style="font-size: 16px;">people</i>
                        4 guests
                    </div>
                    <div class="property-rating">
                        <i class="material-icons" style="font-size: 16px;">star</i>
                        4.8 (8 reviews)
                    </div>
                    <div class="property-price">$150/night</div>
                    <button class="property-btn">View Details</button>
                </div>
            </div>
            
            <div class="property-card">
                <div class="property-image">
                    <i class="material-icons" style="font-size: 48px;">image</i>
                </div>
                <div class="property-content">
                    <div class="property-title">Cozy Mountain Cabin</div>
                    <div class="property-location">
                        <i class="material-icons" style="font-size: 16px;">location_on</i>
                        Denver, CO
                    </div>
                    <div class="property-guests">
                        <i class="material-icons" style="font-size: 16px;">people</i>
                        6 guests
                    </div>
                    <div class="property-rating">
                        <i class="material-icons" style="font-size: 16px;">star</i>
                        4.7 (12 reviews)
                    </div>
                    <div class="property-price">$180/night</div>
                    <button class="property-btn">View Details</button>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`;

// Instructions for manual import to html.to.design
console.log(`
=== HTML to Design Import Instructions ===

1. Open Figma
2. Install html.to.design plugin from Community
3. Open the plugin
4. Click on the "Code" tab
5. Copy the HTML content below
6. Paste into the plugin
7. Click "Import"

The HTML content is ready in the 'htmlContent' variable above.
Copy everything from the <!DOCTYPE html> to </html> tags.

=== Alternative Method ===

If the code import doesn't work:
1. Open the HTML file in your browser:
   file:///Users/user/CascadeProjects/windsurf-project-3/rental-platform-figma-export.html
2. Use the html.to.design browser extension
3. Click the extension icon
4. Select "Capture this page"
5. Choose your Figma file

=== What You'll Get ===
- Complete navigation bar
- Hero section with gradient
- Stats section with metrics
- 6 feature cards with icons
- Properties search section
- 3 property cards with details
- All Material Design styling
- Responsive layout structure

This should give you a complete, editable Figma design of your rental platform!
`);

// Export the HTML content for easy copying
export { htmlContent };
