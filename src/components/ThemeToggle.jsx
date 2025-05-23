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
      {theme === 'light' ? (
        <img src="/moon.svg" alt="Switch to dark theme" className="w-6 h-6" />
      ) : (
        <img src="/sun.svg" alt="Switch to light theme" className="w-6 h-6 filter invert" />
      )}
    </button>
  )
}