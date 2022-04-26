import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineGeneratedComponent } from './routine-generated.component';

describe('RoutineGeneratedComponent', () => {
  let component: RoutineGeneratedComponent;
  let fixture: ComponentFixture<RoutineGeneratedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutineGeneratedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
