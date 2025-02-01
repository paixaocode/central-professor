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
  id: string
  name: string
}

export type SubjectForm = {
  name: string
  topics: [string]
}