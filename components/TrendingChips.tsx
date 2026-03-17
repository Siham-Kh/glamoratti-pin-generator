'use client'

export interface Trend {
  id: string
  label: string
  emoji: string
}

interface TrendingChipsProps {
  trends: Trend[]
  selectedId: string | null
  onSelect: (trend: Trend) => void
}

export default function TrendingChips({ trends, selectedId, onSelect }: TrendingChipsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {trends.map((trend) => (
        <button
          key={trend.id}
          onClick={() => onSelect(trend)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border-2 font-medium text-sm transition-all duration-150 ${
            selectedId === trend.id
              ? 'bg-brand-600 border-brand-600 text-white shadow-md scale-105'
              : 'bg-white border-gray-200 text-gray-700 hover:border-brand-300 hover:text-brand-600 hover:shadow-sm'
          }`}
          style={
            selectedId === trend.id
              ? { backgroundColor: '#e11d74', borderColor: '#e11d74' }
              : {}
          }
        >
          <span className="text-lg leading-none">{trend.emoji}</span>
          <span>{trend.label}</span>
          {selectedId === trend.id && (
            <span className="ml-1 text-xs bg-white/20 rounded-full px-1.5 py-0.5">✓</span>
          )}
        </button>
      ))}
    </div>
  )
}
