import React from 'react'

export default function Display({ expression, value }) {
  return (
    <div className="w-full bg-slate-900/60 border border-slate-700 rounded-xl p-4 text-right shadow-inner">
      <div className="text-slate-400 text-xs tracking-wider h-5 overflow-hidden select-none">
        {expression || '\u00A0'}
      </div>
      <div className="text-white text-4xl sm:text-5xl font-semibold tabular-nums leading-tight break-all">
        {value}
      </div>
    </div>
  )
}
