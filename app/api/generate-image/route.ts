import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { prompt, sourceImage } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // If there's a source image, use DALL-E 2 for variations
    // If no source image, use DALL-E 3 for generation
    if (sourceImage) {
      // For image variations, we need to convert base64 to buffer
      const base64Data = sourceImage.replace(/^data:image\/[a-z]+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')
      
      // Create a proper file object for OpenAI API
      const file = new File([buffer], 'image.png', { type: 'image/png' })
      
      const response = await openai.images.createVariation({
        image: file,
        n: 1,
        size: '1024x1024',
      })

      return NextResponse.json({
        imageUrl: response.data[0]?.url || '',
      })
    } else {
      // Generate new image with DALL-E 3
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        style: 'vivid',
      })

      return NextResponse.json({
        imageUrl: response.data[0]?.url || '',
      })
    }
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}