import React from 'react'
import { useTodos } from '../store/useTodos'

export default function TodoList() {
  const todos = useTodos((state) => state.todos)

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center justify-between p-2 border rounded
            ${todo.done ? 'opacity-50 line-through' : ''}`}
        >
          <span>{todo.text}</span>
          <div className="space-x-2">
            <button
              onClick={() => useTodos.getState().toggleTodo(todo.id)}
              className="px-2 py-1 border rounded"
            >
              {todo.done ? 'Undo' : 'Done'}
            </button>
            <button
              onClick={() => useTodos.getState().removeTodo(todo.id)}
              className="px-2 py-1 border rounded text-red-600"
            >
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}