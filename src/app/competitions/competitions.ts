import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, updateDoc, writeBatch } from '@angular/fire/firestore';
import { Competition } from '../models/competition';
import { Participant } from '../models/participant';
import { Participants } from '../participants/participants';

@Injectable({
  providedIn: 'root'
})
export class Competitions {
  private firestore = inject(Firestore);
  private injector = inject(Injector);
  private participantsService = inject(Participants);

  async get(id: string) {
    return runInInjectionContext(this.injector, async () => {
      const docRef = doc(this.firestore, 'competitions', id);
      const docSnap = await getDoc(docRef);
      return docSnap.data() as Competition;
    });
  }

  async getAll() {
    return runInInjectionContext(this.injector, async () => {
      const collectionRef = collection(this.firestore, 'competitions');
      const docs = await getDocs(collectionRef);
      return docs.docs.map(el => el.data() as Competition)
    });
  }

  getParticipants(competitionId: string) {
    return this.participantsService.getAllByCompetition(competitionId);
  }

  getParticipants$(competionId: string) {
    return this.participantsService.getAllByCompetitions$(competionId);
  }
  
  async add(competition: Competition) {
    return runInInjectionContext(this.injector, () => {
      const batch = writeBatch(this.firestore);
      const collectionRef = collection(this.firestore, 'competitions');
      const docRef = doc(collectionRef);
      competition.id = docRef.id;
      competition.createdAt = Date.now();
      batch.set(docRef, competition);
      return batch.commit();
    });
  }

  async update(competition: Competition) {
    return runInInjectionContext(this.injector, () => {
      const collectionRef = collection(this.firestore, 'competitions');
      const docRef = doc(collectionRef, competition.id);
      return updateDoc(docRef, {...competition});
    });
  }

  async delete(competition: Competition) {
    return runInInjectionContext(this.injector, () => {
      const collectionRef = collection(this.firestore, 'competitions');
      const docRef = doc(collectionRef, competition.id);
      return deleteDoc(docRef);
    });
  }
}
