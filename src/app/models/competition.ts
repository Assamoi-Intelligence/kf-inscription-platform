import { Participant } from "./participant";

export interface Competition {
  id: string,
  date: number,
  type: 'sanda' | 'tao-lu',
  participants: Participant[],
  createdAt: number
}
