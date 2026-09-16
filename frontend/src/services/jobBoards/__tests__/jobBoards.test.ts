import { describe, it, expect } from 'vitest'
import { indeedBoard } from '../indeed'
import { linkedinBoard } from '../linkedin'
import { pnetBoard } from '../pnet'
import { careers24Board } from '../careers24'

describe('Indeed URL generation', () => {
  it('encodes spaces and includes location', () => {
    const url = indeedBoard.generateUrl('Junior Software Engineer', 'Johannesburg')
    expect(url).toBe('https://za.indeed.com/jobs?q=Junior+Software+Engineer&l=Johannesburg')
  })

  it('omits location if not provided', () => {
    const url = indeedBoard.generateUrl('Full Stack Developer')
    expect(url).toBe('https://za.indeed.com/jobs?q=Full+Stack+Developer')
  })

  it('handles special characters', () => {
    const url = indeedBoard.generateUrl('C++ Developer', 'Cape Town')
    expect(url).toBe('https://za.indeed.com/jobs?q=C%2B%2B+Developer&l=Cape+Town')
  })
})

describe('LinkedIn URL generation', () => {
  it('uses keywords and location parameters', () => {
    const url = linkedinBoard.generateUrl('Junior Software Engineer', 'Pretoria')
    expect(url).toBe('https://www.linkedin.com/jobs/search/?keywords=Junior+Software+Engineer&location=Pretoria')
  })

  it('omits location when not provided', () => {
    const url = linkedinBoard.generateUrl('Graduate Developer')
    expect(url).toBe('https://www.linkedin.com/jobs/search/?keywords=Graduate+Developer')
  })
})

describe('PNet URL generation', () => {
  it('creates a path-based URL with location', () => {
    const url = pnetBoard.generateUrl('Software Testing', 'Sandton, Gauteng')
    expect(url).toBe('https://www.pnet.co.za/jobs/software-testing/in-sandton-or-gauteng?searchOrigin=Resultlist_top-search')
  })

  it('encodes special characters in title', () => {
    const url = pnetBoard.generateUrl('C++ Developer', 'Johannesburg')
    expect(url).toBe('https://www.pnet.co.za/jobs/c%2b%2b-developer/in-johannesburg?searchOrigin=Resultlist_top-search')
  })

  it('omits location segment if not provided', () => {
    const url = pnetBoard.generateUrl('Full Stack Developer')
    expect(url).toBe('https://www.pnet.co.za/jobs/full-stack-developer?searchOrigin=Resultlist_top-search')
  })
})

describe('Careers24 URL generation', () => {
  it('creates path-based URL with location', () => {
    const url = careers24Board.generateUrl('Junior Backend Developer', 'Cape Town')
    expect(url).toBe('https://www.careers24.com/jobs/lc-cape-town/kw-junior-backend-developer/rmt-incl/')
  })

  it('omits location segment when not provided', () => {
    const url = careers24Board.generateUrl('Data Analyst')
    expect(url).toBe('https://www.careers24.com/jobs/kw-data-analyst/rmt-incl/')
  })

  it('handles special characters by removing them', () => {
    const url = careers24Board.generateUrl('C++ Developer', 'Johannesburg CBD')
    expect(url).toBe('https://www.careers24.com/jobs/lc-johannesburg-cbd/kw-c-developer/rmt-incl/')
  })
})


// ------------------------------------------------------------
// Expanded test suite for all job boards
// ------------------------------------------------------------

describe('Indeed URL generation – complex cases', () => {
  const location = 'Johannesburg, Gauteng'

  it.each([
    ['Junior Software Developer', 'Junior+Software+Developer'],
    ['Junior Software Engineer', 'Junior+Software+Engineer'],
    ['Junior Full-Stack Developer', 'Junior+Full-Stack+Developer'],
    ['Graduate Software Developer', 'Graduate+Software+Developer'],
    ['Associate Software Engineer', 'Associate+Software+Engineer'],
    ['Junior Application Developer', 'Junior+Application+Developer'],
  ])('encodes title "%s" correctly', (title, expectedQ) => {
    const url = indeedBoard.generateUrl(title, location)
    expect(url).toBe(`https://za.indeed.com/jobs?q=${expectedQ}&l=${encodeURIComponent(location).replace(/%20/g, "+")}`)
  })

  it('handles title with special characters (C#)', () => {
    const url = indeedBoard.generateUrl('C# Developer', 'Cape Town')
    expect(url).toBe('https://za.indeed.com/jobs?q=C%23+Developer&l=Cape+Town')
  })

  it('handles title with ampersand', () => {
    const url = indeedBoard.generateUrl('Sales & Marketing', 'Durban')
    expect(url).toBe('https://za.indeed.com/jobs?q=Sales+%26+Marketing&l=Durban')
  })

  it('handles empty title (documenting current behavior)', () => {
    const url = indeedBoard.generateUrl('', 'Remote')
    expect(url).toBe('https://za.indeed.com/jobs?q=&l=Remote')
  })
})

describe('LinkedIn URL generation – complex cases', () => {
  const location = 'Pretoria, Gauteng'

  it.each([
    ['Junior Software Developer', 'Junior+Software+Developer'],
    ['Junior Full-Stack Developer', 'Junior+Full-Stack+Developer'],
    ['Graduate Software Developer', 'Graduate+Software+Developer'],
  ])('encodes title "%s" correctly', (title, expectedKeywords) => {
    const url = linkedinBoard.generateUrl(title, location)
    expect(url).toBe(`https://www.linkedin.com/jobs/search/?keywords=${expectedKeywords}&location=${encodeURIComponent(location).replace(/%20/g, "+")}`)
  })

  it('omits location when not provided', () => {
    const url = linkedinBoard.generateUrl('C++ Developer')
    expect(url).toBe('https://www.linkedin.com/jobs/search/?keywords=C%2B%2B+Developer')
  })

  it('handles special characters in title', () => {
    const url = linkedinBoard.generateUrl('Node.js Developer', 'Cape Town')
    expect(url).toBe('https://www.linkedin.com/jobs/search/?keywords=Node.js+Developer&location=Cape+Town')
  })
})

describe('PNet URL generation – complex cases', () => {
  it.each([
    ['Junior Software Developer', 'junior-software-developer'],
    ['Junior Software Engineer', 'junior-software-engineer'],
    ['Junior Full-Stack Developer', 'junior-full-stack-developer'],
    ['Graduate Software Developer', 'graduate-software-developer'],
    ['Associate Software Engineer', 'associate-software-engineer'],
    ['Junior Application Developer', 'junior-application-developer'],
  ])('creates correct path for title "%s"', (title, expectedSlug) => {
    const url = pnetBoard.generateUrl(title, 'Johannesburg')
    expect(url).toBe(`https://www.pnet.co.za/jobs/${expectedSlug}/in-johannesburg?searchOrigin=Resultlist_top-search`)
  })

  it('handles special characters (C++)', () => {
    const url = pnetBoard.generateUrl('C++ Developer', 'Cape Town')
    expect(url).toBe('https://www.pnet.co.za/jobs/c%2b%2b-developer/in-cape-town?searchOrigin=Resultlist_top-search')
  })

  it('handles comma in location', () => {
    const url = pnetBoard.generateUrl('Data Analyst', 'Johannesburg, Gauteng')
    expect(url).toBe('https://www.pnet.co.za/jobs/data-analyst/in-johannesburg-or-gauteng?searchOrigin=Resultlist_top-search')
  })

  it('omits location segment if empty string provided', () => {
    const url = pnetBoard.generateUrl('Full Stack Developer', '')
    expect(url).toBe('https://www.pnet.co.za/jobs/full-stack-developer?searchOrigin=Resultlist_top-search')
  })
})

describe('Careers24 URL generation – complex cases', () => {
  it.each([
    ['Junior Software Developer', 'junior-software-developer'],
    ['Junior Software Engineer', 'junior-software-engineer'],
    ['Junior Full-Stack Developer', 'junior-full-stack-developer'],
    ['Graduate Software Developer', 'graduate-software-developer'],
    ['Associate Software Engineer', 'associate-software-engineer'],
    ['Junior Application Developer', 'junior-application-developer'],
  ])('creates correct path for title "%s"', (title, expectedSlug) => {
    const url = careers24Board.generateUrl(title, 'Johannesburg CBD')
    expect(url).toBe(`https://www.careers24.com/jobs/lc-johannesburg-cbd/kw-${expectedSlug}/rmt-incl/`)
  })

  it('strips province from location', () => {
    const url = careers24Board.generateUrl('Junior PA', 'Johannesburg, Gauteng')
    expect(url).toBe('https://www.careers24.com/jobs/lc-johannesburg/kw-junior-pa/rmt-incl/')
  })

  it('removes special characters from title', () => {
    const url = careers24Board.generateUrl('C# Developer', 'Cape Town')
    expect(url).toBe('https://www.careers24.com/jobs/lc-cape-town/kw-c-developer/rmt-incl/')
  })

  it('handles multiple spaces in title and location', () => {
    const url = careers24Board.generateUrl('  Senior   Developer  ', '  Johannesburg   CBD  ')
    expect(url).toBe('https://www.careers24.com/jobs/lc-johannesburg-cbd/kw-senior-developer/rmt-incl/')
  })
})