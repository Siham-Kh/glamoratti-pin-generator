import { NextRequest, NextResponse } from 'next/server'
import { callWithWebSearch, extractJSON } from '@/lib/openai'

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const { board, geo, season, priceRange } = await request.json()

    if (!board || !geo || !season || !priceRange) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const systemPrompt = `You are a Pinterest affiliate marketing expert specializing in Amazon products.
Your job is to identify trending products with high Pinterest potential and strong Amazon affiliate conversion.
Always respond with valid JSON only — no preamble, no explanation, no markdown outside the JSON.`

    const prompt = `Search for and identify the TOP 5 trending ${board} products on Amazon right now that would perform exceptionally well as Pinterest pins.

Target criteria:
- Geography: ${geo}
- Season/Timing: ${season}
- Price range: ${priceRange}

Research what is currently trending on Amazon, TikTok Shop, and Pinterest in this niche. Look for items with:
- Viral potential (visually appealing, shareable)
- Strong Amazon affiliate commissions
- High search demand right now

Return ONLY this JSON object, nothing else:
{
  "trends": [
    { "id": "1", "label": "Specific trending product name (5-8 words max)", "emoji": "🎯" },
    { "id": "2", "label": "Specific trending product name (5-8 words max)", "emoji": "✨" },
    { "id": "3", "label": "Specific trending product name (5-8 words max)", "emoji": "💫" },
    { "id": "4", "label": "Specific trending product name (5-8 words max)", "emoji": "🌟" },
    { "id": "5", "label": "Specific trending product name (5-8 words max)", "emoji": "⭐" }
  ]
}

Use real, specific product names (e.g., "Boho macrame wall hanging", not just "wall art").
Choose relevant emojis for each product category.`

    const text = await callWithWebSearch(prompt, systemPrompt, 1024)
    const data = extractJSON(text) as { trends: Array<{ id: string; label: string; emoji: string }> }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Trending API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trending products. Please try again.' },
      { status: 500 }
    )
  }
}
