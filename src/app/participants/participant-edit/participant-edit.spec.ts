import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantEdit } from './participant-edit';

describe('ParticipantEdit', () => {
  let component: ParticipantEdit;
  let fixture: ComponentFixture<ParticipantEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
