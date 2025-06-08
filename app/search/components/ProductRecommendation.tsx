'use client'

import { useState } from 'react'
import { ExternalLink, Star, ShoppingCart } from 'lucide-react'
import { ProductLink } from '../data/product-links/pickleball'

interface ProductRecommendationProps {
  products: ProductLink[]
  title?: string
  isLoading?: boolean
}

export default function ProductRecommendation({ 
  products, 
  title = "Recommended Products",
  isLoading = false 
}: ProductRecommendationProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const handleImageError = (productId: string) => {
    setImageErrors(prev => new Set([...prev, productId]))
  }

  const getImageSrc = (product: ProductLink) => {
    if (imageErrors.has(product.id)) {
      // Fallback to a placeholder when image fails to load
      return `data:image/svg+xml,${encodeURIComponent(`
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f3f4f6"/>
          <text x="50%" y="40%" font-family="Arial" font-size="12" fill="#6b7280" text-anchor="middle">
            ${product.brand}
          </text>
          <text x="50%" y="60%" font-family="Arial" font-size="10" fill="#6b7280" text-anchor="middle">
            ${product.name}
          </text>
        </svg>
      `)}`
    }
    return product.image
  }

  if (isLoading) {
    return (
      <div className="w-full bg-white dark:bg-gray-900 border-t">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">{title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-3"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 border-t">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-sm text-muted-foreground">{products.length} products</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={getImageSrc(product)}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={() => handleImageError(product.id)}
                />
                {product.originalPrice && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Save ${(product.originalPrice - product.price).toFixed(0)}
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                {/* Brand & Name */}
                <div className="mb-2">
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                  <h4 className="font-medium text-sm leading-tight">{product.name}</h4>
                </div>
                
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= Math.floor(product.rating!)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>
                )}
                
                {/* Description */}
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Key Specs */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">Weight:</span>
                    <p className="font-medium">{product.weight}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Core:</span>
                    <p className="font-medium">{product.coreType}</p>
                  </div>
                </div>
                
                {/* Price & Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-600">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <a
                    href={product.retailerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    Buy Now
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                
                {/* Retailer */}
                <p className="text-xs text-muted-foreground mt-2">
                  Available at {product.retailer}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Disclaimer */}
        <div className="mt-4 text-xs text-muted-foreground text-center">
          <p>Prices and availability may vary. External links lead to retailer websites.</p>
        </div>
      </div>
    </div>
  )
} 