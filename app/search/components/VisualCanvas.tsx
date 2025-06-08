'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Star } from 'lucide-react'

interface VisualContent {
  type: 'image' | 'video' | 'comparison' | 'example' | 'search' | 'showcase'
  title: string
  description: string
  category?: string
  src?: string
  searchQuery?: string
  items?: Array<{
    name: string
    image: string
    features: string[]
    priceRange: string
  }>
  images?: Array<{
    url: string
    title: string
    description?: string
  }>
}

interface ProductRecommendation {
  id: string
  name: string
  image: string
  price: string
  rating: number
  keyFeature: string
  matchReason: string
  link?: string
}

interface VisualCanvasProps {
  content?: VisualContent
  isLoading?: boolean
  recommendations?: ProductRecommendation[]
}

// Default landing content
const defaultLandingContent: VisualContent = {
  type: 'image',
  title: 'Welcome to Your AI Shopping Assistant',
  description: 'Start typing or speaking to explore products and get personalized recommendations tailored just for you.',
  src: '/buying_landing.png'
}

export default function VisualCanvas({ content = defaultLandingContent, isLoading = false, recommendations }: VisualCanvasProps) {
  const [selectedItem, setSelectedItem] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Default recommendations for demo
  const defaultRecommendations: ProductRecommendation[] = [
    {
      id: '1',
      name: 'Nuna PIPA RX Infant Car Seat + RELX Base',
      image: 'https://m.media-amazon.com/images/I/61fMCUlrPWL._SL1500_.jpg',
      price: '$450',
      rating: 4.9,
      keyFeature: 'Best crash test results',
      matchReason: 'Lightest weight (8.5 lbs) with superior safety',
      link: 'https://www.bambibaby.com/products/nuna-pipa-rx-infant-car-seat-pipa-relx-base-1?variant=44186731118789'
    },
    {
      id: '2',
      name: 'Nuna PIPA Aire Infant Car Seat',
      image: 'https://babyongrand.com/cdn/shop/files/Nuna_PIPAaire_Biscotti_Angle_US_8x8_5779ff4c-035e-4d4a-bdb3-09698829de76.png?v=1729782355&width=1080',
      price: '$329',
      rating: 4.8,
      keyFeature: 'Lightweight & breathable',
      matchReason: 'Ultra-light design with mesh ventilation',
      link: 'https://www.bambibaby.com/products/nuna-pipa-aire-infant-car-seat?variant=44152830591173'
    },
    {
      id: '3',
      name: 'CYBEX Cloud T SensorSafe Infant Car Seat',
      image: 'https://m.media-amazon.com/images/I/71CpnjTVJDL._SL1500_.jpg',
      price: '$399',
      rating: 4.7,
      keyFeature: 'Smart sensor technology',
      matchReason: 'Alerts for safety with app connectivity',
      link: 'https://www.bambibaby.com/products/cybex-cloud-t-sensorsafe-infant-car-seat-sepia-black?variant=44174548926661'
    },
    {
      id: '4',
      name: 'Evenflo Revolve180 LiteMax NXT Rotational',
      image: 'https://target.scene7.com/is/image/Target/GUEST_32d45c36-2c25-4209-8e46-8497cfc8f06b',
      price: '$279',
      rating: 4.6,
      keyFeature: '180° rotation',
      matchReason: 'Easy loading with rotating convenience',
      link: 'https://www.evenflo.com/products/revolve180-litemax-nxt-gold?variant=44759101964444'
    },
    {
      id: '5',
      name: 'Graco SnugRide 35 Lite LX Infant Car Seat',
      image: 'https://orbitbaby.com/cdn/shop/products/ToddlerCarSeat_Merino_Wool_01_19c14ff8-3c87-40af-a2c4-218211707e33.jpg?v=1642116461',
      price: '$149',
      rating: 4.5,
      keyFeature: 'Budget-friendly reliability',
      matchReason: 'Trusted brand with essential safety features',
      link: 'https://www.gracobaby.com/car-seats/infant-car-seats/snugride-35-lite-lx-infant-car-seat/'
    },
    {
      id: '6',
      name: 'Cosco Scenera Next Convertible Car Seat',
      image: 'https://target.scene7.com/is/image/Target/GUEST_9b599553-a30e-4630-b96a-98723c458245',
      price: '$59',
      rating: 4.2,
      keyFeature: 'Ultra-affordable',
      matchReason: 'Basic safety at the lowest price point',
      link: 'https://www.coscocarseats.com/products/scenera-next'
    }
  ];

  const displayRecommendations = recommendations || defaultRecommendations;

  if (isLoading) {
    return (
      <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading visual examples...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Main Content Section (3/4 height) */}
      <div className="flex-grow h-3/4 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
          <p className="text-muted-foreground text-lg">{content.description}</p>
        </div>

        {/* Content based on type */}
        {(content.type === 'example' || content.type === 'showcase') && content.items && (
          <div className="space-y-6">
            {/* Navigation tabs */}
            <div className="flex space-x-2 bg-white/50 dark:bg-gray-800/50 rounded-lg p-1">
              {content.items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedItem(index)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedItem === index
                      ? 'bg-white dark:bg-gray-700 shadow-sm text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Selected item display */}
            {content.items[selectedItem] && (
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Image */}
                  <div className="space-y-4">
                    <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <img
                        src={content.items[selectedItem].image}
                        alt={content.items[selectedItem].name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `data:image/svg+xml,${encodeURIComponent(`
                            <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                              <rect width="100%" height="100%" fill="#f3f4f6"/>
                              <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#6b7280" text-anchor="middle" dy=".3em">
                                ${content.items![selectedItem].name}
                              </text>
                            </svg>
                          `)}`
                        }}
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold">{content.items[selectedItem].name}</h3>
                      <p className="text-blue-600 font-medium">{content.items[selectedItem].priceRange}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Key Features:</h4>
                    <ul className="space-y-2">
                      {content.items[selectedItem].features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        💡 <strong>Best for:</strong> {
                          selectedItem === 0 ? 'New players learning the game and developing technique' :
                          selectedItem === 1 ? 'Players who have basic skills and want more performance' :
                          'Experienced players who demand professional-level equipment'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Additional info */}
            {content.type === 'showcase' ? (
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-3">🎯 What makes me different?</h4>
                <p className="text-muted-foreground">
                  I specialize in complex purchases where quality, features, and fit really matter. Instead of just showing you products, 
                  I ask the right questions to understand your needs, explain the key differences between options, and guide you 
                  through smart price tier analysis.
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-3">💡 Expert Insight</h4>
                <p className="text-muted-foreground">
                  {content.category === 'pickleball' ? 
                    'The right paddle can significantly impact your game. Weight, grip size, and face material all affect how the ball responds. Most beginners benefit from lighter paddles with larger sweet spots, while advanced players often prefer heavier paddles for more power and spin.' :
                    content.category === 'couch' ?
                    'Your couch is more than furniture - it\'s where you relax, entertain, and live. Consider your space size, daily use patterns, and long-term durability. Quality construction and the right size can make the difference between a great purchase and buyer\'s remorse.' :
                    content.category === 'stroller' ?
                    'Safety standards, age compatibility, and your lifestyle are key factors. Consider where you\'ll use it most - smooth sidewalks, rough terrain, or frequent car trips. The right stroller grows with your child and makes your daily routine easier.' :
                    'Quality and fit matter more than brand names. I\'ll help you understand what features actually impact your experience and which price points offer the best value for your specific needs.'
                  }
                </p>
              </div>
            )}
          </div>
        )}

        {/* Video content */}
        {content.type === 'video' && (
          <div className="space-y-4">
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
              {content.src ? (
                <video 
                  src={content.src} 
                  className="w-full h-full object-cover"
                  controls
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <Play className="w-16 h-16 mb-4 mx-auto" />
                    <p>Video content would appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Single image content */}
        {content.type === 'image' && (
          <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm">
            <div className="aspect-[16/10] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
              {content.src ? (
                <img src={content.src} alt={content.title} className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <span>Image placeholder</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search results */}
        {content.type === 'search' && content.images && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {content.images.map((image, index) => (
                <div key={index} className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 backdrop-blur-sm">
                  <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-3">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `data:image/svg+xml,${encodeURIComponent(`
                          <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100%" height="100%" fill="#f3f4f6"/>
                            <text x="50%" y="50%" font-family="Arial" font-size="12" fill="#6b7280" text-anchor="middle">
                              ${image.title}
                            </text>
                          </svg>
                        `)}`
                      }}
                    />
                  </div>
                  <h4 className="font-medium text-sm mb-1">{image.title}</h4>
                  {image.description && (
                    <p className="text-xs text-muted-foreground">{image.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Product Recommendations Section (1/4 height) */}
      {/* <div className="h-1/4 border-t border-white/20 bg-white/10 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto h-full">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              🎯 Top Recommendations for You
            </h3>
            <span className="text-xs text-gray-600 dark:text-gray-400 bg-white/50 px-2 py-1 rounded-full">
              Based on your conversation
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-full max-h-32">
            {displayRecommendations.slice(0, 3).map((product) => {
              const CardContent = (
                <>
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `data:image/svg+xml,${encodeURIComponent(`
                          <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100%" height="100%" fill="#f3f4f6"/>
                            <text x="50%" y="50%" font-family="Arial" font-size="10" fill="#6b7280" text-anchor="middle" dy=".3em">
                              Product
                            </text>
                          </svg>
                        `)}`
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                        {product.price}
                      </span>
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-xs">★</span>
                        <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                      {product.keyFeature}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium truncate">
                      {product.matchReason}
                    </p>
                    {product.link && (
                      <p className="text-xs text-blue-500 dark:text-blue-300 mt-1">
                        View Product →
                      </p>
                    )}
                  </div>
                </>
              );

              return product.link ? (
                <a 
                  key={product.id}
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-3 flex items-center space-x-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:bg-white/90 dark:hover:bg-gray-800/90"
                >
                  {CardContent}
                </a>
              ) : (
                <div key={product.id} className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-3 flex items-center space-x-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
    </div>
  )
} 