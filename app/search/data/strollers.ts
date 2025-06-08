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

export const strollerData: ProductVisual = {
  type: 'example',
  category: 'stroller',
  title: 'Baby Strollers - Safety, Age & Lifestyle Guide',
  description: 'Choosing the right stroller based on your baby\'s age, your lifestyle, and safety requirements. Consider where you\'ll use it most.',
  items: [
    {
      name: 'Lightweight Umbrella',
      image: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#fef3c7"/>
          <!-- Lightweight stroller frame -->
          <rect x="120" y="80" width="60" height="50" fill="#f59e0b" rx="8"/>
          <circle cx="130" cy="150" r="12" fill="#374151"/>
          <circle cx="170" cy="150" r="12" fill="#374151"/>
          <!-- Handle -->
          <rect x="110" y="60" width="15" height="35" fill="#d97706"/>
          <rect x="175" y="60" width="15" height="35" fill="#d97706"/>
          <rect x="125" y="70" width="50" height="8" fill="#92400e"/>
          <!-- Weight indicator -->
          <text x="50" y="50" font-family="Arial" font-size="9" fill="#92400e" text-anchor="middle">8-12 lbs</text>
          <text x="50" y="62" font-family="Arial" font-size="9" fill="#92400e" text-anchor="middle">Ultra-Light</text>
          <!-- Age indicator -->
          <text x="250" y="50" font-family="Arial" font-size="9" fill="#92400e" text-anchor="middle">6+ months</text>
          <text x="250" y="62" font-family="Arial" font-size="9" fill="#92400e" text-anchor="middle">Sitting Age</text>
          <text x="150" y="40" font-family="Arial" font-size="11" fill="#92400e" text-anchor="middle" font-weight="bold">UMBRELLA STROLLER</text>
          <text x="150" y="185" font-family="Arial" font-size="8" fill="#b45309" text-anchor="middle">Compact fold • Travel-friendly • One-hand operation</text>
        </svg>
      `)}`,
      description: 'Ultra-portable for travel and quick trips once baby can sit independently.',
      features: [
        'Ultra-lightweight 8-12 lbs',
        'One-hand fold operation',
        'Compact storage footprint',
        '6+ months (sitting unassisted)',
        'Basic sun canopy',
        'Single or dual wheel front',
        'Perfect for travel & errands'
      ],
      priceRange: '$30-120'
    },
    {
      name: 'All-Terrain Jogger',
      image: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#ecfdf5"/>
          <!-- Jogging stroller with 3 wheels -->
          <rect x="100" y="75" width="100" height="60" fill="#10b981" rx="10"/>
          <circle cx="115" cy="155" r="18" fill="#374151"/>
          <circle cx="185" cy="155" r="18" fill="#374151"/>
          <!-- Front wheel (larger, swivel) -->
          <circle cx="150" cy="50" r="12" fill="#374151"/>
          <!-- Handle system -->
          <rect x="85" y="55" width="20" height="45" fill="#059669"/>
          <rect x="195" y="65" width="20" height="35" fill="#059669"/>
          <rect x="110" y="65" width="80" height="10" fill="#047857"/>
          <!-- Suspension indicators -->
          <rect x="105" y="140" width="3" height="15" fill="#065f46"/>
          <rect x="175" y="140" width="3" height="15" fill="#065f46"/>
          <!-- Safety indicator -->
          <text x="50" y="45" font-family="Arial" font-size="9" fill="#047857" text-anchor="middle">All-Terrain</text>
          <text x="50" y="57" font-family="Arial" font-size="9" fill="#047857" text-anchor="middle">Air Tires</text>
          <!-- Age indicator -->
          <text x="250" y="45" font-family="Arial" font-size="9" fill="#047857" text-anchor="middle">Birth+</text>
          <text x="250" y="57" font-family="Arial" font-size="9" fill="#047857" text-anchor="middle">w/ Adapter</text>
          <text x="150" y="30" font-family="Arial" font-size="11" fill="#047857" text-anchor="middle" font-weight="bold">ALL-TERRAIN JOGGER</text>
          <text x="150" y="185" font-family="Arial" font-size="8" fill="#065f46" text-anchor="middle">3-wheel • Suspension • Running compatible • Up to 75 lbs</text>
        </svg>
      `)}`,
      description: 'Built for active parents who need all-terrain capability and running compatibility.',
      features: [
        '3-wheel design for stability',
        'Air-filled tires & suspension',
        'Hand brake for control',
        'Birth+ with car seat adapter',
        'Running compatible (6+ months)',
        'Large storage basket',
        'All-weather canopy'
      ],
      priceRange: '$200-500'
    },
    {
      name: 'Premium Travel System',
      image: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#fdf2f8"/>
          <!-- Travel system stroller base -->
          <rect x="90" y="80" width="120" height="65" fill="#ec4899" rx="12"/>
          <circle cx="110" cy="165" r="15" fill="#374151"/>
          <circle cx="190" cy="165" r="15" fill="#374151"/>
          <!-- Handle system -->
          <rect x="75" y="60" width="25" height="50" fill="#db2777"/>
          <rect x="200" y="70" width="25" height="40" fill="#db2777"/>
          <rect x="100" y="70" width="100" height="12" fill="#be185d"/>
          <!-- Car seat attachment -->
          <rect x="120" y="55" width="60" height="25" fill="#f97316" rx="12"/>
          <text x="150" y="68" font-family="Arial" font-size="7" fill="white" text-anchor="middle" font-weight="bold">CAR SEAT</text>
          <!-- Safety indicators -->
          <text x="50" y="45" font-family="Arial" font-size="9" fill="#be185d" text-anchor="middle">Complete</text>
          <text x="50" y="57" font-family="Arial" font-size="9" fill="#be185d" text-anchor="middle">System</text>
          <!-- Age indicator -->
          <text x="250" y="45" font-family="Arial" font-size="9" fill="#be185d" text-anchor="middle">Birth to 4yrs</text>
          <text x="250" y="57" font-family="Arial" font-size="9" fill="#be185d" text-anchor="middle">Complete</text>
          <text x="150" y="30" font-family="Arial" font-size="11" fill="#be185d" text-anchor="middle" font-weight="bold">TRAVEL SYSTEM</text>
          <text x="150" y="185" font-family="Arial" font-size="8" fill="#be185d" text-anchor="middle">Car seat included • One-click attachment • Multiple recline • Extra storage</text>
        </svg>
      `)}`,
      description: 'Complete solution from birth to toddler with included car seat and seamless transitions.',
      features: [
        'Infant car seat included',
        'One-click seat attachment',
        'Birth to 4+ years coverage',
        'Multiple recline positions',
        'Large storage basket',
        'Cup holders & parent tray',
        'JPMA safety certified'
      ],
      priceRange: '$250-600'
    }
  ]
}

export const strollerInsights = {
  safetyStandards: {
    'JPMA Certified': 'Juvenile Products Manufacturers Association safety standards',
    'ASTM Compliance': 'American Society for Testing and Materials requirements',
    '5-Point Harness': 'Essential for securing baby safely in all positions'
  },
  ageCompatibility: {
    'Newborn (0-6 months)': 'Needs full recline or car seat compatibility',
    'Infant (6-12 months)': 'Can sit upright, needs good head/neck support',
    'Toddler (1-4 years)': 'More mobility, needs secure harness and brakes'
  },
  lifestyleConsiderations: {
    'Urban/City': 'Compact fold, smooth wheels, easy maneuvering',
    'Suburban': 'All-terrain capability, storage space, cup holders',
    'Active/Running': 'Fixed front wheel, hand brake, suspension system'
  }
} 