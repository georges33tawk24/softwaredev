/**
 * Demo catalog: diverse titles, cities, and categories — all public listings use status "active".
 * Run: npm run seed   (requires MongoDB + at least one user, ideally admin@rental.com)
 */
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Property = require('./models/Property');

function prop(base) {
  const imgSeed = base._imgSeed ?? Math.floor(Math.random() * 900 + 100);
  delete base._imgSeed;
  return {
    amenities: ['wifi', 'kitchen', 'air_conditioning'],
    images: [{ url: `https://picsum.photos/800/600?random=${imgSeed}`, isPrimary: true }],
    availability: {
      available: true,
      blockedDates: [],
      minStay: 1,
      maxStay: 30,
      checkInTime: '15:00',
      checkOutTime: '11:00',
    },
    rules: ['No smoking'],
    policies: { cancellation: 'moderate' },
    status: 'active',
    verified: true,
    pricing: { nightly: base.pricing?.nightly ?? 120, currency: 'USD', cleaningFee: 25, serviceFee: 15 },
    ...base,
  };
}

const DEMO_PROPERTIES = [
  prop({
    title: 'Luxury Beach Villa',
    description: 'Spacious beachfront villa with pool and ocean breezes.',
    category: 'villa',
    type: 'vacation',
    location: { address: '123 Beach Road', city: 'Miami', state: 'FL', zipCode: '33139', country: 'USA' },
    pricing: { nightly: 285, currency: 'USD', cleaningFee: 60, serviceFee: 25 },
    amenities: ['wifi', 'pool', 'kitchen', 'parking', 'balcony'],
    capacity: { guests: 8, bedrooms: 4, beds: 5, bathrooms: 3 },
    _imgSeed: 201,
  }),
  prop({
    title: 'Modern Downtown Apartment',
    description: 'Walk to subway and cafés; ideal for business travelers.',
    category: 'apartment',
    type: 'short_term',
    location: { address: '456 Main St', city: 'New York', state: 'NY', zipCode: '10001', country: 'USA' },
    pricing: { nightly: 175, currency: 'USD', cleaningFee: 40, serviceFee: 20 },
    amenities: ['wifi', 'gym', 'laundry', 'elevator'],
    capacity: { guests: 4, bedrooms: 2, beds: 2, bathrooms: 2 },
    _imgSeed: 202,
  }),
  prop({
    title: 'Cozy Mountain Cabin',
    description: 'Wood stove, starry nights, and hiking trails nearby.',
    category: 'cabin',
    type: 'vacation',
    location: { address: '89 Pine Trail', city: 'Aspen', state: 'CO', zipCode: '81611', country: 'USA' },
    pricing: { nightly: 210, currency: 'USD', cleaningFee: 35, serviceFee: 18 },
    amenities: ['wifi', 'kitchen', 'parking', 'heating'],
    capacity: { guests: 6, bedrooms: 3, beds: 4, bathrooms: 2 },
    _imgSeed: 203,
  }),
  prop({
    title: 'TT Loft — Arts District',
    description: 'Industrial loft perfect for creatives; TT branded minimal decor.',
    category: 'loft',
    type: 'short_term',
    location: { address: '2200 TT Lane', city: 'Austin', state: 'TX', zipCode: '78701', country: 'USA' },
    pricing: { nightly: 135, currency: 'USD' },
    amenities: ['wifi', 'workspace', 'laundry', 'elevator'],
    capacity: { guests: 3, bedrooms: 1, beds: 2, bathrooms: 1 },
    _imgSeed: 204,
  }),
  prop({
    title: 'Riverside Studio TT',
    description: 'Compact studio with river views and TT smart-lock entry.',
    category: 'studio',
    type: 'residential',
    location: { address: '44 Riverwalk', city: 'Portland', state: 'OR', zipCode: '97201', country: 'USA' },
    pricing: { nightly: 89, currency: 'USD' },
    amenities: ['wifi', 'kitchen', 'laundry'],
    capacity: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    _imgSeed: 205,
  }),
  prop({
    title: 'Sunset Terrace Condo',
    description: 'Sunset views from a wide terrace; quiet residential tower.',
    category: 'condo',
    type: 'residential',
    location: { address: '900 Bayfront Dr', city: 'San Diego', state: 'CA', zipCode: '92101', country: 'USA' },
    pricing: { nightly: 195, currency: 'USD' },
    amenities: ['wifi', 'pool', 'gym', 'parking', 'balcony'],
    capacity: { guests: 5, bedrooms: 2, beds: 3, bathrooms: 2 },
    _imgSeed: 206,
  }),
  prop({
    title: 'Maple Grove Family House',
    description: 'Large yard, family-friendly, near schools and parks.',
    category: 'house',
    type: 'long_term',
    location: { address: '17 Maple Ave', city: 'Madison', state: 'WI', zipCode: '53703', country: 'USA' },
    pricing: { nightly: 155, currency: 'USD' },
    amenities: ['wifi', 'kitchen', 'parking', 'garden', 'laundry'],
    capacity: { guests: 7, bedrooms: 4, beds: 5, bathrooms: 3 },
    _imgSeed: 207,
  }),
  prop({
    title: 'Harbor View Duplex',
    description: 'Two-story duplex steps from the marina.',
    category: 'house',
    type: 'vacation',
    location: { address: '400 Harbor Rd', city: 'Boston', state: 'MA', zipCode: '02210', country: 'USA' },
    pricing: { nightly: 225, currency: 'USD' },
    amenities: ['wifi', 'kitchen', 'parking', 'balcony'],
    capacity: { guests: 6, bedrooms: 3, beds: 4, bathrooms: 2 },
    _imgSeed: 208,
  }),
  prop({
    title: 'Nordic Minimal Studio',
    description: 'Scandinavian-inspired compact stay with heated floors.',
    category: 'studio',
    type: 'short_term',
    location: { address: '58 Pike St', city: 'Seattle', state: 'WA', zipCode: '98101', country: 'USA' },
    pricing: { nightly: 110, currency: 'USD' },
    amenities: ['wifi', 'kitchen', 'heating', 'workspace'],
    capacity: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    _imgSeed: 209,
  }),
  prop({
    title: 'Desert Bloom Adobe',
    description: 'Quiet adobe-style home with courtyard and cactus garden.',
    category: 'house',
    type: 'vacation',
    location: { address: '1200 Cactus Way', city: 'Phoenix', state: 'AZ', zipCode: '85004', country: 'USA' },
    pricing: { nightly: 140, currency: 'USD' },
    amenities: ['wifi', 'kitchen', 'parking', 'pool', 'air_conditioning'],
    capacity: { guests: 5, bedrooms: 3, beds: 3, bathrooms: 2 },
    _imgSeed: 210,
  }),
  prop({
    title: 'Garden District Cottage',
    description: 'Charming cottage walking distance to cafés and boutiques.',
    category: 'house',
    type: 'vacation',
    location: { address: '221B Magazine St', city: 'New Orleans', state: 'LA', zipCode: '70130', country: 'USA' },
    pricing: { nightly: 165, currency: 'USD' },
    amenities: ['wifi', 'kitchen', 'garden', 'pet_friendly'],
    capacity: { guests: 4, bedrooms: 2, beds: 2, bathrooms: 1 },
    policies: { cancellation: 'flexible' },
    _imgSeed: 211,
  }),
  prop({
    title: 'Summit Ski Chalet',
    description: 'Slope-side chalet with boot warmers and panoramic peaks.',
    category: 'cabin',
    type: 'vacation',
    location: { address: '77 Alpine Way', city: 'Park City', state: 'UT', zipCode: '84060', country: 'USA' },
    pricing: { nightly: 320, currency: 'USD', cleaningFee: 80, serviceFee: 30 },
    amenities: ['wifi', 'kitchen', 'heating', 'parking'],
    capacity: { guests: 10, bedrooms: 5, beds: 6, bathrooms: 4 },
    _imgSeed: 212,
  }),
  prop({
    title: 'Lakeside Bungalow',
    description: 'Kayak included; dock access for morning paddles.',
    category: 'house',
    type: 'vacation',
    location: { address: '9 Lakeshore Dr', city: 'Burlington', state: 'VT', zipCode: '05401', country: 'USA' },
    pricing: { nightly: 178, currency: 'USD' },
    amenities: ['wifi', 'kitchen', 'parking', 'garden'],
    capacity: { guests: 5, bedrooms: 2, beds: 3, bathrooms: 2 },
    _imgSeed: 213,
  }),
  prop({
    title: 'City Lights Penthouse',
    description: 'Top-floor views, soaking tub, and concierge building.',
    category: 'condo',
    type: 'short_term',
    location: { address: '1 Magnificent Mile', city: 'Chicago', state: 'IL', zipCode: '60611', country: 'USA' },
    pricing: { nightly: 265, currency: 'USD' },
    amenities: ['wifi', 'gym', 'elevator', 'balcony', 'workspace'],
    capacity: { guests: 4, bedrooms: 2, beds: 2, bathrooms: 2 },
    _imgSeed: 214,
  }),
  prop({
    title: 'Coastal Escape Villa',
    description: 'Private path to the beach; outdoor shower and hammock grove.',
    category: 'villa',
    type: 'vacation',
    location: { address: '300 Ocean Blvd', city: 'Charleston', state: 'SC', zipCode: '29401', country: 'USA' },
    pricing: { nightly: 295, currency: 'USD' },
    amenities: ['wifi', 'pool', 'kitchen', 'parking', 'garden'],
    capacity: { guests: 9, bedrooms: 4, beds: 5, bathrooms: 3 },
    _imgSeed: 215,
  }),
  prop({
    title: 'Urban Workshop Loft',
    description: 'High ceilings and natural light; near galleries.',
    category: 'loft',
    type: 'commercial',
    location: { address: '550 Warehouse Row', city: 'Philadelphia', state: 'PA', zipCode: '19106', country: 'USA' },
    pricing: { nightly: 125, currency: 'USD' },
    amenities: ['wifi', 'workspace', 'elevator'],
    capacity: { guests: 4, bedrooms: 1, beds: 2, bathrooms: 1 },
    _imgSeed: 216,
  }),
];

const seedProperties = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rental_platform');

    const owner =
      (await User.findOne({ email: 'admin@rental.com' })) ||
      (await User.findOne({ role: { $in: ['admin', 'super_admin'] } })) ||
      (await User.findOne());

    if (!owner) {
      console.error('No users found. Create a user first (e.g. npm run bootstrap then register).');
      process.exit(1);
    }

    let created = 0;
    for (const template of DEMO_PROPERTIES) {
      const exists = await Property.findOne({ title: template.title });
      if (!exists) {
        await Property.create({ ...template, owner: owner._id });
        created += 1;
      }
    }

    const activated = await Property.updateMany(
      {
        status: { $in: ['pending', 'draft'] },
        title: {
          $in: DEMO_PROPERTIES.map((p) => p.title),
        },
      },
      { $set: { status: 'active', verified: true } }
    );

    const activeTotal = await Property.countDocuments({ status: 'active' });
    const ttMatches = await Property.countDocuments({
      status: 'active',
      $or: [
        { title: { $regex: 'tt', $options: 'i' } },
        { description: { $regex: 'tt', $options: 'i' } },
        { 'location.city': { $regex: 'tt', $options: 'i' } },
      ],
    });

    console.log(`Seed complete. Created ${created} new properties.`);
    console.log(`Demoted pending→active for known demo titles: ${activated.modifiedCount} updated.`);
    console.log(`Active listings total: ${activeTotal}. Active listings matching "tt" (title/desc/city): ${ttMatches}.`);
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed properties:', error.message);
    process.exit(1);
  }
};

seedProperties();
