import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionAdd } from './competition-add';

describe('CompetitionAdd', () => {
  let component: CompetitionAdd;
  let fixture: ComponentFixture<CompetitionAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
