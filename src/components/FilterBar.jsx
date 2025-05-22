import React, { useState } from 'react'

export default function FilterBar({ onFilterChange }) {
  const [status, setStatus] = useState('all')
  const [createdAfter, setCreatedAfter] = useState('')

  const handleStatusChange = (e) => {
    const newStatus = e.target.value
    setStatus(newStatus)
    onFilterChange({ status: newStatus, createdAfter })
  }

  const handleDateChange = (e) => {
    const newDate = e.target.value
    setCreatedAfter(newDate)
    onFilterChange({ status, createdAfter: newDate })
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
      <select
        value={status}
        onChange={handleStatusChange}
        className="p-2 border border-bauhaus rounded"
        aria-label="Filter by status"
      >
        <option value="all">All tasks</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <input
        type="date"
        value={createdAfter}
        onChange={handleDateChange}
        className="p-2 border border-bauhaus rounded"
        aria-label="Show tasks created on or after"
      />
    </div>
  )
}