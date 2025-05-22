import React, { useState } from 'react'
import { useTodos } from '../store/useTodos'

export default function TodoForm() {
  const [text, setText] = useState('')
  const addTodo = useTodos((s) => s.addTodo)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    addTodo(trimmed)
    setText('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-6"
      aria-label="Add new task"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs doing?"
        className="flex-1 p-2 border border-bauhaus rounded focus:outline-none focus:ring-accent-blue"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="px-4 py-2 bg-accent-blue text-white rounded disabled:opacity-50"
      >
        Add
      </button>
    </form>
  )
}