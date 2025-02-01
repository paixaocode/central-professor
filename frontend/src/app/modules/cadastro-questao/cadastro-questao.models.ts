export type CadastroQuestao = {
  statement: string
  isPublic: boolean
  alternatives: [string]
  correctAnswer: number
  subjectId: Subject
  topic: string
  gradeId: Grade
  difficulty: string
  acessibility: boolean
}

type Grade = {
  id: string
  name: string
}

type Subject = {
  name: string
  topics: [string]
}