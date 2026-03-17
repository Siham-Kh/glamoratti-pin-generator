import { NextRequest, NextResponse } from 'next/server'
import { callWithWebSearch, extractJSON } from '@/lib/openai'

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const { board, geo, season, priceRange, keyword } = await request.json()

    if (!board || !geo || !season || !priceRange || !keyword) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const keyword40 = keyword.slice(0, 40)

    const systemPrompt = `You are an elite Pinterest copywriter, SEO strategist, and Amazon affiliate marketing expert.
You create pin content that ranks on Pinterest, gets clicks, and converts to Amazon sales.
You also optimize content for AI-powered search (ChatGPT, Google AI Overview, Perplexity).
Always respond with valid JSON only — no preamble, no explanation, no markdown outside the JSON.`

    const prompt = `Create fully optimized Pinterest pin content for this Amazon affiliate campaign.

Campaign Details:
- Winning Keyword: "${keyword}"
- Board/Niche: ${board}
- Target Market: ${geo}
- Season/Timing: ${season}
- Price Range: ${priceRange}

Research the following using web search:
1. Top-performing Amazon products for "${keyword}" right now
2. Current Pinterest best practices for ${board} niche
3. What questions people ask AI assistants (ChatGPT, Google) about this product in ${geo}
4. Amazon commission rates for the relevant product category

CRITICAL REQUIREMENTS:
- Pin Title: MUST start with exact text "${keyword40}" (first 40 chars), total max 100 chars
- Description: MUST be exactly 500 chars max. First 100 chars are keyword-rich + geo-relevant. Written to surface in AI search results naturally.
- Broad hashtags: exactly 5 — massive reach (millions of monthly viewers on Pinterest)
- Niche hashtags: exactly 10 — algorithm matching for ${board} niche specifically
- Product hashtags: exactly 5 — purchase intent signals for Amazon affiliate conversion
- Geo hashtags: exactly 5 — include ${geo} variations + AI search optimization
- AI Geo Queries: exactly 5 natural language questions this pin will answer in ChatGPT/Google AI

Return ONLY this JSON object:
{
  "title": "Full pin title starting with exact keyword (max 100 chars)",
  "title_40_preview": "${keyword40}",
  "description": "Full description max 500 chars. First 100 chars keyword-dense. Includes ${geo}. Natural conversational tone. Ends with CTA.",
  "description_100_preview": "First 100 characters of description only",
  "hashtags": {
    "broad": ["#Tag1", "#Tag2", "#Tag3", "#Tag4", "#Tag5"],
    "niche": ["#Tag1", "#Tag2", "#Tag3", "#Tag4", "#Tag5", "#Tag6", "#Tag7", "#Tag8", "#Tag9", "#Tag10"],
    "product": ["#Tag1", "#Tag2", "#Tag3", "#Tag4", "#Tag5"],
    "geo": ["#Tag1", "#Tag2", "#Tag3", "#Tag4", "#Tag5"]
  },
  "ai_geo_queries": [
    "What is the best [product type] in ${geo} for ${season}?",
    "Where to buy affordable [product] in ${geo}?",
    "How to find [product] under budget in ${geo}?",
    "Which [product] is trending in ${geo} right now?",
    "Best [product] for [specific use case] in ${geo}?"
  ],
  "strategy": {
    "board_name": "Suggested Pinterest board name (catchy, keyword-rich)",
    "best_post_time": "Best day + time to post for maximum reach (e.g., Saturday 8 PM ET)",
    "amazon_category": "Exact Amazon affiliate program category name",
    "commission_rate": "X.XX%",
    "why_it_wins": "2-3 sentences: why this specific keyword + geo + season combo will outperform competitors"
  }
}

Fill in all template placeholders with real, specific content based on your research. Do not leave placeholder text.`

    const text = await callWithWebSearch(prompt, systemPrompt, 4096)
    const data = extractJSON(text)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Generate pin API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate pin content. Please try again.' },
      { status: 500 }
    )
  }
}
