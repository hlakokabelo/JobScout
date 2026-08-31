export interface JobBoard {
  id: string
  name: string
  generateUrl: (title: string, location?: string) => string
}

export interface JobTitle {
  id: string
  title: string
}

export interface UserSettings {
  selectedBoardIds: string[]
  location: string
}