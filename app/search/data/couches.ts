interface ProductItem {
  name: string
  image: string
  features: string[]
  priceRange: string
  description: string
}

interface ProductVisual {
  type: 'example'
  title: string
  description: string
  category: string
  items: ProductItem[]
}

export const couchData: ProductVisual = {
  type: 'example',
  category: 'couch',
  title: 'Living Room Sofas - Size, Style & Comfort Guide',
  description: 'Finding the perfect balance of style, comfort, and durability for your living space. Consider room size, daily use, and long-term quality.',
  items: [
    {
      name: 'Compact Loveseats',
      image: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#fef7cd"/>
          <!-- Compact loveseat -->
          <rect x="75" y="120" width="150" height="50" fill="#8b5cf6" rx="8"/>
          <rect x="65" y="110" width="25" height="60" fill="#7c3aed" rx="12"/>
          <rect x="210" y="110" width="25" height="60" fill="#7c3aed" rx="12"/>
          <rect x="85" y="105" width="130" height="15" fill="#6d28d9" rx="7"/>
          <!-- Dimension indicators -->
          <text x="50" y="95" font-family="Arial" font-size="9" fill="#581c87" text-anchor="middle">58"-72"</text>
          <text x="50" y="107" font-family="Arial" font-size="9" fill="#581c87" text-anchor="middle">Width</text>
          <text x="250" y="95" font-family="Arial" font-size="9" fill="#581c87" text-anchor="middle">2-Person</text>
          <text x="250" y="107" font-family="Arial" font-size="9" fill="#581c87" text-anchor="middle">Seating</text>
          <text x="150" y="40" font-family="Arial" font-size="12" fill="#581c87" text-anchor="middle" font-weight="bold">COMPACT</text>
          <text x="150" y="190" font-family="Arial" font-size="9" fill="#6b21a8" text-anchor="middle">Perfect for apartments & small spaces</text>
        </svg>
      `)}`,
      description: 'Space-saving 2-person seating perfect for apartments, condos, and smaller living rooms.',
      features: [
        '58"-72" width fits tight spaces',
        'Modern clean-line aesthetics',
        'Easy to move and rearrange',
        'Fabric or faux leather options',
        'Apartment-friendly delivery',
        'Budget-conscious pricing',
        'Available in multiple colors'
      ],
      priceRange: '$400-1,200'
    },
    {
      name: 'Family Sectionals',
      image: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f0f9ff"/>
          <!-- L-shaped sectional -->
          <rect x="30" y="110" width="120" height="60" fill="#3b82f6" rx="8"/>
          <rect x="150" y="130" width="100" height="40" fill="#2563eb" rx="8"/>
          <rect x="20" y="100" width="20" height="70" fill="#1d4ed8" rx="10"/>
          <rect x="260" y="120" width="20" height="50" fill="#1d4ed8" rx="10"/>
          <!-- Dimension indicators -->
          <text x="90" y="85" font-family="Arial" font-size="9" fill="#1e3a8a" text-anchor="middle">100"-120"</text>
          <text x="90" y="97" font-family="Arial" font-size="9" fill="#1e3a8a" text-anchor="middle">Length</text>
          <text x="200" y="85" font-family="Arial" font-size="9" fill="#1e3a8a" text-anchor="middle">4-6 People</text>
          <text x="200" y="97" font-family="Arial" font-size="9" fill="#1e3a8a" text-anchor="middle">Seating</text>
          <text x="150" y="40" font-family="Arial" font-size="12" fill="#1e3a8a" text-anchor="middle" font-weight="bold">SECTIONAL</text>
          <text x="150" y="190" font-family="Arial" font-size="9" fill="#1e40af" text-anchor="middle">L-shape maximizes corner space</text>
        </svg>
      `)}`,
      description: 'L-shaped configuration that maximizes seating while efficiently using corner space.',
      features: [
        '100"-120" total length',
        'Seats 4-6 people comfortably',
        'Corner space optimization',
        'Modular configuration options',
        'Built-in chaise lounging',
        'Family-friendly durability',
        'Storage ottoman options'
      ],
      priceRange: '$1,200-3,500'
    },
    {
      name: 'Premium Sofas',
      image: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f7fee7"/>
          <!-- Premium sofa with details -->
          <rect x="50" y="115" width="200" height="55" fill="#84cc16" rx="10"/>
          <rect x="40" y="105" width="30" height="65" fill="#65a30d" rx="15"/>
          <rect x="230" y="105" width="30" height="65" fill="#65a30d" rx="15"/>
          <rect x="65" y="95" width="170" height="20" fill="#4d7c0f" rx="10"/>
          <!-- Quality indicators -->
          <circle cx="90" cy="140" r="8" fill="#365314"/>
          <circle cx="150" cy="140" r="8" fill="#365314"/>
          <circle cx="210" cy="140" r="8" fill="#365314"/>
          <!-- Material callouts -->
          <text x="50" y="80" font-family="Arial" font-size="9" fill="#365314" text-anchor="middle">Hardwood</text>
          <text x="50" y="92" font-family="Arial" font-size="9" fill="#365314" text-anchor="middle">Frame</text>
          <text x="250" y="80" font-family="Arial" font-size="9" fill="#365314" text-anchor="middle">Premium</text>
          <text x="250" y="92" font-family="Arial" font-size="9" fill="#365314" text-anchor="middle">Materials</text>
          <text x="150" y="40" font-family="Arial" font-size="12" fill="#365314" text-anchor="middle" font-weight="bold">PREMIUM</text>
          <text x="150" y="190" font-family="Arial" font-size="9" fill="#4d7c0f" text-anchor="middle">Heirloom quality • 25+ year warranty</text>
        </svg>
      `)}`,
      description: 'Investment-quality furniture built with premium materials and craftsmanship to last decades.',
      features: [
        'Kiln-dried hardwood frame',
        'Top-grain leather or high-end fabric',
        '8-way hand-tied springs',
        'Down-wrapped cushions',
        '25+ year frame warranty',
        'White glove delivery',
        'Custom fabric/leather options'
      ],
      priceRange: '$2,500-8,000+'
    }
  ]
}

export const couchInsights = {
  sizeGuide: {
    'Small (Under 72")': 'Loveseats, apartment sofas - perfect for 1-2 people',
    'Medium (72"-96")': 'Standard 3-seat sofas - most popular size for living rooms',
    'Large (96"+)': 'Sectionals, large sofas - great for families and entertaining'
  },
  materials: {
    'Fabric': 'Comfortable, breathable, easy to clean, more color options',
    'Leather': 'Durable, ages well, easy to wipe clean, sophisticated look',
    'Performance Fabrics': 'Stain-resistant, pet-friendly, family-focused'
  },
  frameQuality: {
    'Particle Board': 'Budget option - 3-5 year lifespan',
    'Plywood': 'Good middle ground - 10-15 year lifespan', 
    'Kiln-Dried Hardwood': 'Premium choice - 25+ year lifespan'
  }
} 