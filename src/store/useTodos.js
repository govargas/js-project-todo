import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTodos = create(
  persist(
    (set) => ({
      todos: [
        {
          id: '1',
          text: 'Learn Zustand',
          done: false,
          createdAt: new Date(),
          dueDate: null,
        },
        {
          id: '2',
          text: 'Build a todo app',
          done: false,
          createdAt: new Date(),
          dueDate: null,
        },
      ],

      addTodo: (text, dueDate) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now().toString(),
              text,
              done: false,
              createdAt: new Date(),
              dueDate: dueDate ? new Date(dueDate) : null,
            },
          ],
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          ),
        })),

      completeAll: () =>
        set((state) => ({
          todos: state.todos.map((t) => ({ ...t, done: true })),
        })),
    }),
    {
      name: 'todos-storage',
      getStorage: () => localStorage,
    }
  )
)