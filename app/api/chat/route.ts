import { readFile } from 'fs/promises'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const filePath = 'c:\\Users\\kaush\\Desktop\\radhika\\WhatsApp Chat with Singer Mulli\\WhatsApp Chat with Singer Mulli.txt'
    const content = await readFile(filePath, 'utf-8')
    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error reading chat file:', error)
    return NextResponse.json(
      { error: 'Failed to read chat file' },
      { status: 500 }
    )
  }
}

