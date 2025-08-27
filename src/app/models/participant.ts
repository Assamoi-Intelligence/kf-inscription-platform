export interface Participant {
  id: string,
  lastname: string,
  firstname: string,
  age: number,
  weight: number,
  gender: 'male' | 'female',
  competitionId: string,
  createdAt: number,
}
