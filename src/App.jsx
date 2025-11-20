import React from 'react'
import Calculator from './components/Calculator'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.08),transparent_50%)]" />

      <header className="relative pt-14 sm:pt-20 pb-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Calculator</h1>
        <p className="mt-2 text-blue-200/80">A clean, modern calculator with the essentials</p>
      </header>

      <main className="relative px-4 sm:px-6 pb-14 flex items-start sm:items-center justify-center">
        <Calculator />
      </main>

      <footer className="relative pb-6 text-center text-blue-300/60 text-xs">
        Built with love • Flames Blue
      </footer>
    </div>
  )
}

export default App
