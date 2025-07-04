import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { prompt, sourceImage } = await request.json()

    if (!prompt || !sourceImage) {
      return NextResponse.json(
        { error: 'Both prompt and source image are required' },
        { status: 400 }
      )
    }

    // Convert base64 image to buffer for OpenAI
    const base64Data = sourceImage.replace(/^data:image\/[a-z]+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')
    
    // Create a proper file object for OpenAI API
    const file = new File([buffer], 'image.png', { type: 'image/png' })
    
    // Create a simple white mask for editing
    // In production, you'd want to implement proper mask creation
    const maskSize = Math.min(buffer.length, 1024 * 1024) // Limit mask size
    const maskBuffer = Buffer.alloc(maskSize, 255) // White mask
    const maskFile = new File([maskBuffer], 'mask.png', { type: 'image/png' })

    const response = await openai.images.edit({
      image: file,
      mask: maskFile,
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    })

    return NextResponse.json({
      imageUrl: response.data[0]?.url || '',
    })
  } catch (error) {
    console.error('Error editing image:', error)
    return NextResponse.json(
      { error: 'Failed to edit image' },
      { status: 500 }
    )
  }
}