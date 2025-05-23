import React from 'react'
import { useTodos } from '../store/useTodos'

export default function Stats() { // Stats component
  // Zustand store for todos
  const todos        = useTodos((s) => s.todos) // Get todos from Zustand store
  const completeAll  = useTodos((s) => s.completeAll) // Get completeAll function from Zustand store
  const totalCount   = todos.length // Total number of todos
  const remainingCount = todos.filter((t) => !t.done).length // Number of remaining todos

  // If no tasks, render nothing
  if (totalCount === 0) return null

  return (
    <div
      className="
        flex flex-col sm:flex-row
        items-start sm:items-center
        justify-between
        p-3 sm:p-4 md:p-5
        border-t border-bauhaus
        space-y-2 sm:space-y-0
      ">
      <span className="text-muted">
        {totalCount} task{totalCount !== 1 ? 's' : ''}, {remainingCount} remaining
      </span>
      {remainingCount > 0 && (
        <button
          onClick={completeAll}
          className="px-3 py-1 text-sm font-medium rounded bg-accent-blue text-white hover:bg-accent-blue/90 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
        >
          Complete All
        </button>
      )}
    </div>
  )
}