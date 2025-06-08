'use client'

import React, { useState } from 'react'
import { Search, ExternalLink, Star, ShoppingCart, Loader2 } from 'lucide-react'

interface Product {
  name: string
  description: string
  price: string
  priceRange: string
  url: string
  retailer: string
  rating: string
  keyFeatures: string[]
}

interface SearchResponse {
  products: Product[]
  searchSummary: string
  error?: string
}

interface ProductSearchProps {
  initialCriteria?: string
}

export default function ProductSearch({ initialCriteria = '' }: ProductSearchProps) {
  const [criteria, setCriteria] = useState(initialCriteria)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<SearchResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Update criteria when initialCriteria changes
  React.useEffect(() => {
    if (initialCriteria && initialCriteria !== criteria) {
      setCriteria(initialCriteria)
    }
  }, [initialCriteria])

  const handleSearch = async () => {
    if (!criteria.trim()) return

    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/product-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ criteria }),
      })

      if (!response.ok) {
        throw new Error('Failed to search for products')
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const getPriceRangeColor = (priceRange: string) => {
    switch (priceRange.toLowerCase()) {
      case 'budget':
        return 'bg-green-100 text-green-800'
      case 'mid-range':
        return 'bg-yellow-100 text-yellow-800'
      case 'premium':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Product Search</h1>
        <p className="text-gray-600">Find real products by describing what you're looking for</p>
      </div>

      {/* Search Input */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="e.g., wireless headphones under $200 with noise canceling"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={isLoading || !criteria.trim()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          Search
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Search Summary */}
          {results.searchSummary && !results.error && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Search Summary</h3>
              <p className="text-blue-700">{results.searchSummary}</p>
            </div>
          )}

          {/* Error in results */}
          {results.error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-700">{results.error}</p>
              {results.searchSummary && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{results.searchSummary}</p>
                </div>
              )}
            </div>
          )}

          {/* Products Grid */}
          {results.products && results.products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.products.map((product, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriceRangeColor(product.priceRange)}`}>
                      {product.priceRange}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{product.description}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-green-600">{product.price}</span>
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    )}
                  </div>

                  {product.keyFeatures && product.keyFeatures.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {product.keyFeatures.slice(0, 3).map((feature, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-center gap-1">
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-500 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Buy on {product.retailer}
                    </a>
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No products found */}
          {results.products && results.products.length === 0 && !results.error && (
            <div className="text-center py-8">
              <p className="text-gray-500">No products found for your criteria. Try adjusting your search terms.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 