'use client'

import { useState } from 'react'

export interface PinContent {
  title: string
  title_40_preview: string
  description: string
  description_100_preview: string
  hashtags: {
    broad: string[]
    niche: string[]
    product: string[]
    geo: string[]
  }
  ai_geo_queries: string[]
  strategy: {
    board_name: string
    best_post_time: string
    amazon_category: string
    commission_rate: string
    why_it_wins: string
  }
}

interface PinResultProps {
  content: PinContent
}

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all flex-shrink-0 ${
        copied
          ? 'bg-green-100 text-green-700 border border-green-200'
          : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-pink-50 hover:text-pink-700 hover:border-pink-200'
      }`}
    >
      {copied ? '✓ Copied!' : `📋 ${label}`}
    </button>
  )
}

export default function PinResult({ content }: PinResultProps) {
  // Compute previews client-side as fallback if API didn't return them
  const title40 = content.title_40_preview || content.title.slice(0, 40)
  const desc100 = content.description_100_preview || content.description.slice(0, 100)

  const allHashtags = [
    ...content.hashtags.broad,
    ...content.hashtags.niche,
    ...content.hashtags.product,
    ...content.hashtags.geo,
  ].join(' ')

  return (
    <div className="space-y-4">
      {/* Pin Title */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 flex-wrap">
            📌 Pin Title
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-normal ${
                content.title.length <= 100
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {content.title.length} / 100 chars
            </span>
          </h3>
          <CopyButton text={content.title} label="Copy Title" />
        </div>
        <p className="text-gray-900 font-semibold text-base leading-relaxed">
          {content.title}
        </p>
        <div className="mt-3 p-3 rounded-lg border bg-pink-50 border-pink-100">
          <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#e11d74' }}>
            First 40 chars — exact keyword placement:
          </p>
          <p className="text-sm font-mono text-pink-800">"{title40}"</p>
        </div>
      </div>

      {/* Pin Description */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 flex-wrap">
            📝 Pin Description
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-normal ${
                content.description.length <= 500
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {content.description.length} / 500 chars
            </span>
          </h3>
          <CopyButton text={content.description} label="Copy Description" />
        </div>
        <p className="text-gray-700 leading-relaxed text-sm">{content.description}</p>
        <div className="mt-3 p-3 rounded-lg border bg-blue-50 border-blue-100">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
            First 100 chars — AI search hook:
          </p>
          <p className="text-sm text-blue-800 italic">"{desc100}…"</p>
        </div>
      </div>

      {/* Hashtags */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">🏷️ Hashtag Strategy</h3>
          <CopyButton text={allHashtags} label="Copy All" />
        </div>
        <div className="space-y-3">
          {(
            [
              {
                key: 'broad' as const,
                label: 'Broad Tags',
                sub: '5 tags · High reach',
                wrap: 'bg-purple-50 border-purple-100',
                chip: 'bg-purple-100 text-purple-700',
              },
              {
                key: 'niche' as const,
                label: 'Niche Tags',
                sub: '10 tags · Algorithm match',
                wrap: 'bg-violet-50 border-violet-100',
                chip: 'bg-violet-100 text-violet-700',
              },
              {
                key: 'product' as const,
                label: 'Product Tags',
                sub: '5 tags · Purchase intent',
                wrap: 'bg-indigo-50 border-indigo-100',
                chip: 'bg-indigo-100 text-indigo-700',
              },
              {
                key: 'geo' as const,
                label: 'Geo Tags',
                sub: '5 tags · Local + AI search',
                wrap: 'bg-amber-50 border-amber-100',
                chip: 'bg-amber-100 text-amber-700',
              },
            ] as const
          ).map(({ key, label, sub, wrap, chip }) => (
            <div key={key} className={`rounded-lg border p-3 ${wrap}`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-semibold text-gray-800">{label}</span>
                  <span className="text-xs text-gray-500 ml-2">{sub}</span>
                </div>
                <CopyButton text={content.hashtags[key].join(' ')} />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {content.hashtags[key].map((tag, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${chip}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Geo Queries */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
          🤖 AI Geo Queries
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Natural language questions this pin answers — boosts visibility in ChatGPT, Google AI
          Overview, and Perplexity.
        </p>
        <div className="space-y-2">
          {content.ai_geo_queries.map((q, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
            >
              <span
                className="text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-white"
                style={{ backgroundColor: '#e11d74' }}
              >
                {i + 1}
              </span>
              <p className="text-sm text-gray-700 flex-1 leading-snug">{q}</p>
              <CopyButton text={q} />
            </div>
          ))}
        </div>
      </div>

      {/* Strategy Panel */}
      <div
        className="rounded-xl p-5 text-white"
        style={{ background: 'linear-gradient(135deg, #e11d74 0%, #be185d 100%)' }}
      >
        <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
          ⚡ Pin Strategy
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-pink-200 mb-1">
              Board Name
            </p>
            <p className="text-sm font-medium text-white">{content.strategy.board_name}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-pink-200 mb-1">
              Best Post Time
            </p>
            <p className="text-sm font-medium text-white">{content.strategy.best_post_time}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-pink-200 mb-1">
              Amazon Category
            </p>
            <p className="text-sm font-medium text-white">{content.strategy.amazon_category}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-pink-200 mb-1">
              Commission Rate
            </p>
            <p className="text-xl font-bold text-white">{content.strategy.commission_rate}</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-pink-200 mb-1">
            Why This Wins
          </p>
          <p className="text-sm text-pink-100 leading-relaxed">{content.strategy.why_it_wins}</p>
        </div>
      </div>
    </div>
  )
}
