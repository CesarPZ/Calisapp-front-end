import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionRoutineComponent } from './opinion-routine.component';

describe('OpinionRoutineComponent', () => {
  let component: OpinionRoutineComponent;
  let fixture: ComponentFixture<OpinionRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpinionRoutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
