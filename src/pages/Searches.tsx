import { useState } from 'react'
import { loadJobTitles, loadSettings, deleteJobTitle, clearJobTitles } from '../utils/storage'
import { jobBoards } from '../services/jobBoards'
import JobSearchCard from '../components/jobs/JobSearchCard'
import type { JobTitle } from '../types/job'

export default function Searches() {
  const [titles, setTitles] = useState<JobTitle[]>(() => loadJobTitles())
  const settings = loadSettings()

  const activeBoards = jobBoards.filter((board) =>
    settings.selectedBoardIds.includes(board.id)
  )

  const handleDelete = (id: string) => {
    deleteJobTitle(id)
    setTitles((prev) => prev.filter((title) => title.id !== id))
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all saved job titles?')) {
      clearJobTitles()
      setTitles([])
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Job Searches</h1>
  {titles.length > 0 && (
    <button
      onClick={handleClearAll}
      className="self-start sm:self-auto px-3 py-1.5 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Clear all
    </button>
  )}
</div>

      {titles.length === 0 ? (
        <p className="mt-2 text-gray-600">
          No job titles yet. Go to the{' '}
          <a href="/" className="text-indigo-600 hover:underline">
            Home
          </a>{' '}
          page to add some.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {titles.map((jobTitle) => (
            <JobSearchCard
              key={jobTitle.id}
              jobTitle={jobTitle}
              boards={activeBoards}
              location={settings.location}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}