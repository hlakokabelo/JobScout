import type { JobBoard } from '../../types/job'

export const linkedinBoard: JobBoard = {
  id: 'linkedin',
  name: 'LinkedIn',
  generateUrl: (title: string, location?: string) => {
    const params = new URLSearchParams()
    params.set('keywords', title)
    if (location) {
      params.set('location', location)
    }
    return `https://www.linkedin.com/jobs/search/?${params.toString()}`
  },
}