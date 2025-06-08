'use client'

import { useState, useCallback, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Message, ConversationState } from '@/lib/types'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'
import VisualCanvas from './components/VisualCanvas'
import ProductRecommendation from './components/ProductRecommendation'
import { productVisuals, detectProductCategory } from './data/productVisuals'
import { pickleballProducts, getProductsByCategory, getFeaturedProducts, ProductLink } from './data/product-links/pickleball'

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

export default function SearchPage() {
  const [conversation, setConversation] = useState<ConversationState>({
    messages: [],
    isLoading: false,
    sessionId: uuidv4()
  })
  
  const [visualContent, setVisualContent] = useState<VisualContent>(productVisuals.default)
  const [isSearchingImages, setIsSearchingImages] = useState(false)
  const [recommendedProducts, setRecommendedProducts] = useState<ProductLink[]>([])
  const [showRecommendations, setShowRecommendations] = useState(false)

  // Auto-detect product category and update visuals
  useEffect(() => {
    if (conversation.messages.length > 0) {
      const messageContents = conversation.messages.map(m => m.content)
      const detectedCategory = detectProductCategory(messageContents)
      
      // Only update if category changed and we're not currently searching
      if (!isSearchingImages && visualContent.category !== detectedCategory) {
        setVisualContent(productVisuals[detectedCategory as keyof typeof productVisuals] || productVisuals.default)
      }
    }
  }, [conversation.messages, isSearchingImages, visualContent.category])

  // Function to search for images using web search
  const searchImages = useCallback(async (query: string) => {
    setIsSearchingImages(true)
    try {
      // Use web search to find product images
      const response = await fetch('/api/search-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, productType: 'product' })
      })
      
      if (response.ok) {
        const data = await response.json()
        setVisualContent({
          type: 'search',
          title: `${query} - Visual Examples`,
          description: `Here are some examples of ${query} to help with your decision`,
          searchQuery: query,
          images: data.images || []
        })
      }
    } catch (error) {
      console.error('Image search failed:', error)
    } finally {
      setIsSearchingImages(false)
    }
  }, [])

  // Function to parse AI response for "Show image:" directives
  const parseImageDirectives = useCallback((content: string) => {
    const imageRegex = /Show image:\s*([^.\n]+)/gi
    const matches = content.match(imageRegex)
    
    if (matches && matches.length > 0) {
      // Extract the search query from the first match
      const searchQuery = matches[0].replace(/Show image:\s*/i, '').trim()
      if (searchQuery) {
        searchImages(searchQuery)
      }
    }
  }, [searchImages])

  // Function to update product recommendations based on conversation
  const updateRecommendations = useCallback((messages?: Message[]) => {
    const messagesToAnalyze = messages || conversation.messages
    const conversationText = messagesToAnalyze.map(m => m.content.toLowerCase()).join(' ')
    
    // Detect if we're talking about products in general
    const isProductContext = /pickleball|paddle|court|sport|game|serve|volley|buy|purchase|looking for|need|want|shopping|product|equipment|gear|racket|racquet/i.test(conversationText)
    
    // For now, we only have pickleball products, so check specifically for pickleball context
    const isPickleballContext = /pickleball|paddle|court|sport|game|serve|volley|racket|racquet/i.test(conversationText)
    
    if (!isProductContext && !isPickleballContext) {
      setShowRecommendations(false)
      return
    }

    // If it's a general product context but not specifically pickleball, show featured products
    if (isProductContext && !isPickleballContext) {
      setRecommendedProducts(getFeaturedProducts(6))
      setShowRecommendations(true)
      return
    }

    let products: ProductLink[] = []

    // Analyze skill level mentioned in conversation
    const isBeginner = /beginner|start|new|first time|learn|never played/i.test(conversationText)
    const isAdvanced = /advanced|pro|competitive|tournament|expert|experienced|years/i.test(conversationText)
    const isIntermediate = /intermediate|improving|played before|some experience|casual|recreational/i.test(conversationText)

    // Analyze budget preferences
    const lowBudget = /budget|cheap|affordable|under.*100|less.*100|inexpensive|save money/i.test(conversationText)
    const highBudget = /premium|best|top|expensive|over.*200|above.*200|high quality|professional/i.test(conversationText)

    // Choose products based on conversation context
    if (isBeginner || lowBudget) {
      products = getProductsByCategory('beginner')
    } else if (isAdvanced || highBudget) {
      products = getProductsByCategory('advanced')
    } else if (isIntermediate) {
      products = getProductsByCategory('intermediate')
    } else {
      // Default to featured products across all categories
      products = getFeaturedProducts(6)
    }

    setRecommendedProducts(products.slice(0, 6)) // Limit to 6 products
    setShowRecommendations(true)
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date()
    }

    // Add user message and set loading state
    setConversation(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true
    }))

    // Check for product recommendations immediately after user message
    const updatedMessages = [...conversation.messages, userMessage]
    setTimeout(() => {
      updateRecommendations(updatedMessages)
    }, 50)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...conversation.messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          sessionId: conversation.sessionId
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      }

      // Parse the AI response for image directives
      parseImageDirectives(data.message)

      const finalMessages = [...conversation.messages, userMessage, assistantMessage]
      
      setConversation(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }))

      // Update product recommendations after assistant responds
      setTimeout(() => updateRecommendations(finalMessages), 100)

    } catch (error) {
      console.error('Error sending message:', error)
      
      const errorMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again or check your internet connection.",
        timestamp: new Date()
      }

      setConversation(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false
      }))
    }
  }, [conversation.messages, conversation.sessionId, parseImageDirectives, updateRecommendations])

  return (
    <div className="flex h-screen bg-background">
      {/* Left Side - Visual Canvas + Product Recommendations (2/3) */}
      <div className="w-2/3 h-full flex flex-col">
        {/* Visual Canvas */}
        <div className="flex-1 min-h-0">
          <VisualCanvas 
            content={visualContent} 
            isLoading={conversation.isLoading || isSearchingImages} 
          />
        </div>
        
        {/* Product Recommendations */}
        {showRecommendations && (
          <div className="flex-shrink-0 max-h-1/2 overflow-y-auto">
            <ProductRecommendation 
              products={recommendedProducts}
              title="Recommended Products"
              isLoading={conversation.isLoading}
            />
          </div>
        )}
      </div>

      {/* Right Side - Chat Interface (1/3) */}
      <div className="w-1/3 h-full flex flex-col border-l bg-background">
        {/* Chat Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="flex h-14 items-center px-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                AI
              </div>
              <div>
                <h1 className="text-lg font-semibold">Amo</h1>
                <p className="text-xs text-muted-foreground">
                  Smart shopping guidance
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Chat Messages */}
        <MessageList 
          messages={conversation.messages} 
          isLoading={conversation.isLoading} 
        />

        {/* Chat Input */}
        <ChatInput 
          onSendMessage={sendMessage}
          disabled={conversation.isLoading}
        />
      </div>
    </div>
  )
} 