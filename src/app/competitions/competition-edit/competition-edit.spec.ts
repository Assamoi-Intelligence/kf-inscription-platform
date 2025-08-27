import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionEdit } from './competition-edit';

describe('CompetitionEdit', () => {
  let component: CompetitionEdit;
  let fixture: ComponentFixture<CompetitionEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
