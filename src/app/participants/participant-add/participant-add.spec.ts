import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantAdd } from './participant-add';

describe('ParticipantAdd', () => {
  let component: ParticipantAdd;
  let fixture: ComponentFixture<ParticipantAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
