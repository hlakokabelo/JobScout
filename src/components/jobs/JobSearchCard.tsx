import type { JobTitle, JobBoard } from '../../types/job'

interface JobSearchCardProps {
  jobTitle: JobTitle
  boards: JobBoard[]
  location?: string
  onDelete?: (id: string) => void
}

export default function JobSearchCard({ jobTitle, boards, location, onDelete }: JobSearchCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 relative">
      <h2 className="text-lg font-semibold text-gray-900 pr-8">{jobTitle.title}</h2>

      {onDelete && (
        <button
          onClick={() => onDelete(jobTitle.id)}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 focus:outline-none"
          aria-label={`Delete ${jobTitle.title}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {boards.map((board) => (
          <a
            key={board.id}
            href={board.generateUrl(jobTitle.title, location)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {board.name}
          </a>
        ))}
      </div>
    </div>
  )
}