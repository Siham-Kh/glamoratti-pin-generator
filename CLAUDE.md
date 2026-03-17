# Glamoratti Pin Generator

Pinterest keyword intelligence & AI-powered pin content generator for Amazon affiliate marketing.

## Tech Stack
- **Next.js 16** with App Router
- **TypeScript**
- **Tailwind CSS** with custom brand color `#e11d74`
- **OpenAI SDK** (`openai`) — `gpt-4o` with `web_search_preview` built-in tool

## Development

```bash
# Install dependencies
npm install

# Copy env file and add your API key
cp .env.local.example .env.local

# Start dev server on :3000
npm run dev

# Build for production
npm run build

# Lint
npm run lint
```

## Environment

```
OPENAI_API_KEY=your_key_here
```

## Project Structure

```
app/
  page.tsx                  # Root page — renders <PinGenerator />
  layout.tsx                # Root layout with metadata
  globals.css               # Tailwind base + utilities
  api/
    trending/route.ts       # POST /api/trending — finds trending products
    keywords/route.ts       # POST /api/keywords — researches keyword opportunities
    generate-pin/route.ts   # POST /api/generate-pin — generates full pin content

components/
  PinGenerator.tsx          # Main orchestrator: all state + API calls + UI
  TrendingChips.tsx         # Clickable trend chips (Step 1 result)
  KeywordTable.tsx          # Keyword intelligence table with verdict banner (Step 2 result)
  PinResult.tsx             # Full pin content display with copy buttons (Step 3 result)

lib/
  openai.ts                 # OpenAI client, extractJSON helper, callWithWebSearch helper
```

## API Routes

All routes use the `gpt-4o` model via the OpenAI Responses API with the `web_search_preview` server-side tool.
The `maxDuration = 60` export extends Vercel serverless function timeout.

| Route | Input | Output |
|-------|-------|--------|
| `POST /api/trending` | `{ board, geo, season, priceRange }` | `{ trends: [{ id, label, emoji }] }` |
| `POST /api/keywords` | `{ board, geo, season, priceRange, trendingKeyword? }` | `{ keywords: [...], verdict, verdict_reason }` |
| `POST /api/generate-pin` | `{ board, geo, season, priceRange, keyword }` | Full pin object with title, description, hashtags, queries, strategy |

## Key Design Decisions

- **`callWithWebSearch`** in `lib/openai.ts` uses the OpenAI Responses API (`openai.responses.create`) — the `web_search_preview` tool runs server-side with no manual loop needed
- **`extractJSON`** handles model responses that wrap JSON in code blocks or include preamble text
- All client components have `'use client'` — API routes are server-only
- Brand color `#e11d74` is applied inline via `style` props where Tailwind's `brand-600` class isn't available (e.g., dynamic states)
- Keyword winner is auto-selected after fetch; user can override by clicking any row

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in Vercel
3. Add `OPENAI_API_KEY` to Environment Variables
4. Deploy — `maxDuration = 60` handles long AI calls on Pro plan
