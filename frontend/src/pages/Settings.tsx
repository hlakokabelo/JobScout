import { useState } from 'react'
import { jobBoards } from '../services/jobBoards'
import { loadSettings, saveSettings } from '../utils/storage'
import type { UserSettings } from '../types/job'

export default function Settings() {
  const [settings, setSettings] = useState<UserSettings>(() => loadSettings())
  const [saved, setSaved] = useState(false)

  const handleBoardToggle = (boardId: string) => {
    setSettings((prev) => {
      const isSelected = prev.selectedBoardIds.includes(boardId)
      const newSelected = isSelected
        ? prev.selectedBoardIds.filter((id) => id !== boardId)
        : [...prev.selectedBoardIds, boardId]
      return { ...prev, selectedBoardIds: newSelected }
    })
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, location: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    saveSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      <p className="mt-2 text-gray-600">
        Choose which job boards to search and set your default location.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-md">
        <fieldset>
          <legend className="text-sm font-medium text-gray-700">
            Job Boards
          </legend>
          <div className="mt-2 space-y-2">
            {jobBoards.map((board) => (
              <label key={board.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.selectedBoardIds.includes(board.id)}
                  onChange={() => handleBoardToggle(board.id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{board.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={settings.location}
            onChange={handleLocationChange}
            placeholder="e.g. Johannesburg, Gauteng"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Settings
        </button>
        {saved && (
          <span className="ml-3 text-sm text-green-600">Saved!</span>
        )}
      </form>
    </div>
  )
}