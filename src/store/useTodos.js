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
          project: 'General',    // ← new project field
        },
        {
          id: '2',
          text: 'Build a todo app',
          done: false,
          createdAt: new Date(),
          dueDate: null,
          tags: [],
          project: 'General',
        },
      ],

      addTodo: (
        text,
        dueDate = null,
        tags = [],
        project = 'General'    // ← accept an optional project
      ) =>
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
              project,
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

      addTag: (id, tag) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id
              ? { ...t, tags: t.tags.includes(tag) ? t.tags : [...t.tags, tag] }
              : t
          ),
        })),

      removeTag: (id, tag) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id
              ? { ...t, tags: t.tags.filter((existing) => existing !== tag) }
              : t
          ),
        })),

      // ← new action to change a task’s project
      changeProject: (id, project) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, project } : t
          ),
        })),
    }),
    {
      name: 'todos-storage',
      getStorage: () => localStorage,
    }
  )
)