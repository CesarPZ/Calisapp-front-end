import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineTodayComponent } from './routine-today.component';

describe('RoutineTodayComponent', () => {
  let component: RoutineTodayComponent;
  let fixture: ComponentFixture<RoutineTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutineTodayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
