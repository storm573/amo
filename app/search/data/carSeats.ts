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

export const carSeatData: ProductVisual = {
  type: 'example',
  category: 'car-seat',
  title: 'Baby Car Seats - Safety, Age & Installation Guide',
  description: 'Choosing the right car seat based on your child\'s age, weight, and your vehicle. Safety certifications and proper installation are critical.',
  items: [
    {
      name: 'Infant Car Seat',
      image: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#fef3c7"/>
          <!-- Car seat base -->
          <path d="M80 120 Q80 100 100 100 L200 100 Q220 100 220 120 L210 160 Q210 170 200 170 L100 170 Q90 170 90 160 Z" fill="#f59e0b"/>
          <!-- Seat cushion -->
          <path d="M95 110 Q95 105 100 105 L200 105 Q205 105 205 110 L200 140 Q200 145 195 145 L105 145 Q100 145 100 140 Z" fill="#fbbf24"/>
          <!-- Handle -->
          <path d="M85 95 Q150 60 215 95" stroke="#d97706" stroke-width="8" fill="none"/>
          <circle cx="85" cy="95" r="6" fill="#d97706"/>
          <circle cx="215" cy="95" r="6" fill="#d97706"/>
          <!-- 5-point harness -->
          <circle cx="130" cy="120" r="3" fill="#dc2626"/>
          <circle cx="170" cy="120" r="3" fill="#dc2626"/>
          <circle cx="150" cy="135" r="3" fill="#dc2626"/>
          <line x1="150" y1="135" x2="130" y2="120" stroke="#dc2626" stroke-width="2"/>
          <line x1="150" y1="135" x2="170" y2="120" stroke="#dc2626" stroke-width="2"/>
          <!-- Safety indicators -->
          <text x="50" y="45" font-family="Arial" font-size="9" fill="#92400e" text-anchor="middle">4-35 lbs</text>
          <text x="50" y="57" font-family="Arial" font-size="9" fill="#92400e" text-anchor="middle">Rear-Facing</text>
          <!-- Age indicator -->
          <text x="250" y="45" font-family="Arial" font-size="9" fill="#92400e" text-anchor="middle">Birth-12mo</text>
          <text x="250" y="57" font-family="Arial" font-size="9" fill="#92400e" text-anchor="middle">Portable</text>
          <text x="150" y="30" font-family="Arial" font-size="11" fill="#92400e" text-anchor="middle" font-weight="bold">INFANT CAR SEAT</text>
          <text x="150" y="185" font-family="Arial" font-size="8" fill="#b45309" text-anchor="middle">Removable base • Travel system compatible • Rear-facing only</text>
        </svg>
      `)}`,
      description: 'Designed for newborns and infants, offering maximum portability and convenience for the first year.',
      features: [
        '4-35 lbs weight capacity',
        'Rear-facing only design',
        'Removable base installation',
        'Carry handle for portability',
        '5-point safety harness',
        'Travel system compatible',
        'Side impact protection',
        'Newborn insert included'
      ],
      priceRange: '$80-350'
    },
    {
      name: 'Convertible Car Seat',
      image: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#ecfdf5"/>
          <!-- Car seat base (larger) -->
          <path d="M70 130 Q70 105 90 105 L210 105 Q230 105 230 130 L225 170 Q225 180 215 180 L85 180 Q75 180 75 170 Z" fill="#10b981"/>
          <!-- Seat back (adjustable) -->
          <path d="M85 105 Q85 85 95 85 L205 85 Q215 85 215 105 L210 140 Q210 145 205 145 L95 145 Q90 145 90 140 Z" fill="#34d399"/>
          <!-- Headrest (adjustable) -->
          <rect x="110" y="75" width="80" height="25" fill="#059669" rx="12"/>
          <!-- 5-point harness -->
          <circle cx="125" cy="125" r="3" fill="#dc2626"/>
          <circle cx="175" cy="125" r="3" fill="#dc2626"/>
          <circle cx="150" cy="145" r="4" fill="#dc2626"/>
          <line x1="150" y1="145" x2="125" y2="125" stroke="#dc2626" stroke-width="2"/>
          <line x1="150" y1="145" x2="175" y2="125" stroke="#dc2626" stroke-width="2"/>
          <!-- Recline indicator -->
          <path d="M40 100 L40 140" stroke="#047857" stroke-width="3"/>
          <path d="M35 100 L40 100 L45 100" stroke="#047857" stroke-width="2"/>
          <text x="40" y="155" font-family="Arial" font-size="7" fill="#047857" text-anchor="middle">Reclines</text>
          <!-- Weight indicator -->
          <text x="50" y="45" font-family="Arial" font-size="9" fill="#047857" text-anchor="middle">5-65 lbs</text>
          <text x="50" y="57" font-family="Arial" font-size="9" fill="#047857" text-anchor="middle">Both Ways</text>
          <!-- Age indicator -->
          <text x="250" y="45" font-family="Arial" font-size="9" fill="#047857" text-anchor="middle">Birth-6yrs</text>
          <text x="250" y="57" font-family="Arial" font-size="9" fill="#047857" text-anchor="middle">Versatile</text>
          <text x="150" y="30" font-family="Arial" font-size="11" fill="#047857" text-anchor="middle" font-weight="bold">CONVERTIBLE CAR SEAT</text>
          <text x="150" y="195" font-family="Arial" font-size="8" fill="#065f46" text-anchor="middle">Rear & forward facing • Adjustable height • Long-term use • LATCH compatible</text>
        </svg>
      `)}`,
      description: 'Versatile seat that converts from rear-facing to forward-facing, growing with your child for years.',
      features: [
        '5-65 lbs capacity range',
        'Rear-facing 5-40 lbs',
        'Forward-facing 22-65 lbs',
        'Multiple recline positions',
        'Adjustable headrest & harness',
        'LATCH installation system',
        'Extended rear-facing capability',
        'Side impact protection'
      ],
      priceRange: '$120-450'
    },
    {
      name: 'Booster Seat',
      image: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#fdf2f8"/>
          <!-- Booster seat base -->
          <path d="M90 140 Q90 130 100 130 L200 130 Q210 130 210 140 L205 170 Q205 175 200 175 L100 175 Q95 175 95 170 Z" fill="#ec4899"/>
          <!-- Seat back (removable) -->
          <path d="M105 130 Q105 110 115 110 L185 110 Q195 110 195 130 L190 145 Q190 150 185 150 L115 150 Q110 150 110 145 Z" fill="#f472b6"/>
          <!-- Armrests -->
          <rect x="85" y="120" width="12" height="35" fill="#db2777" rx="6"/>
          <rect x="203" y="120" width="12" height="35" fill="#db2777" rx="6"/>
          <!-- Vehicle seatbelt path -->
          <path d="M70 100 Q150 80 230 100" stroke="#374151" stroke-width="6" fill="none"/>
          <path d="M70 100 L150 160 L230 100" stroke="#374151" stroke-width="4" fill="none"/>
          <!-- Seatbelt guides -->
          <circle cx="110" cy="125" r="4" fill="#be185d"/>
          <circle cx="190" cy="125" r="4" fill="#be185d"/>
          <!-- Weight indicator -->
          <text x="50" y="45" font-family="Arial" font-size="9" fill="#be185d" text-anchor="middle">40-120 lbs</text>
          <text x="50" y="57" font-family="Arial" font-size="9" fill="#be185d" text-anchor="middle">Vehicle Belt</text>
          <!-- Age indicator -->
          <text x="250" y="45" font-family="Arial" font-size="9" fill="#be185d" text-anchor="middle">4-12 yrs</text>
          <text x="250" y="57" font-family="Arial" font-size="9" fill="#be185d" text-anchor="middle">Independent</text>
          <text x="150" y="30" font-family="Arial" font-size="11" fill="#be185d" text-anchor="middle" font-weight="bold">BOOSTER SEAT</text>
          <text x="150" y="190" font-family="Arial" font-size="8" fill="#be185d" text-anchor="middle">Uses vehicle seatbelt • Removable back • Lightweight • Easy transfer</text>
        </svg>
      `)}`,
      description: 'Final stage car seat that positions older children properly for adult seatbelt use.',
      features: [
        '40-120 lbs weight capacity',
        'Uses vehicle seatbelt system',
        'Removable backrest option',
        'Belt positioning guides',
        'Lightweight & portable',
        'Easy vehicle transfer',
        'Cup holders included',
        'Machine washable covers'
      ],
      priceRange: '$25-200'
    }
  ]
}

export const carSeatInsights = {
  safetyStandards: {
    'FMVSS 213': 'Federal Motor Vehicle Safety Standard - mandatory for all car seats',
    'NHTSA 5-Star': 'National Highway Traffic Safety Administration rating system',
    'IIHS Top Safety Pick': 'Insurance Institute for Highway Safety recognition',
    'JPMA Certified': 'Juvenile Products Manufacturers Association certification'
  },
  installationMethods: {
    'LATCH System': 'Lower Anchors and Tethers for Children - easier installation',
    'Seatbelt Installation': 'Traditional method using vehicle seatbelt',
    'Base Installation': 'Permanent base for infant seats with quick-release'
  },
  ageAndWeightGuidelines: {
    'Rear-Facing (Birth-2+ years)': 'Safest position - keep rear-facing as long as possible',
    'Forward-Facing (2-4 years)': 'After outgrowing rear-facing limits with 5-point harness',
    'Booster (4-8 years)': 'When child outgrows forward-facing harness system',
    'Adult Belt (8+ years)': 'When child passes 5-step seatbelt fit test'
  },
  keyFeatures: {
    'Side Impact Protection': 'Energy-absorbing materials and reinforced sides',
    'Anti-Rebound Bar': 'Reduces rotation in rear-facing crashes',
    'Load Leg': 'Additional stability point touching vehicle floor',
    'Steel Frame': 'Superior strength compared to plastic-only construction'
  },
  commonMistakes: {
    'Switching Too Early': 'Keep rear-facing until 2+ years minimum',
    'Loose Installation': 'Seat should not move more than 1 inch side-to-side',
    'Wrong Harness Position': 'Straps at or below shoulders when rear-facing',
    'Twisted Straps': 'Harness should lay flat against child\'s body'
  }
} 