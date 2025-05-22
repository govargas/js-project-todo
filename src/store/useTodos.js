import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTodos = create(
  persist(
    (set) => ({
      todos: [
        { id: '1', text: 'Learn Zustand', done: false, createdAt: new Date() },
        { id: '2', text: 'Build a todo app', done: false, createdAt: new Date() },
      ],

      addTodo: (text) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now().toString(),
              text,
              done: false,
              createdAt: new Date(),
            },
          ],
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
          ),
        })),

      completeAll: () =>
        set((state) => ({
          todos: state.todos.map((todo) => ({ ...todo, done: true })),
        })),
    }),
    {
      name: 'todos-storage',       // key in localStorage
      getStorage: () => localStorage // (default)
    }
  )
)