import React from 'react'
import Stats from './Stats'

export default function Footer() {
  return (
    <footer
      className="
      max-w-full sm:max-w-md md:max-w-xl lg:max-w-2xl
      mx-auto
      px-4 sm:px-6 md:px-8
    ">
      <Stats />
    </footer>
  )
}