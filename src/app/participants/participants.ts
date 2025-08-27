import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDocs, writeBatch } from '@angular/fire/firestore';
import { Participant } from '../models/participant';

@Injectable({
  providedIn: 'root'
})
export class Participants {
  private firestore = inject(Firestore);
  private injector = inject(Injector);

  add(participant: Participant) {
    return runInInjectionContext(this.injector, () => {
      const batch = writeBatch(this.firestore);
      const participantCollectionRef = collection(this.firestore, 'participants');
      const docRef = doc(participantCollectionRef);
      participant.id = docRef.id;
      const competionRef = doc(this.firestore, 'competitions', participant.competitionId, 'participants', participant.id);
      batch.set(docRef, participant);
      batch.set(competionRef, participant);
      return batch.commit();
    });
  }

  async getAllByCompetition(competitionId: string) {
    return runInInjectionContext(this.injector, async () => {
      const collectionRef = collection(this.firestore, 'competitions', competitionId, 'participants');
      const docs = await getDocs(collectionRef);
      return docs.docs.map(el => el.data() as Participant)
    });
  }
}
