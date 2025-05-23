import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useTodos } from './store/useTodos'
import { useTheme } from './store/useTheme'
import Header from './components/Header'
import TodoForm from './components/TodoForm'
import FilterBar from './components/FilterBar'
import TodoList from './components/TodoList'
import EmptyState from './components/EmptyState'
import Footer from './components/Footer'

export default function App() {
  const theme    = useTheme((s) => s.theme)
  const allTodos = useTodos((s) => s.todos)

  // full filter state
  const [filters, setFilters] = useState({
    status:       'all',
    createdAfter: '',
    tagFilter:    '',
  })

  // apply dark/light theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // helper to split/tag‐trim
  const parseTags = (str) =>
    str
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t !== '')

  // derive the list we actually render
  const visibleTodos = allTodos.filter((todo) => {
    // 1. status
    if (filters.status === 'active' && todo.done) return false
    if (filters.status === 'completed' && !todo.done) return false

    // 2. created-after
    if (filters.createdAfter) {
      const created = dayjs(todo.createdAt)
      const after   = dayjs(filters.createdAfter)
      if (created.isBefore(after, 'day')) return false
    }

    // 3. tag filter
    if (filters.tagFilter) {
      const wantedTags = parseTags(filters.tagFilter)
      const hasMatch   = wantedTags.some((tag) =>
        todo.tags.includes(tag)
      )
      if (!hasMatch) return false
    }

    return true
  })

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