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

    // Convert base64 image to file format for OpenAI
    const base64Data = sourceImage.replace(/^data:image\/[a-z]+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')
    
    // Create a File-like object
    const file = new File([buffer], 'image.png', { type: 'image/png' })
    
    // Create a simple mask (you might want to implement proper mask creation)
    // For now, we'll create a white mask the same size as the image
    const maskBuffer = Buffer.alloc(buffer.length, 255) // White mask
    const maskFile = new File([maskBuffer], 'mask.png', { type: 'image/png' })

    const response = await openai.images.edit({
      image: file,
      mask: maskFile,
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    })

    return NextResponse.json({
      imageUrl: response.data[0].url,
    })
  } catch (error) {
    console.error('Error editing image:', error)
    return NextResponse.json(
      { error: 'Failed to edit image' },
      { status: 500 }
    )
  }
}