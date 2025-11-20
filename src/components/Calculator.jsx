import React, { useState } from 'react'
import Display from './Display'
import Keyboard from './Keyboard'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')
  const [acc, setAcc] = useState(null) // number | null
  const [op, setOp] = useState(null) // '+', '-', '*', '/' | null
  const [overwrite, setOverwrite] = useState(true)
  const [error, setError] = useState(false)

  const resetAll = () => {
    setDisplay('0')
    setExpression('')
    setAcc(null)
    setOp(null)
    setOverwrite(true)
    setError(false)
  }

  const inputDigit = (d) => {
    if (error) return
    if (overwrite) {
      setDisplay(d === '0' ? '0' : d)
      setOverwrite(false)
    } else {
      setDisplay((prev) => (prev === '0' ? d : (prev + d).slice(0, 16)))
    }
  }

  const inputDot = () => {
    if (error) return
    if (overwrite) {
      setDisplay('0.')
      setOverwrite(false)
      return
    }
    setDisplay((prev) => (prev.includes('.') ? prev : prev + '.'))
  }

  const applyOp = (operator) => {
    if (error) return
    const current = Number(display)

    if (acc === null) {
      setAcc(current)
      setExpression(`${formatNumber(current)} ${symbol(operator)}`)
    } else if (!overwrite) {
      const result = calc(acc, current, op)
      if (!isFinite(result)) {
        setDisplay('Error')
        setError(true)
        return
      }
      setAcc(result)
      setDisplay(formatNumber(result))
      setExpression(`${formatNumber(result)} ${symbol(operator)}`)
    } else {
      // user changed operator before typing next number
      setExpression((prev) => prev.replace(/.$/, symbol(operator)))
    }

    setOp(operator)
    setOverwrite(true)
  }

  const equals = () => {
    if (error) return
    if (op === null || acc === null) return
    const current = Number(display)
    const result = calc(acc, current, op)
    if (!isFinite(result)) {
      setDisplay('Error')
      setError(true)
      return
    }
    setDisplay(formatNumber(result))
    setExpression('')
    setAcc(null)
    setOp(null)
    setOverwrite(true)
  }

  const negate = () => {
    if (error) return
    if (display === '0') return
    setDisplay((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev))
  }

  const percent = () => {
    if (error) return
    const current = Number(display)
    if (acc !== null && op) {
      const v = (acc * current) / 100
      setDisplay(formatNumber(v))
      setOverwrite(true)
    } else {
      const v = current / 100
      setDisplay(formatNumber(v))
      setOverwrite(true)
    }
  }

  const onKey = (k) => {
    switch (k) {
      case 'AC':
        resetAll()
        break
      case 'NEG':
        negate()
        break
      case '%':
        percent()
        break
      case '.':
        inputDot()
        break
      case '+':
      case '-':
      case '*':
      case '/':
        applyOp(k)
        break
      case '=':
        equals()
        break
      default:
        // digits
        if (/^\d$/.test(k)) inputDigit(k)
    }
  }

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto bg-slate-800/60 backdrop-blur border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl">
      <div className="mb-4 sm:mb-6">
        <Display expression={expression} value={display} />
      </div>
      <Keyboard onKey={onKey} />
      <div className="mt-4 text-center text-xs text-slate-400 select-none">
        Basic calculator • + − × ÷ % ±
      </div>
      {!error ? null : (
        <div className="mt-2 text-center text-red-400 text-sm">Division by zero is not allowed. Press AC to reset.</div>
      )}
    </div>
  )
}

function calc(a, b, operator) {
  switch (operator) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '*':
      return a * b
    case '/':
      return b === 0 ? Infinity : a / b
    default:
      return b
  }
}

function symbol(op) {
  return op === '+' ? '+' : op === '-' ? '−' : op === '*' ? '×' : '÷'
}

function formatNumber(n) {
  if (typeof n === 'string') return n
  const str = String(n)
  if (!isFinite(n)) return 'Error'
  // Limit digits, avoid long floats
  const rounded = Math.round(n * 1e12) / 1e12
  return ('' + rounded)
}
