'use client'

import { useState } from 'react'
import ProductSearch from '../components/ProductSearch'
import { TestTube, Lightbulb, Zap } from 'lucide-react'

const EXAMPLE_SEARCHES = [
  {
    title: "Tech Gadgets",
    criteria: "wireless earbuds under $100 with good battery life",
    icon: <Zap className="h-5 w-5" />
  },
  {
    title: "Home & Kitchen",
    criteria: "coffee maker with programmable timer and thermal carafe",
    icon: <TestTube className="h-5 w-5" />
  },
  {
    title: "Fitness",
    criteria: "running shoes for beginners with good cushioning under $150",
    icon: <Lightbulb className="h-5 w-5" />
  },
  {
    title: "Gaming",
    criteria: "mechanical keyboard for gaming with RGB lighting",
    icon: <Zap className="h-5 w-5" />
  },
  {
    title: "Fashion",
    criteria: "winter jacket waterproof and warm for outdoor activities",
    icon: <TestTube className="h-5 w-5" />
  },
  {
    title: "Books & Education",
    criteria: "programming books for learning Python and data science",
    icon: <Lightbulb className="h-5 w-5" />
  }
]

export default function TestShoppingApiPage() {
  const [selectedExample, setSelectedExample] = useState<string | null>(null)

  const handleExampleClick = (criteria: string) => {
    setSelectedExample(criteria)
    // You can extend this to auto-fill the search in ProductSearch component
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping API Test Page</h1>
            <p className="text-xl text-gray-600 mb-2">
              Test the AI-powered product search functionality
            </p>
            <p className="text-sm text-gray-500">
              This page demonstrates how OpenAI API can find real product links based on search criteria
            </p>
          </div>
        </div>
      </div>

      {/* API Info Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-medium mb-2">Input Criteria</h3>
              <p className="text-sm text-gray-600">
                Enter what you're looking for with specific requirements like price, features, etc.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="font-medium mb-2">AI Processing</h3>
              <p className="text-sm text-gray-600">
                OpenAI analyzes your criteria and searches for real products from major retailers
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="font-medium mb-2">Real Results</h3>
              <p className="text-sm text-gray-600">
                Get actual product links with prices, ratings, and detailed information
              </p>
            </div>
          </div>
        </div>

        {/* Example Searches */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Try These Example Searches</h2>
          <p className="text-gray-600 mb-6">
            Click any example below to see how the AI finds real products
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXAMPLE_SEARCHES.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example.criteria)}
                className={`p-4 border rounded-lg text-left hover:border-blue-500 hover:shadow-md transition-all ${
                  selectedExample === example.criteria 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-blue-500">
                    {example.icon}
                  </div>
                  <h3 className="font-medium">{example.title}</h3>
                </div>
                <p className="text-sm text-gray-600">"{example.criteria}"</p>
              </button>
            ))}
          </div>
        </div>

        {/* API Testing Notes */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Testing Notes</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-green-700 mb-2">✅ What to Test:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Different product categories (electronics, clothing, home goods, etc.)</li>
                <li>Price constraints ("under $50", "between $100-200")</li>
                <li>Specific features ("waterproof", "wireless", "noise-canceling")</li>
                <li>Brand preferences or exclusions</li>
                <li>Use cases ("for gaming", "for beginners", "for professionals")</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-blue-700 mb-2">📝 Expected Behavior:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Returns 5+ real products with actual shopping links</li>
                <li>Includes price ranges (Budget/Mid-range/Premium)</li>
                <li>Shows ratings and key features</li>
                <li>Links to major retailers (Amazon, Best Buy, Target, etc.)</li>
                <li>Provides a search summary explaining the results</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-orange-700 mb-2">⚠️ Limitations:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Product availability and prices may change</li>
                <li>AI responses are based on training data and may not reflect real-time inventory</li>
                <li>Links should be verified before making purchases</li>
                <li>Results may vary based on search phrasing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Product Search Component */}
        <ProductSearch initialCriteria={selectedExample || ''} />
      </div>
    </div>
  )
} 