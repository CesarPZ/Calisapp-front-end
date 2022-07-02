import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineMobileComponent } from './routine-mobile.component';

describe('RoutineMobileComponent', () => {
  let component: RoutineMobileComponent;
  let fixture: ComponentFixture<RoutineMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutineMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
