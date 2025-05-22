import create from 'zustand'

export const useTodos = create((set) => ({
  todos: [
    { id: '1', text: 'Learn Zustand', done: false, createdAt: new Date() },
    { id: '2', text: 'Build a todo app', done: false, createdAt: new Date() },
  ],

  // Add a new todo
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

  // Remove by id
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  // Toggle the 'done' flag
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      ),
    })),
}))