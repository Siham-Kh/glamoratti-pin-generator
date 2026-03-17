'use client'

export interface KeywordRow {
  keyword: string
  type: string
  monthly_volume: number
  pin_saturation: number
  competition: 'Low' | 'Medium' | 'High'
  opportunity_score: number
  is_winner: boolean
}

interface KeywordTableProps {
  keywords: KeywordRow[]
  verdict: 'go' | 'twist' | 'avoid'
  verdict_reason: string
  selectedKeyword: string | null
  onSelect: (keyword: string) => void
}

const TYPE_STYLES: Record<string, string> = {
  broad: 'bg-blue-100 text-blue-700',
  'long-tail': 'bg-purple-100 text-purple-700',
  'geo-modified': 'bg-pink-100 text-pink-700',
  seasonal: 'bg-orange-100 text-orange-700',
  'question-based': 'bg-teal-100 text-teal-700',
}

const TYPE_LABELS: Record<string, string> = {
  broad: 'Broad',
  'long-tail': 'Long-tail',
  'geo-modified': 'Geo',
  seasonal: 'Seasonal',
  'question-based': 'Question',
}

const COMPETITION_STYLES = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High: 'bg-red-100 text-red-700',
}

const VERDICT_CONFIG = {
  go: {
    bg: 'bg-green-50',
    border: 'border-green-300',
    text: 'text-green-800',
    badge: 'bg-green-500 text-white',
    icon: '✅',
    label: 'GO FOR IT',
  },
  twist: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    text: 'text-yellow-800',
    badge: 'bg-yellow-500 text-white',
    icon: '🔄',
    label: 'USE GEO TWIST',
  },
  avoid: {
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-800',
    badge: 'bg-red-500 text-white',
    icon: '❌',
    label: 'AVOID',
  },
}

export default function KeywordTable({
  keywords,
  verdict,
  verdict_reason,
  selectedKeyword,
  onSelect,
}: KeywordTableProps) {
  const vc = VERDICT_CONFIG[verdict] || VERDICT_CONFIG.twist

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-600 whitespace-nowrap">
                Keyword
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Type</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-600 whitespace-nowrap">
                Volume/mo
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-600 whitespace-nowrap">
                Saturation
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-600">Competition</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-600 whitespace-nowrap">
                Score
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-600">Select</th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((kw, i) => {
              const isSelected = selectedKeyword === kw.keyword
              const rowBg = kw.is_winner
                ? 'bg-green-50 hover:bg-green-100'
                : isSelected
                ? 'bg-pink-50 hover:bg-pink-100'
                : 'bg-white hover:bg-gray-50'

              return (
                <tr
                  key={i}
                  onClick={() => onSelect(kw.keyword)}
                  className={`border-b border-gray-100 cursor-pointer transition-colors ${rowBg}`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      {kw.is_winner && (
                        <span className="text-amber-500 text-base" title="Winner">
                          🏆
                        </span>
                      )}
                      <span
                        className={`font-medium ${
                          kw.is_winner ? 'text-green-800' : 'text-gray-800'
                        }`}
                      >
                        {kw.keyword}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        TYPE_STYLES[kw.type] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {TYPE_LABELS[kw.type] || kw.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700 font-medium">
                    {kw.monthly_volume.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-500">
                    {kw.pin_saturation.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        COMPETITION_STYLES[kw.competition] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {kw.competition}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-14 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full transition-all ${
                            kw.opportunity_score >= 70
                              ? 'bg-green-500'
                              : kw.opportunity_score >= 40
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${kw.opportunity_score}%` }}
                        />
                      </div>
                      <span
                        className={`font-bold text-sm tabular-nums ${
                          kw.opportunity_score >= 70
                            ? 'text-green-700'
                            : kw.opportunity_score >= 40
                            ? 'text-yellow-700'
                            : 'text-red-700'
                        }`}
                      >
                        {kw.opportunity_score}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelect(kw.keyword)
                      }}
                      className={`w-5 h-5 rounded-full border-2 transition-all inline-flex items-center justify-center ${
                        isSelected
                          ? 'border-brand-600 bg-brand-600'
                          : 'border-gray-300 hover:border-pink-400'
                      }`}
                      style={
                        isSelected
                          ? { borderColor: '#e11d74', backgroundColor: '#e11d74' }
                          : {}
                      }
                    >
                      {isSelected && (
                        <span className="text-white text-xs font-bold leading-none">✓</span>
                      )}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Verdict Banner */}
      <div className={`flex items-start gap-3 p-4 rounded-xl border ${vc.bg} ${vc.border}`}>
        <span className="text-xl flex-shrink-0 mt-0.5">{vc.icon}</span>
        <div className="flex-1 min-w-0">
          <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mr-2 ${vc.badge}`}>
            {vc.label}
          </span>
          <span className={`text-sm ${vc.text}`}>{verdict_reason}</span>
        </div>
      </div>
    </div>
  )
}
