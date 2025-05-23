import React from 'react'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 text-muted">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 mb-4 text-muted opacity-70"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 0h6"
        />
      </svg>

      <h2 className="text-2xl font-semibold mb-2 text-bauhaus-text">
        No tasks yet!
      </h2>
      <p className="mb-4 text-muted">
        Looks like you don’t have any tasks. Let’s add one.
      </p>
      {/* <span className="text-5xl">📋</span> */}
    </div>
  )
}