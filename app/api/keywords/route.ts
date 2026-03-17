import { NextRequest, NextResponse } from 'next/server'
import { callWithWebSearch, extractJSON } from '@/lib/openai'

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const { board, geo, season, priceRange, trendingKeyword } = await request.json()

    if (!board || !geo || !season || !priceRange) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const systemPrompt = `You are a Pinterest SEO and keyword intelligence expert for Amazon affiliate marketing.
You analyze search volumes, Pinterest pin saturation, and competition to find the best keyword opportunities.
Always respond with valid JSON only — no preamble, no explanation, no markdown outside the JSON.`

    const focusClause = trendingKeyword
      ? `Focus on keyword variations related to the trending product: "${trendingKeyword}"`
      : `Find the highest-opportunity keywords for this niche`

    const prompt = `Research Pinterest keyword opportunities for Amazon affiliate marketing.

Settings:
- Board/Niche: ${board}
- Target Market: ${geo}
- Season: ${season}
- Price Range: ${priceRange}
- Focus: ${focusClause}

Search for current Pinterest search data, Google Trends, and competitor pin analysis for this niche.
Generate exactly 5 keyword variants covering these types:

1. BROAD — High-volume, general (1-3 words, e.g., "home decor ideas")
2. LONG-TAIL — Specific, purchase-intent (4-7 words, e.g., "minimalist living room ideas under $50")
3. GEO-MODIFIED — Location-specific including "${geo}" (e.g., "home decor ideas ${geo}")
4. SEASONAL — Time-specific including "${season}" (e.g., "spring 2026 home decor trends")
5. QUESTION — Natural language question starting with What/How/Where/Which/Best

For each keyword estimate:
- monthly_volume: realistic Pinterest monthly search volume (number)
- pin_saturation: estimated new pins per month with that keyword (number)
- competition: "Low" | "Medium" | "High" based on how many top affiliates are targeting it
- opportunity_score: 0-100. Formula: (volume/1000 × 20) + (Low=40, Medium=20, High=0) + (saturation<500=20, 500-2000=10, >2000=0). Cap at 100.

Return ONLY this JSON object:
{
  "keywords": [
    {
      "keyword": "exact keyword phrase",
      "type": "broad",
      "monthly_volume": 45000,
      "pin_saturation": 1200,
      "competition": "Medium",
      "opportunity_score": 65,
      "is_winner": false
    }
  ],
  "verdict": "go",
  "verdict_reason": "One sentence explaining the best opportunity"
}

Rules:
- Exactly ONE keyword must have "is_winner": true (the highest opportunity_score)
- verdict: "go" if best score >= 70, "twist" if 40-69, "avoid" if under 40
- verdict_reason: brief, actionable insight about the top opportunity`

    const text = await callWithWebSearch(prompt, systemPrompt, 2048)
    const data = extractJSON(text)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Keywords API error:', error)
    return NextResponse.json(
      { error: 'Failed to research keywords. Please try again.' },
      { status: 500 }
    )
  }
}
