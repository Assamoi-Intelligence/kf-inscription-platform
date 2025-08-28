import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input, input, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Competitions } from '../competitions';
import { Competition } from '../../models/competition';
import { Participant } from '../../models/participant';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ParticipantList } from '../../participants/participant-list/participant-list';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-competition-edit',
  imports: [
    CommonModule, RouterModule, TableModule,
    IconFieldModule, InputIconModule, InputTextModule,
    ButtonModule, DialogModule, TagModule, DividerModule,
    ConfirmDialogModule,
    ProgressSpinnerModule, ParticipantList,
    ReactiveFormsModule, DatePickerModule, FloatLabelModule, 
    SelectModule
  ],
  templateUrl: './competition-edit.html',
  styleUrl: './competition-edit.css',
  providers: [ConfirmationService]
})
export class CompetitionEdit implements OnInit {
  @Input('id') id: string = '';
  private competitionService = inject(Competitions);
  protected competition = signal<Competition | null>(null);
  protected participants = signal<Participant[]>([]);
  private destroyRef = inject(DestroyRef);

  private router = inject(Router);
  private formBuilder =inject(FormBuilder);
  private confirmationService = inject(ConfirmationService);

  protected competitionForm = this.formBuilder.nonNullable.group({
    date: [new Date(), [Validators.required]],
    type: ['', [Validators.required]],
  });

  protected competitionTypes = [
    { label: 'Sanda', value: 'sanda' },
    { label: 'Tao Lu', value: 'tao-lu' }
  ];

  ngOnInit(): void {
    this.getCompetition();
    this.getParticipants();
  }

  getCompetition() {
    this.competitionService.get(this.id).then(
      competition => {
        this.competition.set(competition);
        this.competitionForm.patchValue({
          date: new Date(competition.date),
          type: competition.type
        });
      }
    ).catch(err => console.log(err));
  }

  getParticipants() {
    this.competitionService.getParticipants$(this.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: participants => this.participants.set(participants),
      error: err => console.log(err),
      complete: () => this.participants.set([])
    });
  }

  protected onSubmit() {
    const {type, date} = this.competitionForm.getRawValue();
    const newCompetition = <Competition>{type, date: date.getTime(),createdAt: Date.now()}
    this.competitionService.add(newCompetition).then(
      () => this.router.navigate(['competitions'])
    ).catch(err => console.log(err));
  }
}
