import { Component, inject, signal } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Participants } from '../participants';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Competition } from '../../models/competition';
import { Participant } from '../../models/participant';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-participant-add',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    SelectModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
  ],
  templateUrl: './participant-add.html',
  styleUrl: './participant-add.css'
})
export class ParticipantAdd {
  private config = inject(DynamicDialogConfig);
  private competition = this.config.data.competition as Competition;
  private ref = inject(DynamicDialogRef);
  private participantsService = inject(Participants);
  protected isAdding = signal(false);
  protected participantForm = inject(FormBuilder).nonNullable.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    gender: ['male', Validators.required],
    age: [, Validators.required],
    weight: [, Validators.required],
    competitionId: [this.competition.id]
  });

  protected genders = [
    { label: 'Masculin', value: 'male' },
    { label: 'Feminin', value: 'female' }
  ]

  protected onSubmit() {
    this.isAdding.set(true);
    const {firstname, lastname, gender, age, weight, competitionId} = this.participantForm.getRawValue();
    const newParticipant = {
      firstname, lastname, gender, 
      age: age ?? 0, weight: weight ?? 0, competitionId, createdAt: Date.now()
    } as Participant;
    this.participantsService.add(newParticipant).then(
      () => this.ref.close(true)
    ).catch(err => console.log(err)).finally(() => this.isAdding.set(false));
  }
}
