import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@/lib/openai'

const PRODUCT_SEARCH_PROMPT = `You are a product search assistant that helps users find real products based on their criteria. 

When given search criteria, you should:
1. Generate relevant product recommendations with real shopping links
2. Include diverse options from different price ranges
3. Provide actual URLs from major retailers like Amazon, Best Buy, Target, Walmart, etc.
4. Include brief descriptions and key features
5. Return the response in JSON format

Response format:
{
  "products": [
    {
      "name": "Product Name",
      "description": "Brief description with key features",
      "price": "$XX.XX",
      "priceRange": "Budget/Mid-range/Premium",
      "url": "https://actual-product-url.com",
      "retailer": "Amazon/Best Buy/Target/etc",
      "rating": "4.5/5",
      "keyFeatures": ["feature1", "feature2", "feature3"]
    }
  ],
  "searchSummary": "Brief summary of the search results"
}

Important: Always provide real, clickable URLs to actual products. Do not use placeholder or example URLs.`

export async function POST(request: NextRequest) {
  try {
    const { criteria } = await request.json()

    if (!criteria || criteria.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search criteria is required' },
        { status: 400 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: PRODUCT_SEARCH_PROMPT },
        { 
          role: 'user', 
          content: `Find real products based on these criteria: ${criteria}. Please provide at least 5 different products with actual shopping links.` 
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      throw new Error('No response from OpenAI')
    }

    // Try to parse JSON response
    let parsedResponse
    try {
      parsedResponse = JSON.parse(response)
    } catch {
      // If JSON parsing fails, create a structured response
      parsedResponse = {
        products: [],
        searchSummary: response,
        error: 'Could not parse product data'
      }
    }

    return NextResponse.json(parsedResponse)

  } catch (error) {
    console.error('Product search API error:', error)
    return NextResponse.json(
      { error: 'Failed to search for products' },
      { status: 500 }
    )
  }
} 