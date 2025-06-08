export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ConversationState {
  messages: Message[]
  isLoading: boolean
  sessionId: string
}

export interface ProductRecommendation {
  id: string
  name: string
  description: string
  price: number
  priceRange: 'budget' | 'mid-range' | 'premium'
  features: string[]
  reasoning: string
  rating?: number
  imageUrl?: string
}

export interface ShoppingContext {
  category?: string
  budget?: {
    min: number
    max: number
  }
  preferences: string[]
  requirements: string[]
  useCase?: string
} 