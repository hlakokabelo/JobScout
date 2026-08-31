import type { JobTitle, UserSettings } from '../types/job'

const JOB_TITLES_KEY = 'jobscout_titles'
const SETTINGS_KEY = 'jobscout_settings'

export function saveJobTitles(titles: JobTitle[]): void {
  localStorage.setItem(JOB_TITLES_KEY, JSON.stringify(titles))
}

export function loadJobTitles(): JobTitle[] {
  const stored = localStorage.getItem(JOB_TITLES_KEY)
  if (!stored) return []
  try {
    return JSON.parse(stored) as JobTitle[]
  } catch {
    return []
  }
}


export function loadSettings(): UserSettings {
  const stored = localStorage.getItem(SETTINGS_KEY)
  if (!stored) {
    // Default settings: all boards selected, empty location
    return {
      selectedBoardIds: ['indeed', 'linkedin', 'pnet', 'careers24'],
      location: '',
    }
  }
  try {
    return JSON.parse(stored) as UserSettings
  } catch {
    return {
      selectedBoardIds: ['indeed', 'linkedin', 'pnet', 'careers24'],
      location: '',
    }
  }
}

export function saveSettings(settings: UserSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}


export function deleteJobTitle(id: string): void {
  const titles = loadJobTitles()
  const updated = titles.filter((title) => title.id !== id)
  saveJobTitles(updated)
}

export function clearJobTitles(): void {
  localStorage.removeItem(JOB_TITLES_KEY)
}