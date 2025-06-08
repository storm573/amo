'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

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

interface VisualCanvasProps {
  content?: VisualContent
  isLoading?: boolean
}

// Default landing content
const defaultLandingContent: VisualContent = {
  type: 'image',
  title: 'Welcome to Your AI Shopping Assistant',
  description: 'Start typing or speaking to explore products and get personalized recommendations tailored just for you.',
  src: '/buying_landing.png'
}

export default function VisualCanvas({ content = defaultLandingContent, isLoading = false }: VisualCanvasProps) {
  const [selectedItem, setSelectedItem] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

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
    <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6 overflow-y-auto">
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
  )
} 