import React, { useState } from 'react'

export default function FilterBar({ projects, onFilterChange }) {
  const [status, setStatus] = useState('all')
  const [createdAfter, setCreatedAfter] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [projectFilter, setProjectFilter] = useState('all')

  const handleStatusChange = (e) => {
    const newStatus = e.target.value
    setStatus(newStatus)
    onFilterChange({
      status: newStatus,
      createdAfter,
      tagFilter,
      projectFilter,
    })
  }

  const handleDateChange = (e) => {
    const newDate = e.target.value
    setCreatedAfter(newDate)
    onFilterChange({
      status,
      createdAfter: newDate,
      tagFilter,
      projectFilter,
    })
  }

  const handleTagChange = (e) => {
    const newTagFilter = e.target.value
    setTagFilter(newTagFilter)
    onFilterChange({
      status,
      createdAfter,
      tagFilter: newTagFilter,
      projectFilter,
    })
  }

  const handleProjectChange = (e) => {
    const newProject = e.target.value
    setProjectFilter(newProject)
    onFilterChange({
      status,
      createdAfter,
      tagFilter,
      projectFilter: newProject,
    })
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
      {/* Project filter */}
      <select
        value={projectFilter}
        onChange={handleProjectChange}
        className="p-2 border border-bauhaus rounded"
        aria-label="Filter by project"
      >
        <option value="all">All Projects</option>
        {projects.map((proj) => (
          <option key={proj} value={proj}>
            {proj}
          </option>
        ))}
      </select>

      {/* Status filter */}
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

      {/* Created-after filter */}
      <input
        type="date"
        value={createdAfter}
        onChange={handleDateChange}
        className="p-2 border border-bauhaus rounded"
        aria-label="Show tasks created on or after"
      />

      {/* Tag filter */}
      <input
        type="text"
        value={tagFilter}
        onChange={handleTagChange}
        placeholder="Filter by tags"
        className="p-2 border border-bauhaus rounded"
        aria-label="Filter by tags"
      />
    </div>
)
}