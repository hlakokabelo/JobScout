import type { JobBoard } from '../../types/job'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')   // remove special characters
    .replace(/\s+/g, '-')           // spaces to hyphens
    .replace(/-+/g, '-')            // collapse multiple hyphens
}

function handleLocation(location:string){
    //remove provinces
return location.split(',')[0].trim()
}
export const careers24Board: JobBoard = {
  id: 'careers24',
  name: 'Careers24',
  generateUrl: (title: string, location?: string) => {
    const base = 'https://www.careers24.com/jobs'
    const titleSlug = slugify(title)
    let path = `${base}/kw-${titleSlug}`

    if (location) {
        const city = handleLocation(location)
      const locationSlug = slugify(city)
      path = `${base}/lc-${locationSlug}/kw-${titleSlug}`
    }

    return `${path}/rmt-incl/`
  },
}