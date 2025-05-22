import React, { useEffect } from 'react'
import { useTodos } from './store/useTodos'
import { useTheme } from './store/useTheme'
import Header from './components/Header'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import EmptyState from './components/EmptyState'
import Footer from './components/Footer'

export default function App() {
  const todos = useTodos((s) => s.todos)
  const theme = useTheme((s) => s.theme)

  // Apply the current theme to the <html> element
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
        {todos.length > 0 ? <TodoList /> : <EmptyState />}
      </main>
      <Footer />
    </div>
  )
}