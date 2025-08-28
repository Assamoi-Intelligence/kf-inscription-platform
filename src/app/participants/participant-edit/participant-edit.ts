import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Competition } from '../../models/competition';
import { Participant } from '../../models/participant';
import { Participants } from '../participants';

@Component({
  selector: 'app-participant-edit',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    SelectModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
  ],
  templateUrl: './participant-edit.html',
  styleUrl: './participant-edit.css'
})
export class ParticipantEdit {
  private config = inject(DynamicDialogConfig);
  private participant = this.config.data.participant as Participant;
  private ref = inject(DynamicDialogRef);
  private participantsService = inject(Participants);
  protected isEditing = signal(false);
  protected participantForm = inject(FormBuilder).nonNullable.group({
    firstname: [this.participant.firstname, Validators.required],
    lastname: [this.participant.lastname, Validators.required],
    gender: [this.participant.gender, Validators.required],
    age: [this.participant.age, Validators.required],
    weight: [this.participant.weight, Validators.required]
  });

  protected genders = [
    { label: 'Masculin', value: 'male' },
    { label: 'Feminin', value: 'female' }
  ]

  protected onSubmit() {
    this.isEditing.set(true);
    const {firstname, lastname, gender, age, weight} = this.participantForm.getRawValue();
    const newParticipant = {
      ...this.participant,
      firstname, lastname, gender, 
      age, weight,
    } as Participant;
    this.participantsService.edit(newParticipant).then(
      () => this.ref.close(true)
    ).catch(err => console.log(err)).finally(() => this.isEditing.set(false));
  }
}
