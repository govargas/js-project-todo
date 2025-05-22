import React from 'react'
import { useTodos } from '../store/useTodos'

export default function TodoList() {
  const todos      = useTodos((s) => s.todos)
  const toggleTodo = useTodos((s) => s.toggleTodo)
  const removeTodo = useTodos((s) => s.removeTodo)

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center justify-between p-3 border border-bauhaus rounded ${
            todo.done ? 'opacity-50 line-through text-completed' : ''
          }`}
        >
          <span>{todo.text}</span>
          <div className="space-x-2">
            <button
              onClick={() => toggleTodo(todo.id)}
              className="px-3 py-1 border border-accent-blue text-accent-blue rounded"
            >
              {todo.done ? 'Undo' : 'Done'}
            </button>
            <button
              onClick={() => removeTodo(todo.id)}
              className="px-3 py-1 border border-accent-red text-accent-red rounded text-red-600"
            >
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}