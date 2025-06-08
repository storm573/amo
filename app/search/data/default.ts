interface ProductItem {
  name: string
  image: string
  features: string[]
  priceRange: string
  description: string
}

interface ProductVisual {
  type: 'showcase'
  title: string
  description: string
  category: string
  items: ProductItem[]
}

export const defaultShowcase: ProductVisual = {
  type: 'showcase',
  category: 'default',
  title: '🛍️ Welcome to Amo\'s Shopping Universe',
  description: 'I help you make smart choices on complex purchases. Let\'s explore some popular categories where quality and fit really matter!',
  items: [
    {
      name: '🏓 Pickleball Paddles',
      image: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="paddle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="#f0f9ff"/>
          <ellipse cx="150" cy="80" rx="60" ry="70" fill="url(#paddle)"/>
          <rect x="130" y="150" width="40" height="40" fill="#374151"/>
          <text x="150" y="170" font-family="Arial" font-size="8" fill="white" text-anchor="middle">GRIP</text>
          <text x="150" y="30" font-family="Arial" font-size="14" fill="#1e40af" text-anchor="middle" font-weight="bold">PADDLES</text>
          <!-- Expertise indicators -->
          <text x="75" y="50" font-family="Arial" font-size="8" fill="#1e40af" text-anchor="middle">Weight</text>
          <text x="75" y="62" font-family="Arial" font-size="8" fill="#1e40af" text-anchor="middle">Analysis</text>
          <text x="225" y="50" font-family="Arial" font-size="8" fill="#1e40af" text-anchor="middle">Core &</text>
          <text x="225" y="62" font-family="Arial" font-size="8" fill="#1e40af" text-anchor="middle">Face Tech</text>
        </svg>
      `)}`,
      description: 'Performance analysis based on your playing style, skill level, and physical needs.',
      features: ['Weight & grip guidance', 'Core material expertise', 'Skill level matching', 'Power vs control analysis'],
      priceRange: '$30-400'
    },
    {
      name: '🛋️ Couches & Sofas',
      image: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#fef7cd"/>
          <rect x="50" y="120" width="200" height="60" fill="#8b5cf6" rx="10"/>
          <rect x="40" y="110" width="30" height="70" fill="#7c3aed" rx="15"/>
          <rect x="230" y="110" width="30" height="70" fill="#7c3aed" rx="15"/>
          <rect x="70" y="100" width="160" height="20" fill="#6d28d9" rx="10"/>
          <text x="150" y="40" font-family="Arial" font-size="14" fill="#7c2d12" text-anchor="middle" font-weight="bold">FURNITURE</text>
          <!-- Expertise indicators -->
          <text x="75" y="85" font-family="Arial" font-size="8" fill="#7c2d12" text-anchor="middle">Space</text>
          <text x="75" y="97" font-family="Arial" font-size="8" fill="#7c2d12" text-anchor="middle">Planning</text>
          <text x="225" y="85" font-family="Arial" font-size="8" fill="#7c2d12" text-anchor="middle">Frame</text>
          <text x="225" y="97" font-family="Arial" font-size="8" fill="#7c2d12" text-anchor="middle">Quality</text>
          <text x="150" y="190" font-family="Arial" font-size="10" fill="#92400e" text-anchor="middle">Room size • Durability • Lifestyle fit</text>
        </svg>
      `)}`,
      description: 'Space planning, material quality, and lifestyle matching for your perfect seating solution.',
      features: ['Room size optimization', 'Material & frame quality', 'Lifestyle compatibility', 'Long-term durability'],
      priceRange: '$400-8,000'
    },
    {
      name: '👶 Baby Strollers',
      image: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#fef3c7"/>
          <rect x="100" y="80" width="100" height="60" fill="#f59e0b" rx="10"/>
          <circle cx="110" cy="160" r="15" fill="#374151"/>
          <circle cx="190" cy="160" r="15" fill="#374151"/>
          <rect x="90" y="60" width="20" height="40" fill="#d97706"/>
          <rect x="110" y="70" width="80" height="10" fill="#92400e"/>
          <text x="150" y="40" font-family="Arial" font-size="14" fill="#92400e" text-anchor="middle" font-weight="bold">STROLLERS</text>
          <!-- Safety indicators -->
          <text x="75" y="50" font-family="Arial" font-size="8" fill="#92400e" text-anchor="middle">Safety</text>
          <text x="75" y="62" font-family="Arial" font-size="8" fill="#92400e" text-anchor="middle">Standards</text>
          <text x="225" y="50" font-family="Arial" font-size="8" fill="#92400e" text-anchor="middle">Age</text>
          <text x="225" y="62" font-family="Arial" font-size="8" fill="#92400e" text-anchor="middle">Compatibility</text>
          <text x="150" y="190" font-family="Arial" font-size="10" fill="#b45309" text-anchor="middle">Safety first • Age-appropriate • Lifestyle matching</text>
        </svg>
      `)}`,
      description: 'Safety standards, age compatibility, and lifestyle analysis for your family\'s needs.',
      features: ['JPMA safety certification', 'Age-stage compatibility', 'Lifestyle assessment', 'Long-term usability'],
      priceRange: '$50-600'
    }
  ]
} 