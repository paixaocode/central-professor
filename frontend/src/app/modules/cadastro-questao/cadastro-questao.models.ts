export type CadastroQuestao = {
  statement: string
  isPublic: boolean
  alternatives: [string]
  correctAnswer: number
  subjectId: MateriaForm
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

export type MateriaForm = {
  _id: string
  name: string
  topics: [string]
  default: boolean
}

export type MateriaObj = {
  page: number
  subjects: [MateriaForm]
  success: boolean
  totalPages: number
  totalQuestions: number
}

export type GradeObj = {
  grades: [Grade]
  success: boolean
}

export type QuestaoObj = {
  page: number
  questions: [CadastroQuestao]
  success: boolean
  totalPages: number
  totalQuestions: number
}