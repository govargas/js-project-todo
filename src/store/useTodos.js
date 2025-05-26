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
          project: 'General',
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

      addTodo: (text, dueDate = null, tags = [], project = 'General') =>
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

      changeProject: (id, project) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, project } : t
          ),
        })),

      // New action for drag-and-drop reordering within a project
      reorderInGroup: (project, fromIndex, toIndex) =>
        set((state) => {
          const groupTasks = state.todos.filter((t) => t.project === project)
          if (fromIndex === toIndex) return { todos: state.todos }

          const newGroup = Array.from(groupTasks)
          const [moved] = newGroup.splice(fromIndex, 1)
          newGroup.splice(toIndex, 0, moved)

          const firstIndex = state.todos.findIndex((t) => t.project === project)
          const newTodos = Array.from(state.todos)
          newTodos.splice(firstIndex, groupTasks.length, ...newGroup)

          return { todos: newTodos }
        }),
    }),
    {
      name: 'todos-storage',
      getStorage: () => localStorage,
    }
  )
)