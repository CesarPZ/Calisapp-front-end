import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseInformationCardComponent } from './exercise-information-card.component';

describe('ExerciseInformationCardComponent', () => {
  let component: ExerciseInformationCardComponent;
  let fixture: ComponentFixture<ExerciseInformationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseInformationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseInformationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
