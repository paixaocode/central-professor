export type CadastroQuestao = {
  statement: string
  isPublic: boolean
  alternatives: [string]
  correctAnswer: number
  subjectId: SubjectForm
  topic: string
  gradeId: Grade
  difficulty: string
  acessibility: boolean
}

export type Grade = {
  _id: string
  name: string
  default: boolean
}

export type SubjectForm = {
  _id: string
  name: string
  topics: [string]
  default: boolean
}

export type SubjectObject = {
  page: number
  subjects: [SubjectForm]
  success: boolean
  totalPages: number
  totalQuestions: number
}

export type GradeObject = {
  grades: [Grade]
  success: boolean
}