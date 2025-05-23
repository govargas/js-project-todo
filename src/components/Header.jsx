import React from 'react';
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header
      className="
        flex items-center justify-between
        px-4 py-3        /* mobile */
        sm:px-6 sm:py-4  /* tablet */
        md:px-8 md:py-6  /* desktop */
      ">
      <h1 className="text-9xl font-bold">klar</h1>
      <ThemeToggle />
    </header>
  );
}