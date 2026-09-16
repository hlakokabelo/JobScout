import type { JobBoard } from '../../types/job'

function formatForPnet(text: string): string {
  // Lowercase, replace spaces with hyphens, then encodeURIComponent to handle
  // special characters like '+', '&', etc. properly in the path.
  const slug = text.toLowerCase().trim().replace(/\s+/g, '-').replace(' ','')
  return encodeURIComponent(slug).toLocaleLowerCase()
}


export const pnetBoard: JobBoard = {
  id: 'pnet',
  name: 'PNet',
  generateUrl: (title: string, location?: string) => {
    const base = 'https://www.pnet.co.za/jobs'
    const titlePath = formatForPnet(title)
    let path = `${base}/${titlePath}`

    if (location) {
      const locationPath = formatForPnet(location.replace(',', "-or-")).replace(/-{2,}/g,'-')
      path += `/in-${locationPath}`
    }

    // searchOrigin appears to be required for correct redirect/tracking.
    const params = new URLSearchParams()
    params.set('searchOrigin', 'Resultlist_top-search')
    return `${path}?${params.toString()}`
  },
}