import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const ImageSearchSchema = z.object({
  query: z.string().min(1),
  productType: z.string().optional()
})

interface ImageResult {
  url: string
  title: string
  description?: string
  source?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, productType } = ImageSearchSchema.parse(body)

    // Construct search query for product images
    const searchQuery = productType 
      ? `${query} ${productType} product review comparison`
      : `${query} product review comparison`

    // Generate contextual mock images based on search query
    const generateMockImages = (query: string): ImageResult[] => {
      const lowerQuery = query.toLowerCase()
      
      // Pickleball paddle specific images
      if (lowerQuery.includes('pickleball') || lowerQuery.includes('paddle')) {
        return [
          {
            url: `data:image/svg+xml,${encodeURIComponent(`
              <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="paddle1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="#f8fafc"/>
                <ellipse cx="200" cy="120" rx="80" ry="100" fill="url(#paddle1)"/>
                <rect x="170" y="220" width="60" height="60" fill="#374151"/>
                <text x="200" y="260" font-family="Arial" font-size="10" fill="white" text-anchor="middle">GRIP</text>
                <text x="200" y="40" font-family="Arial" font-size="14" fill="#374151" text-anchor="middle">Beginner Paddle</text>
                <text x="200" y="290" font-family="Arial" font-size="10" fill="#6b7280" text-anchor="middle">Lightweight • Large Sweet Spot</text>
              </svg>
            `)}`,
            title: 'Beginner Pickleball Paddle',
            description: 'Lightweight design perfect for new players'
          },
          {
            url: `data:image/svg+xml,${encodeURIComponent(`
              <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="paddle2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#991b1b;stop-opacity:1" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="#f8fafc"/>
                <ellipse cx="200" cy="120" rx="75" ry="95" fill="url(#paddle2)"/>
                <rect x="175" y="215" width="50" height="65" fill="#1f2937"/>
                <text x="200" y="250" font-family="Arial" font-size="9" fill="white" text-anchor="middle">PRO</text>
                <text x="200" y="40" font-family="Arial" font-size="14" fill="#374151" text-anchor="middle">Advanced Paddle</text>
                <text x="200" y="290" font-family="Arial" font-size="10" fill="#6b7280" text-anchor="middle">Carbon Fiber • Maximum Control</text>
              </svg>
            `)}`,
            title: 'Advanced Pickleball Paddle',
            description: 'Professional-grade carbon fiber construction'
          }
        ]
      }
      
      // Generic product images
      return [
        {
          url: `data:image/svg+xml,${encodeURIComponent(`
            <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="#f3f4f6"/>
              <circle cx="200" cy="150" r="60" fill="#3b82f6"/>
              <text x="200" y="80" font-family="Arial" font-size="16" fill="#374151" text-anchor="middle">
                ${query.split(' ')[0]} Product
              </text>
              <text x="200" y="240" font-family="Arial" font-size="12" fill="#6b7280" text-anchor="middle">
                High Quality Option
              </text>
            </svg>
          `)}`,
          title: `${query} - Premium Option`,
          description: `High-quality ${query} for serious users`
        },
        {
          url: `data:image/svg+xml,${encodeURIComponent(`
            <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="#f9fafb"/>
              <rect x="120" y="100" width="160" height="100" fill="#10b981" rx="10"/>
              <text x="200" y="80" font-family="Arial" font-size="16" fill="#374151" text-anchor="middle">
                ${query.split(' ')[0]} Budget
              </text>
              <text x="200" y="155" font-family="Arial" font-size="14" fill="white" text-anchor="middle">
                BUDGET
              </text>
              <text x="200" y="240" font-family="Arial" font-size="12" fill="#6b7280" text-anchor="middle">
                Great Value Choice
              </text>
            </svg>
          `)}`,
          title: `${query} - Budget Option`,
          description: `Affordable ${query} with good features`
        }
      ]
    }

    const images = generateMockImages(query)

    return NextResponse.json({ images })

  } catch (error) {
    console.error('Image search error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    // Return fallback images on error
    const fallbackImages: ImageResult[] = [
      {
        url: `data:image/svg+xml,${encodeURIComponent(`
          <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#fee2e2"/>
            <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#dc2626" text-anchor="middle">
              Search temporarily unavailable
            </text>
          </svg>
        `)}`,
        title: 'Search Error',
        description: 'Image search temporarily unavailable'
      }
    ]

    return NextResponse.json({ images: fallbackImages })
  }
} 