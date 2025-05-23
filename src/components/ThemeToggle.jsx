import React from 'react'
import { useTheme } from '../store/useTheme'

export default function ThemeToggle() {
  const theme = useTheme((s) => s.theme)
  const toggle = useTheme((s) => s.toggleTheme)

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark/light theme"
      className="
        p-2 rounded 
        text-bauhaus-text 
        focus:outline-none
      "
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}