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
    <div className="min-h-screen bg-bauhaus-light text-primary-light">
      <Header />
      <ThemeToggle />
      <main className="p-4 max-w-xl mx-auto">
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