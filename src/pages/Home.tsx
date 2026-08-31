
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveJobTitles, loadJobTitles } from '../utils/storage'
import type { JobTitle } from '../types/job'

export default function Home() {
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  // Parse input into unique, non-empty titles
  const parsedTitles = useMemo(() => {
    const titles = input
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    return Array.from(new Set(titles))
  }, [input])

  const titleCount = parsedTitles.length
  const isTooLarge = titleCount > 100

   const handleGenerate = (event: React.FormEvent) => {
    event.preventDefault()
    if (titleCount === 0) return

    // Load existing titles from storage
    const existingTitles = loadJobTitles()

    // Create a Set of existing titles (lowercased) for quick lookup
    const existingTitleSet = new Set(
      existingTitles.map((t) => t.title.toLowerCase())
    )

    // Filter new titles to those not already present
    const newTitles = parsedTitles
      .filter((title) => !existingTitleSet.has(title.toLowerCase()))
      .map((title) => ({
        id: crypto.randomUUID(),
        title,
      }))

    // Prepend new titles to existing ones
    const combinedTitles: JobTitle[] = [...newTitles, ...existingTitles]

    // Save combined list
    saveJobTitles(combinedTitles)

    // Navigate to Searches page
    navigate('/searches')
  }

  const handleClear = () => {
    setInput('')
  }

  return (
    <div>
      {/* Page heading */}
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Scout once. Search everywhere.
      </h1>

      <p className="mt-2 max-w-2xl text-gray-600">
        Paste your job titles below — one per line — and we’ll generate
        search links for your favourite job boards.
      </p>

      {/* Job title form */}
      <form
        onSubmit={handleGenerate}
        className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
      >
        {/* Label */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="job-titles"
            className="text-sm font-semibold text-gray-900"
          >
            Job Titles
          </label>

          <span className="text-xs text-gray-400">
            One per line
          </span>
        </div>

        {/* Textarea */}
        <div className="mt-3">
          <textarea
            id="job-titles"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            spellCheck={false}
            className="
              block w-full resize-y rounded-xl
              border border-gray-200
              bg-gray-50
              px-4 py-4
              text-base leading-7 text-gray-900
              placeholder:text-gray-400
              shadow-sm
              outline-none
              transition-all duration-200
              hover:border-gray-300
              focus:border-indigo-500
              focus:bg-white
              focus:ring-4 focus:ring-indigo-500/10
            "
            placeholder={`Junior Software Engineer
Junior Software Developer
Graduate Software Developer
Full Stack Developer`}
          />
        </div>

        {/* Title count / warning */}
        <div className="mt-3 flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="text-gray-500">
            {titleCount > 0
              ? `${titleCount} unique title${titleCount === 1 ? '' : 's'}`
              : 'No titles entered yet'}
          </span>

          {isTooLarge && (
            <span className="text-amber-600">
              That&apos;s a lot of titles! Consider splitting them into
              groups.
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={titleCount === 0}
            className="
              inline-flex w-full items-center justify-center
              rounded-xl
              bg-indigo-600
              px-5 py-2.5
              text-sm font-semibold text-white
              shadow-sm
              transition-colors
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-4 focus:ring-indigo-500/20
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:w-auto
            "
          >
            Generate Searches
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={titleCount === 0}
            className="
              inline-flex w-full items-center justify-center
              rounded-xl
              border border-gray-200
              bg-white
              px-5 py-2.5
              text-sm font-semibold text-gray-700
              shadow-sm
              transition-colors
              hover:bg-gray-50
              focus:outline-none
              focus:ring-4 focus:ring-indigo-500/10
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:w-auto
            "
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}

