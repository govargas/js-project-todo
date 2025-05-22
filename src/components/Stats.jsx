import React from 'react'
import { useTodos } from '../store/useTodos'

export default function Stats() {
  const todos        = useTodos((s) => s.todos)
  const completeAll  = useTodos((s) => s.completeAll)
  const totalCount   = todos.length
  const remainingCount = todos.filter((t) => !t.done).length

  // If no tasks, render nothing
  if (totalCount === 0) return null

  return (
    <div className="flex items-center justify-between p-4 border-t border-bauhaus">
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