import React, { useState } from 'react'
import { useTodos } from '../store/useTodos'

export default function TodoForm() {
  const [text, setText] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [tags, setTags] = useState('')       // ← new state for comma-separated tags
  const addTodo = useTodos((s) => s.addTodo)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return

    // Build an array of non-empty, trimmed tags
    const tagsArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t !== '')

    addTodo(trimmed, dueDate, tagsArray)

    // Reset form fields
    setText('')
    setDueDate('')
    setTags('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-2 mb-6"
      aria-label="Add new task"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs doing?"
        className="flex-1 p-2 border border-bauhaus rounded focus:outline-none focus:ring-accent-blue"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-2 border border-bauhaus rounded focus:outline-none focus:ring-accent-blue"
        aria-label="Optional due date"
      />

      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags, comma-separated"
        className="p-2 border border-bauhaus rounded focus:outline-none focus:ring-accent-blue"
        aria-label="Optional tags"
      />

      <button
        type="submit"
        disabled={!text.trim()}
        className="
          px-4 py-2 bg-accent-blue text-white font-semibold rounded
          focus:outline-none focus:ring-2 focus:ring-accent-blue/50
          hover:text-white focus:text-white
          disabled:!bg-bauhaus-muted disabled:!text-muted disabled:cursor-not-allowed
        "
      >
        Add
      </button>
    </form>
  )
}