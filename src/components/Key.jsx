import React from 'react'

export default function Key({ label, type = 'digit', span = 1, onClick }) {
  const base = 'flex items-center justify-center select-none rounded-xl font-medium transition active:scale-95 shadow-sm';

  const styles = {
    digit: 'bg-slate-800 text-white hover:bg-slate-700',
    op: 'bg-blue-600 text-white hover:bg-blue-500',
    action: 'bg-slate-700 text-blue-100 hover:bg-slate-600',
    equals: 'bg-emerald-600 text-white hover:bg-emerald-500',
  }

  const colSpan = span === 2 ? 'col-span-2' : span === 3 ? 'col-span-3' : ''

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles[type]} ${colSpan} h-14 sm:h-16 text-lg`}
      aria-label={label}
    >
      {label}
    </button>
  )
}
