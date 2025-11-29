import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Competitions } from '../competitions';
import { Competition } from '../../models/competition';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { ageCategories } from '../../categories/category.list';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-competition-add',
  imports: [
    ReactiveFormsModule, DatePickerModule, FloatLabelModule,
    SelectModule, ButtonModule, InputTextModule, SliderModule,
    InputNumberModule
  ],
  templateUrl: './competition-add.html',
  styleUrl: './competition-add.css'
})
export class CompetitionAdd implements OnInit {
  private competitionsService = inject(Competitions);
  private dialogRef = inject(DynamicDialogRef);
  private formBuilder =inject(FormBuilder);
  protected isAdding = signal(false);

  protected competitionForm = this.formBuilder.nonNullable.group({
    date: [new Date(), [Validators.required]],
    type: ['', [Validators.required]],
    title: ['', [Validators.required]],
    ageCategories: this.formBuilder.array([])
  });

  ngOnInit(): void {
    this.loadAgeCategories();
  }

  get ageCategories(): FormArray<FormGroup> {
    return this.competitionForm.get('ageCategories') as FormArray<FormGroup>;
  }

  removeAgeCategory(index: number) {
    if (!confirm("Attention suppression de categorie")) return;
    this.ageCategories.removeAt(index);
  }

  addAgeCategory() {
    const form = this.formBuilder.nonNullable.group({
      min: 20,
      max: 80,
    })
    this.ageCategories.push(form);
  }

  protected competitionTypes = [
    { label: 'Sanda', value: 'sanda' },
    { label: 'Tao Lu', value: 'tao-lu' }
  ];

  loadAgeCategories() {
    ageCategories.forEach(label => {
      const [min, max] = this.parseAge(label);
      const group = this.formBuilder.nonNullable.group({
        //label: label,
        min: [min, Validators.required],
        max: [max, Validators.required]
      });
      this.ageCategories.push(group);
    });
  }

  parseAge(label: string): [number, number] {
    const [min, max] = label.replace(' ans', '').split('-').map(x => +x);
    return [min, max];
  }

  onMinChange(index: number) {
    const control = this.ageCategories.at(index);
    const min = control.value.min;
    const max = control.value.max;

    if (min > max) {
      control.patchValue({min, max});
    }
  }

  onMaxChange(index: number) {
  const control = this.ageCategories.at(index);
  const min = control.value.range[0];
  const max = control.value.range[1];

  if (max < min) {
    control.patchValue({min, max});
  }
}

  protected onSubmit() {
    this.isAdding.set(true);
    const {type, date, title, ageCategories} = this.competitionForm.getRawValue();
    const newCompetition = <Competition>{type, date: date.getTime(),createdAt: Date.now(), title, ageCategories}
    this.competitionsService.add(newCompetition).then(
      () => this.dialogRef.close(true)
    ).catch(err => console.log(err)).finally(() => this.isAdding.set(false));
  }
}
