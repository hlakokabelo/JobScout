import { indeedBoard } from './indeed'
import { linkedinBoard } from './linkedin'
import { pnetBoard } from './pnet'
import { careers24Board } from './careers24'
import type { JobBoard } from '../../types/job'

export const jobBoards: JobBoard[] = [
  indeedBoard,
  linkedinBoard,
  pnetBoard,
  careers24Board,
]