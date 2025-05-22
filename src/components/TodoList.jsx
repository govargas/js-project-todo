// src/components/TodoList.jsx
import React from 'react'
import { useTodos } from '../store/useTodos'

export default function TodoList() {
  const todos      = useTodos((s) => s.todos)
  const toggleTodo = useTodos((s) => s.toggleTodo)
  const removeTodo = useTodos((s) => s.removeTodo)

  return (
    <ul className="space-y-2 sm:space-y-3">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`
            flex flex-col sm:flex-row sm:items-center justify-between
            p-2 sm:p-3 md:p-4 /* responsive padding */
            border border-bauhaus rounded
            transition-shadow hover:shadow-md
            ${todo.done ? 'opacity-50 line-through text-completed' : ''}
          `}
        >
          <span>{todo.text}</span>
          <div className="mt-2 sm:mt-0 space-x-2">
            <button
              onClick={() => toggleTodo(todo.id)}
              className="px-3 py-1 border border-accent-blue text-accent-blue rounded"
            >
              {todo.done ? 'Undo' : 'Done'}
            </button>
            <button
              onClick={() => removeTodo(todo.id)}
              className="px-3 py-1 border border-accent-red text-accent-red rounded"
            >
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}