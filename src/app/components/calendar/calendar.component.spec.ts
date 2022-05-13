import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarUserService } from 'src/app/service/calendar-user.service';
import { HttpClientModule } from '@angular/common/http';

import { CalendarComponent } from './calendar.component';
import { CalendarUser } from 'src/app/model/calendar-user';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let calendarUserService;
  let now = new Date();
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  let tomorrow = new Date(now.setDate(now.getDate() + 1));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ HttpClientModule ],
      declarations: [ CalendarComponent ],
      providers: [ { provider: CalendarUserService, useValue: calendarUserService },]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let routineToday= new CalendarUser();
    routineToday.dayRoutine = today
    let routineToday2 = new CalendarUser();
    routineToday2.dayRoutine = today;
    let routineToday3 = new CalendarUser();
    routineToday3.dayRoutine = tomorrow;

    component.calendarUser.push(routineToday);
    component.calendarUser.push(routineToday2);
    component.calendarUser.push(routineToday3);
  });
  
  it('should create calendar with dates', () => {
    expect(component.calendarUser.length).toEqual(3);
  });
  
  it('should return today routines', () => {

    component.onSelection(today);

    expect(component.dateSelected).toEqual('Rutinas programadas para hoy:');
    expect(component.routinesSelected.length).toEqual(2);
  });

  it('should return tonorrow routines', () => {

    component.onSelection(tomorrow);

    expect(component.dateSelected).toMatch('Rutinas programadas para el día:');
    expect(component.routinesSelected.length).toEqual(1);
  });

});