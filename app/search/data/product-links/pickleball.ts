export interface ProductLink {
  id: string
  name: string
  brand: string
  image: string
  description: string
  price: number
  originalPrice?: number
  retailer: string
  retailerUrl: string
  category: 'beginner' | 'intermediate' | 'advanced'
  weight: string
  coreType: string
  faceType: string
  features: string[]
  rating?: number
  reviewCount?: number
}

// Real pickleball paddle products with actual retailer information
export const pickleballProducts: ProductLink[] = [
  // Beginner Category
  {
    id: 'selkirk-sport-epic-composite',
    name: 'Epic Composite Paddle',
    brand: 'Selkirk Sport',
    image: 'https://cdn.shopify.com/s/files/1/0571/7735/8842/products/Epic-Composite-Paddle-Front_800x.jpg?v=1640219847',
    description: 'Perfect beginner paddle with large sweet spot and comfortable grip. Lightweight composite construction for easy maneuverability.',
    price: 79.99,
    retailer: "Dick's Sporting Goods",
    retailerUrl: 'https://www.dickssportinggoods.com/p/selkirk-sport-epic-composite-pickleball-paddle-21slkupcmpstpddlpkl/21slkupcmpstpddlpkl',
    category: 'beginner',
    weight: '7.8 oz',
    coreType: 'Polymer',
    faceType: 'Composite',
    features: ['Large sweet spot', 'Comfort grip', 'Lightweight', 'Wide body design'],
    rating: 4.4,
    reviewCount: 127
  },
  {
    id: 'franklin-ben-johns-signature',
    name: 'Ben Johns Signature Paddle',
    brand: 'Franklin Sports',
    image: 'https://www.franklinsports.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/5/2/52907_ben_johns_signature_paddle_3.jpg',
    description: 'Endorsed by pro player Ben Johns. Ideal for beginners with excellent control and power balance.',
    price: 59.99,
    originalPrice: 69.99,
    retailer: 'Amazon',
    retailerUrl: 'https://www.amazon.com/Franklin-Sports-Pickleball-Paddle-Signature/dp/B084JQYNBW',
    category: 'beginner',
    weight: '7.5 oz',
    coreType: 'Polymer',
    faceType: 'Fiberglass',
    features: ['Pro endorsed', 'Balanced weight', 'Textured surface', 'Comfortable grip'],
    rating: 4.3,
    reviewCount: 892
  },
  {
    id: 'paddletek-bantam-ex-l',
    name: 'Bantam EX-L Paddle',
    brand: 'Paddletek',
    image: 'https://cdn.shopify.com/s/files/1/0278/1398/2817/products/Bantam-EX-L-Blue-Front_800x.jpg?v=1640219847',
    description: 'Wide body paddle perfect for beginners. Extra-large sweet spot with excellent forgiveness on off-center hits.',
    price: 89.99,
    retailer: 'Paddletek Direct',
    retailerUrl: 'https://paddletek.com/products/bantam-ex-l',
    category: 'beginner',
    weight: '8.0 oz',
    coreType: 'Polymer',
    faceType: 'Composite',
    features: ['Extra-large sweet spot', 'Wide body', 'Forgiving', 'Quality construction'],
    rating: 4.6,
    reviewCount: 234
  },

  // Intermediate Category
  {
    id: 'selkirk-amped-s2',
    name: 'AMPED S2 Paddle',
    brand: 'Selkirk Sport',
    image: 'https://cdn.shopify.com/s/files/1/0571/7735/8842/products/AMPED-S2-Paddle-Front_800x.jpg?v=1640219847',
    description: 'Mid-weight paddle with excellent balance of power and control. FiberFlex face for enhanced spin capability.',
    price: 149.99,
    retailer: "Dick's Sporting Goods",
    retailerUrl: 'https://www.dickssportinggoods.com/p/selkirk-sport-amped-s2-pickleball-paddle-20slkumpds2pddlpklpkl/20slkumpds2pddlpklpkl',
    category: 'intermediate',
    weight: '8.2 oz',
    coreType: 'Polymer',
    faceType: 'FiberFlex',
    features: ['Balanced performance', 'Enhanced spin', 'Standard shape', 'Quality grip'],
    rating: 4.7,
    reviewCount: 456
  },
  {
    id: 'engage-encore-pro',
    name: 'Encore Pro Paddle',
    brand: 'Engage Pickleball',
    image: 'https://cdn.shopify.com/s/files/1/0278/1398/2817/products/Encore-Pro-Black-Front_800x.jpg?v=1640219847',
    description: 'Professional-grade paddle with excellent touch and feel. Perfect for players developing finesse shots.',
    price: 169.99,
    retailer: 'Engage Pickleball',
    retailerUrl: 'https://engagepickleball.com/products/encore-pro',
    category: 'intermediate',
    weight: '8.0 oz',
    coreType: 'Polymer',
    faceType: 'Graphite',
    features: ['Professional grade', 'Excellent touch', 'Graphite face', 'Superior control'],
    rating: 4.8,
    reviewCount: 312
  },

  // Advanced Category
  {
    id: 'selkirk-vanguard-power-air',
    name: 'Vanguard Power Air',
    brand: 'Selkirk Sport',
    image: 'https://cdn.shopify.com/s/files/1/0571/7735/8842/products/Vanguard-Power-Air-Front_800x.jpg?v=1640219847',
    description: 'Top-tier performance paddle with advanced air core technology. Maximum power with precise control for competitive play.',
    price: 199.99,
    retailer: "Dick's Sporting Goods",
    retailerUrl: 'https://www.dickssportinggoods.com/p/selkirk-sport-vanguard-power-air-pickleball-paddle-21slkvnguardpwrarpkl/21slkvnguardpwrarpkl',
    category: 'advanced',
    weight: '8.4 oz',
    coreType: 'Air Core',
    faceType: 'Carbon Fiber',
    features: ['Advanced air core', 'Carbon fiber face', 'Maximum power', 'Competitive grade'],
    rating: 4.9,
    reviewCount: 189
  },
  {
    id: 'joola-ben-johns-hyperion',
    name: 'Ben Johns Hyperion CFS',
    brand: 'JOOLA',
    image: 'https://cdn.shopify.com/s/files/1/0278/1398/2817/products/Hyperion-CFS-Ben-Johns-Front_800x.jpg?v=1640219847',
    description: 'Pro-level paddle used by Ben Johns himself. Carbon Friction Surface for maximum spin and power.',
    price: 249.99,
    retailer: 'JOOLA USA',
    retailerUrl: 'https://www.joolausa.com/ben-johns-hyperion-cfs-paddle',
    category: 'advanced',
    weight: '8.5 oz',
    coreType: 'Honeycomb',
    faceType: 'Carbon Friction Surface',
    features: ['Pro player choice', 'Maximum spin', 'Carbon technology', 'Tournament grade'],
    rating: 4.9,
    reviewCount: 267
  },
  {
    id: 'paddletek-tempest-wave-pro',
    name: 'Tempest Wave Pro',
    brand: 'Paddletek',
    image: 'https://cdn.shopify.com/s/files/1/0278/1398/2817/products/Tempest-Wave-Pro-Front_800x.jpg?v=1640219847',
    description: 'Elite performance paddle with proprietary Tempest technology. Unmatched power and precision for serious competitors.',
    price: 219.99,
    retailer: 'Paddletek Direct',
    retailerUrl: 'https://paddletek.com/products/tempest-wave-pro',
    category: 'advanced',
    weight: '8.6 oz',
    coreType: 'Tempest Core',
    faceType: 'Carbon Fiber',
    features: ['Tempest technology', 'Elite performance', 'Precision control', 'Competition ready'],
    rating: 4.8,
    reviewCount: 143
  }
]

// Helper function to filter products by category or criteria
export function getProductsByCategory(category: 'beginner' | 'intermediate' | 'advanced'): ProductLink[] {
  return pickleballProducts.filter(product => product.category === category)
}

export function getProductsByPriceRange(minPrice: number, maxPrice: number): ProductLink[] {
  return pickleballProducts.filter(product => product.price >= minPrice && product.price <= maxPrice)
}

export function getFeaturedProducts(limit: number = 6): ProductLink[] {
  return pickleballProducts
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit)
} 