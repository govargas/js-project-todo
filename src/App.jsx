// src/App.jsx
import React, { useEffect, useState } from 'react'
import { useTodos } from './store/useTodos'
import { useTheme } from './store/useTheme'
import Header from './components/Header'
import TodoForm from './components/TodoForm'
import FilterBar from './components/FilterBar'
import TodoList from './components/TodoList'
import EmptyState from './components/EmptyState'
import Footer from './components/Footer'

export default function App() {
  const todos = useTodos((s) => s.todos)
  const theme = useTheme((s) => s.theme)

  // filter state
  const [filters, setFilters] = useState({
    status: 'all',
    createdAfter: '',
  })

  // compute visible tasks
  const visibleTodos = todos.filter((todo) => {
    // status filter
    if (filters.status === 'active' && todo.done) return false
    if (filters.status === 'completed' && !todo.done) return false

    // created-after filter
    if (filters.createdAfter) {
      const created = new Date(todo.createdAt)
      const after   = new Date(filters.createdAfter)
      if (created < after) return false
    }

    return true
  })

  // apply theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-bauhaus text-bauhaus-text font-neue-kabel">
      <Header />
      <main
        className="
          p-4        sm:p-6 
          md:p-8     lg:p-12 
          max-w-full sm:max-w-md 
          md:max-w-xl lg:max-w-2xl 
          mx-auto space-y-6
        "
      >
        <TodoForm />

        <FilterBar onFilterChange={setFilters} />

        {visibleTodos.length > 0 ? (
          <TodoList todos={visibleTodos} />
        ) : (
          <EmptyState />
        )}
      </main>
      <Footer />
    </div>
  )
}