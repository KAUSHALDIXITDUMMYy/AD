import { NextRequest, NextResponse } from 'next/server'

// In-memory storage (will reset on server restart)
// For production, consider using a database like Vercel KV, PostgreSQL, etc.
interface Visitor {
  ip: string
  device: string
  userAgent: string
  timestamp: string
}

let visitors: Visitor[] = []
let visitCount = 0

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  // Check various headers for IP address
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip') // Cloudflare
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  return 'unknown'
}

// Helper function to parse device name from user agent
function getDeviceName(userAgent: string): string {
  if (!userAgent) return 'Unknown Device'
  
  const ua = userAgent.toLowerCase()
  
  // Mobile devices
  if (ua.includes('iphone')) return 'iPhone'
  if (ua.includes('ipad')) return 'iPad'
  if (ua.includes('android')) {
    if (ua.includes('mobile')) return 'Android Phone'
    return 'Android Tablet'
  }
  if (ua.includes('windows phone')) return 'Windows Phone'
  
  // Desktop OS
  if (ua.includes('windows')) return 'Windows PC'
  if (ua.includes('mac os')) return 'Mac'
  if (ua.includes('linux')) return 'Linux PC'
  if (ua.includes('chrome os')) return 'Chrome OS'
  
  // Browsers (fallback)
  if (ua.includes('chrome')) return 'Chrome Browser'
  if (ua.includes('firefox')) return 'Firefox Browser'
  if (ua.includes('safari')) return 'Safari Browser'
  if (ua.includes('edge')) return 'Edge Browser'
  
  return 'Unknown Device'
}

// POST: Track a new visit
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const device = getDeviceName(userAgent)
    const timestamp = new Date().toISOString()
    
    const visitor: Visitor = {
      ip,
      device,
      userAgent,
      timestamp,
    }
    
    visitors.push(visitor)
    visitCount++
    
    return NextResponse.json({ 
      success: true, 
      count: visitCount,
      visitor 
    })
  } catch (error) {
    console.error('Error tracking visitor:', error)
    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    )
  }
}

// GET: Get visit count or all visitors (with secret query param)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    
    // If secret query param is provided, return all visitors
    if (secret === 'true') {
      return NextResponse.json({
        count: visitCount,
        visitors: visitors.reverse(), // Most recent first
      })
    }
    
    // Otherwise, just return the count
    return NextResponse.json({ count: visitCount })
  } catch (error) {
    console.error('Error getting visitors:', error)
    return NextResponse.json(
      { error: 'Failed to get visitors' },
      { status: 500 }
    )
  }
}

