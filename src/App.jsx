// src/App.jsx
import React from 'react'
import { useTodos } from './store/useTodos'
import Header from './components/Header'
import ThemeToggle from './components/ThemeToggle'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import EmptyState from './components/EmptyState'
import Footer from './components/Footer'

export default function App() {
  const todos = useTodos((s) => s.todos)

  return (
    <div className="min-h-screen bg-bauhaus-light text-bauhaus font-neue-kabel">
      <Header />
      <main className="
        p-4             /* mobile */
        sm:p-6          /* tablet */
        md:p-8          /* small desktop */
        lg:p-12         /* large desktop */
        max-w-full      /* mobile: full width */
        sm:max-w-md     /* tablet: ~ 28rem */
        md:max-w-xl     /* desktop: ~ 36rem */
        lg:max-w-2xl    /* large desktop: ~ 42rem */
        mx-auto
        space-y-6">
        <TodoForm />

        {todos.length > 0 ? (
          <TodoList />
        ) : (
          <EmptyState />
        )}
      </main>
      <Footer />
    </div>
  )
}