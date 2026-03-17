'use client'

import { useState } from 'react'
import TrendingChips, { type Trend } from './TrendingChips'
import KeywordTable, { type KeywordRow } from './KeywordTable'
import PinResult, { type PinContent } from './PinResult'

// ─── Constants ───────────────────────────────────────────────────────────────

const BOARDS = [
  'Home Decor',
  'Skincare & Beauty',
  'Outfits & Fashion',
  'Accessories & Jewelry',
  'Wellness',
  'Hair Care',
  'Kitchen Finds',
  'Gift Ideas',
]

const GEO_TARGETS = [
  'USA National',
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA',
  'United Kingdom',
  'Canada',
  'Australia',
]

const SEASONS = [
  'Spring 2026',
  'Summer 2026',
  'Fall 2026',
  'Winter 2026',
  "Valentine's Day 2026",
  "Mother's Day 2026",
  'Holiday Season 2026',
  'Back to School 2026',
  'Black Friday / Cyber Monday 2026',
]

const PRICE_RANGES = [
  'Under $25',
  'Under $50',
  'Under $100',
  'Luxury Look for Less ($25–$75)',
  'Splurge-Worthy ($100+)',
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

function SectionCard({
  step,
  title,
  subtitle,
  action,
  loading,
  loadingText,
  disabled,
  actionLabel,
  children,
  emptyText,
}: {
  step: number
  title: string
  subtitle: string
  action: () => void
  loading: boolean
  loadingText: string
  disabled?: boolean
  actionLabel: string
  children?: React.ReactNode
  emptyText: string
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-start sm:items-center justify-between gap-4 mb-5 flex-wrap">
        <div>
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <span
              className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#e11d74' }}
            >
              {step}
            </span>
            {title}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5 ml-8">{subtitle}</p>
        </div>
        <button
          onClick={action}
          disabled={disabled || loading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed text-white"
          style={
            disabled || loading
              ? { backgroundColor: '#d1d5db' }
              : { backgroundColor: '#e11d74' }
          }
        >
          {loading ? (
            <>
              <Spinner />
              {loadingText}
            </>
          ) : (
            actionLabel
          )}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10 gap-3" style={{ color: '#e11d74' }}>
          <Spinner />
          <span className="text-sm">{loadingText}</span>
        </div>
      ) : children ? (
        children
      ) : (
        <div className="text-center py-10 text-gray-400">
          <p className="text-sm">{emptyText}</p>
        </div>
      )}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface KeywordsAPIResponse {
  keywords: KeywordRow[]
  verdict: 'go' | 'twist' | 'avoid'
  verdict_reason: string
}

export default function PinGenerator() {
  // ── Settings
  const [board, setBoard] = useState(BOARDS[0])
  const [geo, setGeo] = useState(GEO_TARGETS[0])
  const [season, setSeason] = useState(SEASONS[0])
  const [priceRange, setPriceRange] = useState(PRICE_RANGES[1])

  // ── Trending
  const [trends, setTrends] = useState<Trend[]>([])
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null)
  const [loadingTrends, setLoadingTrends] = useState(false)
  const [errorTrends, setErrorTrends] = useState<string | null>(null)

  // ── Keywords
  const [keywordData, setKeywordData] = useState<KeywordsAPIResponse | null>(null)
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null)
  const [loadingKeywords, setLoadingKeywords] = useState(false)
  const [errorKeywords, setErrorKeywords] = useState<string | null>(null)

  // ── Pin
  const [pinContent, setPinContent] = useState<PinContent | null>(null)
  const [loadingPin, setLoadingPin] = useState(false)
  const [errorPin, setErrorPin] = useState<string | null>(null)

  // ── Handlers

  const fetchTrends = async () => {
    setLoadingTrends(true)
    setErrorTrends(null)
    setTrends([])
    setSelectedTrend(null)
    try {
      const res = await fetch('/api/trending', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ board, geo, season, priceRange }),
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setTrends(data.trends || [])
    } catch (e) {
      setErrorTrends('Failed to fetch trends. Check your API key and try again.')
      console.error(e)
    } finally {
      setLoadingTrends(false)
    }
  }

  const fetchKeywords = async () => {
    setLoadingKeywords(true)
    setErrorKeywords(null)
    setKeywordData(null)
    setSelectedKeyword(null)
    try {
      const res = await fetch('/api/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          board,
          geo,
          season,
          priceRange,
          trendingKeyword: selectedTrend?.label ?? null,
        }),
      })
      if (!res.ok) throw new Error(await res.text())
      const data: KeywordsAPIResponse = await res.json()
      setKeywordData(data)
      // Auto-select the winner
      const winner = data.keywords?.find((k) => k.is_winner)
      if (winner) setSelectedKeyword(winner.keyword)
    } catch (e) {
      setErrorKeywords('Failed to research keywords. Check your API key and try again.')
      console.error(e)
    } finally {
      setLoadingKeywords(false)
    }
  }

  const generatePin = async () => {
    if (!selectedKeyword) return
    setLoadingPin(true)
    setErrorPin(null)
    setPinContent(null)
    try {
      const res = await fetch('/api/generate-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ board, geo, season, priceRange, keyword: selectedKeyword }),
      })
      if (!res.ok) throw new Error(await res.text())
      const data: PinContent = await res.json()
      setPinContent(data)
    } catch (e) {
      setErrorPin('Failed to generate pin content. Check your API key and try again.')
      console.error(e)
    } finally {
      setLoadingPin(false)
    }
  }

  // ── Render

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <header className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-4xl">📌</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Glamoratti{' '}
            <span style={{ color: '#e11d74' }}>Pin Generator</span>
          </h1>
        </div>
        <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
          Pinterest keyword intelligence &amp; AI-powered pin content for Amazon affiliate marketing
        </p>
      </header>

      {/* Settings Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        {/* Board Selector */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2.5">
            Pinterest Board
          </label>
          <div className="flex flex-wrap gap-2">
            {BOARDS.map((b) => (
              <button
                key={b}
                onClick={() => setBoard(b)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all border"
                style={
                  board === b
                    ? {
                        backgroundColor: '#e11d74',
                        borderColor: '#e11d74',
                        color: 'white',
                      }
                    : {
                        backgroundColor: 'white',
                        borderColor: '#e5e7eb',
                        color: '#374151',
                      }
                }
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              🌍 Geo Target
            </label>
            <select
              value={geo}
              onChange={(e) => setGeo(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-shadow"
              style={{ '--tw-ring-color': '#e11d74' } as React.CSSProperties}
            >
              {GEO_TARGETS.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              📅 Season
            </label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:border-transparent"
            >
              {SEASONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              💰 Price Range
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:border-transparent"
            >
              {PRICE_RANGES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Step 1: Trending Finder */}
      <SectionCard
        step={1}
        title="Trending Finder"
        subtitle={`Find top 5 trending Amazon ${board} products for ${geo}`}
        action={fetchTrends}
        loading={loadingTrends}
        loadingText="Searching trends..."
        actionLabel="🔍 Find Trends"
        emptyText={`Click "Find Trends" to discover what's hot in ${board}`}
      >
        {errorTrends && (
          <p className="text-red-500 text-sm mb-3 p-3 bg-red-50 rounded-lg border border-red-100">
            ⚠️ {errorTrends}
          </p>
        )}
        {trends.length > 0 && (
          <div className="space-y-3">
            {selectedTrend && (
              <p className="text-xs text-gray-500">
                Selected:{' '}
                <strong className="text-gray-800">
                  {selectedTrend.emoji} {selectedTrend.label}
                </strong>{' '}
                · Click another chip to change, or proceed to Research Keywords.
              </p>
            )}
            <TrendingChips
              trends={trends}
              selectedId={selectedTrend?.id ?? null}
              onSelect={setSelectedTrend}
            />
          </div>
        )}
      </SectionCard>

      {/* Step 2: Keyword Intelligence */}
      <SectionCard
        step={2}
        title="Keyword Intelligence"
        subtitle={
          selectedTrend
            ? `Researching keywords for "${selectedTrend.label}"`
            : 'Research keyword opportunities for your niche'
        }
        action={fetchKeywords}
        loading={loadingKeywords}
        loadingText="Researching keywords..."
        actionLabel="🎯 Research Keywords"
        emptyText='Click "Research Keywords" to analyze search opportunities'
      >
        {errorKeywords && (
          <p className="text-red-500 text-sm mb-3 p-3 bg-red-50 rounded-lg border border-red-100">
            ⚠️ {errorKeywords}
          </p>
        )}
        {keywordData && (
          <KeywordTable
            keywords={keywordData.keywords}
            verdict={keywordData.verdict}
            verdict_reason={keywordData.verdict_reason}
            selectedKeyword={selectedKeyword}
            onSelect={setSelectedKeyword}
          />
        )}
      </SectionCard>

      {/* Step 3: Pin Generator */}
      <SectionCard
        step={3}
        title="Pin Content Generator"
        subtitle={
          selectedKeyword
            ? `Generating for: "${selectedKeyword}"`
            : 'Select a keyword in Step 2 first'
        }
        action={generatePin}
        loading={loadingPin}
        loadingText="Crafting your pin..."
        disabled={!selectedKeyword}
        actionLabel="✨ Generate Pin"
        emptyText={
          selectedKeyword
            ? `Ready — click "Generate Pin" to create optimized content for "${selectedKeyword}"`
            : 'Complete Step 2 and select a keyword to continue'
        }
      >
        {errorPin && (
          <p className="text-red-500 text-sm mb-3 p-3 bg-red-50 rounded-lg border border-red-100">
            ⚠️ {errorPin}
          </p>
        )}
        {pinContent && <PinResult content={pinContent} />}
      </SectionCard>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 mt-6 pb-4">
        <p>
          Glamoratti Pin Generator · Powered by{' '}
          <span style={{ color: '#e11d74' }}>Claude AI</span> &amp; Web Intelligence
        </p>
      </footer>
    </div>
  )
}
