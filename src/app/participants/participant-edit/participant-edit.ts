import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Competition } from '../../models/competition';
import { Participant } from '../../models/participant';
import { Participants } from '../participants';
import { Discipline, disciplineList } from '../../disciplines/discipline.list';
import { MultiSelectModule } from 'primeng/multiselect';

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
    MultiSelectModule
  ],
  templateUrl: './participant-edit.html',
  styleUrl: './participant-edit.css'
})
export class ParticipantEdit implements OnInit {
  private config = inject(DynamicDialogConfig);
  private participant = this.config.data.participant as Participant;
  private competition = this.config.data.competition as Competition;
  private ref = inject(DynamicDialogRef);
  private participantsService = inject(Participants);
  protected isEditing = signal(false);

  protected competitionType = this.competition.type;
  protected disciplines = disciplineList;
  
  private formBuilder = inject(FormBuilder);
  protected participantForm = this.formBuilder.nonNullable.group({
    firstname: [this.participant.firstname, Validators.required],
    lastname: [this.participant.lastname, Validators.required],
    gender: [this.participant.gender, Validators.required],
    age: [this.participant.age, Validators.required],
    weight: [this.participant.weight, Validators.required],
    clubName: [this.participant.clubName, Validators.required],
    disciplines: new FormControl<Discipline[]>([], 
      this.competitionType === 'tao-lu' ? Validators.required : null
    ),
  });

  protected genders = [
    { label: 'Masculin', value: 'male' },
    { label: 'Feminin', value: 'female' }
  ]

  ngOnInit() {
    if (this.competitionType !== 'tao-lu') return;
    this.participantForm.patchValue({
      disciplines: this.participant.disciplines
    });
  }

  protected onSubmit() {
    this.isEditing.set(true);
    const {firstname, lastname, gender, age, weight, clubName, disciplines} = this.participantForm.getRawValue();
    const newParticipant = {
      ...this.participant,
      firstname, lastname, gender, 
      age, weight, clubName,
      disciplines: disciplines || []
    } as Participant;
    this.participantsService.edit(newParticipant).then(
      () => this.ref.close(true)
    ).catch(err => console.log(err)).finally(() => this.isEditing.set(false));
  }
}
