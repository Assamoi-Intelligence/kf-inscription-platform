import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Competitions } from '../competitions';
import { Competition } from '../../models/competition';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-competition-add',
  imports: [
    ReactiveFormsModule, DatePickerModule, FloatLabelModule, 
    SelectModule, ButtonModule, InputTextModule
  ],
  templateUrl: './competition-add.html',
  styleUrl: './competition-add.css'
})
export class CompetitionAdd {
  private competitionsService = inject(Competitions);
  private dialogRef = inject(DynamicDialogRef);
  private formBuilder =inject(FormBuilder);
  protected isAdding = signal(false);

  protected competitionForm = this.formBuilder.nonNullable.group({
    date: [new Date(), [Validators.required]],
    type: ['', [Validators.required]],
    title: ['', [Validators.required]],
  });

  protected competitionTypes = [
    { label: 'Sanda', value: 'sanda' },
    { label: 'Tao Lu', value: 'tao-lu' }
  ];

  protected onSubmit() {
    this.isAdding.set(true);
    const {type, date, title} = this.competitionForm.getRawValue();
    const newCompetition = <Competition>{type, date: date.getTime(),createdAt: Date.now(), title}
    this.competitionsService.add(newCompetition).then(
      () => this.dialogRef.close(true)
    ).catch(err => console.log(err)).finally(() => this.isAdding.set(false));
  }
}
