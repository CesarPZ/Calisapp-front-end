import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionDayComponent } from './opinion-day.component';

describe('OpinionDayComponent', () => {
  let component: OpinionDayComponent;
  let fixture: ComponentFixture<OpinionDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpinionDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
