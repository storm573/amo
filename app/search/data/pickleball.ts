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

// Based on Dick's Sporting Goods Pickleball Paddle Buying Guide
// https://www.dickssportinggoods.com/rc/pickleball-paddle-buying-guide
export const pickleballData: ProductVisual = {
  type: 'example',
  category: 'pickleball',
  title: 'Pickleball Paddles - Expert Buying Guide',
  description: 'From beginners to pros, play style influences the type of paddle you choose. Understanding materials, shape, core, face, and handle will help you pick the right paddle.',
  items: [
    {
      name: 'Beginner/Touch Paddles',
      image: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="beginnerPaddle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="#f0fdf4"/>
          <!-- Wide-body paddle shape for beginners -->
          <ellipse cx="150" cy="85" rx="70" ry="80" fill="url(#beginnerPaddle)"/>
          <rect x="120" y="165" width="60" height="25" fill="#374151" rx="3"/>
          <text x="150" y="178" font-family="Arial" font-size="8" fill="white" text-anchor="middle">COMFORT GRIP</text>
          <text x="150" y="25" font-family="Arial" font-size="12" fill="#065f46" text-anchor="middle" font-weight="bold">BEGINNER/TOUCH</text>
          <!-- Weight indicator -->
          <text x="50" y="45" font-family="Arial" font-size="9" fill="#065f46" text-anchor="middle">Light-Mid</text>
          <text x="50" y="57" font-family="Arial" font-size="9" fill="#065f46" text-anchor="middle">&lt;8.4oz</text>
          <!-- Sweet spot indicator -->
          <text x="250" y="45" font-family="Arial" font-size="9" fill="#065f46" text-anchor="middle">Large</text>
          <text x="250" y="57" font-family="Arial" font-size="9" fill="#065f46" text-anchor="middle">Sweet Spot</text>
          <!-- Core type -->
          <text x="150" y="195" font-family="Arial" font-size="8" fill="#065f46" text-anchor="middle">Polymer Core • Graphite/Carbon Face</text>
        </svg>
      `)}`,
      description: 'Perfect for newcomers and players focused on control and placement rather than power.',
      features: [
        'Light to mid-weight (7.3-8.4 oz)',
        'Wide-body or standard shape',
        'Large, forgiving sweet spot',
        'Polymer/composite core for control',
        'Graphite or carbon fiber face',
        'Comfortable grip (4¼"-4⅜")',
        'Balance of power and control'
      ],
      priceRange: '$50-150'
    },
    {
      name: 'Intermediate/All-Around',
      image: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="intermediatePaddle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="#eff6ff"/>
          <!-- Standard paddle shape -->
          <ellipse cx="150" cy="85" rx="62" ry="75" fill="url(#intermediatePaddle)"/>
          <rect x="125" y="160" width="50" height="30" fill="#1f2937" rx="3"/>
          <text x="150" y="178" font-family="Arial" font-size="8" fill="white" text-anchor="middle">STANDARD GRIP</text>
          <text x="150" y="25" font-family="Arial" font-size="12" fill="#1e3a8a" text-anchor="middle" font-weight="bold">INTERMEDIATE</text>
          <!-- Weight indicator -->
          <text x="50" y="45" font-family="Arial" font-size="9" fill="#1e3a8a" text-anchor="middle">Mid-Weight</text>
          <text x="50" y="57" font-family="Arial" font-size="9" fill="#1e3a8a" text-anchor="middle">7.3-8.4oz</text>
          <!-- Balance indicator -->
          <text x="250" y="45" font-family="Arial" font-size="9" fill="#1e3a8a" text-anchor="middle">Balanced</text>
          <text x="250" y="57" font-family="Arial" font-size="9" fill="#1e3a8a" text-anchor="middle">Power/Control</text>
          <!-- Core type -->
          <text x="150" y="195" font-family="Arial" font-size="8" fill="#1e3a8a" text-anchor="middle">Composite Core • Fiberglass Face</text>
        </svg>
      `)}`,
      description: 'Versatile paddles suitable for players developing their style and looking for balanced performance.',
      features: [
        'Mid-weight (7.3-8.4 oz)',
        'Standard shape (most popular)',
        'Composite core materials',
        'Fiberglass or hybrid face',
        'Good power and spin potential',
        'Standard handle (5"-5¼")',
        'Suitable for all skill levels'
      ],
      priceRange: '$75-200'
    },
    {
      name: 'Advanced/Power',
      image: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="advancedPaddle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#991b1b;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="#fef2f2"/>
          <!-- Elongated paddle shape for power -->
          <ellipse cx="150" cy="80" rx="55" ry="78" fill="url(#advancedPaddle)"/>
          <rect x="130" y="158" width="40" height="35" fill="#0f172a" rx="3"/>
          <text x="150" y="178" font-family="Arial" font-size="7" fill="white" text-anchor="middle">LONG HANDLE</text>
          <text x="150" y="25" font-family="Arial" font-size="12" fill="#7f1d1d" text-anchor="middle" font-weight="bold">ADVANCED/POWER</text>
          <!-- Weight indicator -->
          <text x="50" y="45" font-family="Arial" font-size="9" fill="#7f1d1d" text-anchor="middle">Heavy</text>
          <text x="50" y="57" font-family="Arial" font-size="9" fill="#7f1d1d" text-anchor="middle">8.5+ oz</text>
          <!-- Power indicator -->
          <text x="250" y="45" font-family="Arial" font-size="9" fill="#7f1d1d" text-anchor="middle">Max Power</text>
          <text x="250" y="57" font-family="Arial" font-size="9" fill="#7f1d1d" text-anchor="middle">& Spin</text>
          <!-- Core type -->
          <text x="150" y="195" font-family="Arial" font-size="8" fill="#7f1d1d" text-anchor="middle">Nomex/Thin Core • Carbon Fiber Face</text>
        </svg>
      `)}`,
      description: 'Designed for competitive players who want maximum power, spin, and precise control.',
      features: [
        'Heavy weight (8.5+ oz)',
        'Elongated shape for reach',
        'Thinner core for power return',
        'Carbon fiber or graphite face',
        'Tighter sweet spot',
        'Long handle (5½"+ for two hands)',
        'Maximum spin potential'
      ],
      priceRange: '$150-400+'
    }
  ]
}

// Expert insights based on Dick's Sporting Goods guide
export const pickleballInsights = {
  coreTypes: {
    'Polypropylene (Polymer)': 'Most popular - soft, quiet, absorbs power for control',
    'Nomex': 'Hardest core - redirects ball faster, loudest sound, popular with singles players',
    'Aluminum': 'Lightweight strength, good for net play and control'
  },
  faceTypes: {
    'Graphite': 'Light and soft, preferred by pros for control and finesse shots',
    'Carbon Fiber': 'Latest technology, massive power control with large sweet spot',
    'Fiberglass': 'Most power with textured surface for spin and flexibility',
    'Composite': 'Most common - blend of materials, good for all levels'
  },
  weightRules: {
    'Light (<7.2oz)': 'Easy maneuverability, good for net play, requires harder swing for power',
    'Mid (7.3-8.4oz)': 'Best for most players, especially beginners unsure of play style',
    'Heavy (8.5+oz)': 'Maximum power from baseline, harder on arm/shoulder'
  }
} 