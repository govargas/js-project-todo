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

  // build the unique project list
  const projects = Array.from(new Set(allTodos.map((t) => t.project)))

  // full filter state
  const [filters, setFilters] = useState({
    status:       'all',
    createdAfter: '',
    tagFilter:    '',
    projectFilter:'all',
  })

  // apply dark/light theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // helper to parse comma‐lists
  const parseTags = (str) =>
    str.split(',').map((t) => t.trim()).filter((t) => t !== '')

  // derive the visible todos based on filters
  const visibleTodos = allTodos
    .filter((todo) => {
      // project filter
      if (
        filters.projectFilter !== 'all' &&
        todo.project !== filters.projectFilter
      )
        return false

      // status filter
      if (filters.status === 'active' && todo.done) return false
      if (filters.status === 'completed' && !todo.done) return false

      // created-after filter
      if (filters.createdAfter) {
        const created = dayjs(todo.createdAt)
        const after   = dayjs(filters.createdAfter)
        if (created.isBefore(after, 'day')) return false
      }

      // tag filter
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

      <main className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-full sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto space-y-6">
        <TodoForm />

        <FilterBar
          projects={projects}
          onFilterChange={setFilters}
        />

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