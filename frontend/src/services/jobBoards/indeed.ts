import type { JobBoard } from '../../types/job'

export const indeedBoard: JobBoard = {
  id: 'indeed',
  name: 'Indeed',
  generateUrl: (title: string, location?: string) => {
    const params = new URLSearchParams()
    params.set('q', title)
    if (location) {
      params.set('l', location)
    }
    return `https://za.indeed.com/jobs?${params.toString()}`
  },
}