import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';
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
  
  async add(competition: Competition) {
    return runInInjectionContext(this.injector, () => {
      const collectionRef = collection(this.firestore, 'competitions');
      const docRef = doc(collectionRef);
      competition.id = docRef.id;
      competition.createdAt = Date.now();
      return addDoc(collectionRef, competition);
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
