import React from 'react';
import Header from './components/Header';
import ThemeToggle from './components/ThemeToggle';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header />
      <ThemeToggle />
      <main className="p-4 space-y-6">
        <TodoForm />
        <TodoList />
        <EmptyState />
      </main>
      <Footer />
    </div>
  );
}