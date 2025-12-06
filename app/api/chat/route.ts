import { readFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export async function GET() {
  try {
    // Use relative path that works in both local and Vercel deployment
    const filePath = path.join(process.cwd(), 'data', 'chat.txt')
    const content = await readFile(filePath, 'utf-8')
    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error reading chat file:', error)
    return NextResponse.json(
      { error: 'Failed to read chat file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

