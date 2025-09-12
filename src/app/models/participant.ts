import { Discipline } from "../disciplines/discipline.list";

export interface Participant {
  id: string,
  lastname: string,
  firstname: string,
  age: number,
  weight: number,
  gender: 'male' | 'female',
  competitionId: string,
  createdAt: number,
  clubName: string,
  disciplines: Discipline[] | null
}
