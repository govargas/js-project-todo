import React from 'react'
import dayjs from 'dayjs'
import { useTodos } from '../store/useTodos'
import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd'

export default function TodoList({ todos: propTodos }) {
  const allTodos       = useTodos((s) => s.todos)
  const todos          = propTodos ?? allTodos
  const toggleTodo     = useTodos((s) => s.toggleTodo)
  const removeTodo     = useTodos((s) => s.removeTodo)
  const reorderInGroup = useTodos((s) => s.reorderInGroup)
  const today          = dayjs()

  // Unique project names, preserving order
  const projects = [...new Set(todos.map((t) => t.project))]

  const handleDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId !== destination.droppableId) return

    reorderInGroup(
      source.droppableId,
      source.index,
      destination.index
    )
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="space-y-6">
        {projects.map((project) => {
          const projectTasks = todos.filter((t) => t.project === project)

          return (
            <section key={project} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{project}</h2>

              <Droppable droppableId={project}>
                {(provided) => (
                  <ul
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-2 sm:space-y-3"
                  >
                    {projectTasks.map((todo, index) => {
                      const due = todo.dueDate ? dayjs(todo.dueDate) : null
                      const isOverdue =
                        due && due.isBefore(today, 'day') && !todo.done

                      return (
                        <Draggable
                          key={todo.id}
                          draggableId={todo.id}
                          index={index}
                        >
                          {(prov) => (
                            <li
                              ref={prov.innerRef}
                              {...prov.draggableProps}
                              role="listitem"            // override ARIA role
                              {...prov.dragHandleProps}
                              className={`
                                flex flex-col sm:flex-row sm:items-center justify-between
                                p-2 sm:p-3 md:p-4
                                border border-bauhaus rounded
                                transition-shadow hover:shadow-md
                                ${todo.done ? 'opacity-50 line-through text-completed' : ''}
                                ${isOverdue ? 'border-accent-red' : ''}
                              `}
                            >
                              <div className="flex flex-col">
                                <span className="font-semibold">
                                  {todo.text}
                                </span>
                                <span className="text-xs text-muted mt-1">
                                  Created: {dayjs(todo.createdAt).format('MMM D, YYYY')}
                                </span>
                                {due && (
                                  <span
                                    className={`text-xs mt-1 ${
                                      isOverdue ? 'text-accent-red' : 'text-muted'
                                    }`}
                                  >
                                    Due: {due.format('MMM D, YYYY')}
                                  </span>
                                )}
                                {todo.tags?.length > 0 && (
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {todo.tags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="px-2 py-0.5 text-xs bg-accent-yellow text-bauhaus-text rounded-full"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="mt-2 sm:mt-0 space-x-2 flex-shrink-0">
                                <button
                                  onClick={() => toggleTodo(todo.id)}
                                  className="px-3 py-1 border border-accent-blue text-accent-blue rounded"
                                >
                                  {todo.done ? 'Undo' : 'Done'}
                                </button>
                                <button
                                  onClick={() => removeTodo(todo.id)}
                                  className="px-3 py-1 border border-accent-red text-accent-red rounded"
                                >
                                  ✕
                                </button>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      )
                    })}

                    {/* Wrap placeholder so <ul> has only <li> children */}
                    <li aria-hidden="true" className="list-none">
                      {provided.placeholder}
                    </li>
                  </ul>
                )}
              </Droppable>
            </section>
          )
        })}
      </div>
    </DragDropContext>
  )
}