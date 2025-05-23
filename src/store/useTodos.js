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
          tags: [],
        },
        {
          id: '2',
          text: 'Build a todo app',
          done: false,
          createdAt: new Date(),
          dueDate: null,
          tags: [],
        },
      ],

      addTodo: (text, dueDate = null, tags = []) => // Add a new todo
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now().toString(),
              text,
              done: false,
              createdAt: new Date(),
              dueDate: dueDate ? new Date(dueDate) : null,
              tags,
            },
          ],
        })),

      removeTodo: (id) => // Remove a todo by ID
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),

      toggleTodo: (id) => // Toggle the done state of a todo
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          ),
        })),

      completeAll: () => // Mark all todos as done
        set((state) => ({
          todos: state.todos.map((t) => ({ ...t, done: true })),
        })),

      // Add a tag to a todo (avoiding duplicates)
      addTag: (id, tag) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id
              ? { ...t, tags: t.tags.includes(tag) ? t.tags : [...t.tags, tag] } 
              : t
          ),
        })),

      // Remove a tag from a todo
      removeTag: (id, tag) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id
              ? { ...t, tags: t.tags.filter((existing) => existing !== tag) }
              : t
          ),
        })),
    }),
    {
      name: 'todos-storage',
      getStorage: () => localStorage, // Use localStorage as the storage
    }
  )
)