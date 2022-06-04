import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarUserService } from 'src/app/service/calendar-user.service';
import { HttpClientModule } from '@angular/common/http';

import { CalendarComponent } from './calendar.component';
import { CalendarUser } from 'src/app/model/calendar-user';
import { Routine } from 'src/app/model/routine';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let calendarUserService;
  let now = new Date();
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  let tomorrow = new Date(now.setDate(now.getDate() + 1));

  let daysAgo1  = new Date(now.setDate(now.getDate() - 1));
  let daysAgo2  = new Date(now.setDate(now.getDate() - 2));
  let daysAgo3  = new Date(now.setDate(now.getDate() - 3));
  let daysAgo4  = new Date(now.setDate(now.getDate() - 4));
  let daysAgo5  = new Date(now.setDate(now.getDate() - 5));

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

    let routine1= new Routine();
    routine1.id = 1;
    let routine2= new Routine();
    routine2.id = 2;

    let routineToday= new CalendarUser();
    routineToday.dayRoutine = today
    routineToday.routine = routine1;

    let routineToday2 = new CalendarUser();
    routineToday2.dayRoutine = today;
    routineToday2.routine = routine1;

    let routineToday3 = new CalendarUser();
    routineToday3.dayRoutine = tomorrow;
    routineToday3.routine = routine1;

    let routineDaysAgo1= new CalendarUser();
    routineDaysAgo1.dayRoutine = daysAgo1;
    routineDaysAgo1.routineName = 'Mi rutina 1';
    routineDaysAgo1.estadoDeAnimo = 'Bien';
    routineDaysAgo1.routine = routine1;

    let routineDaysAgo2 = new CalendarUser();
    routineDaysAgo2.dayRoutine = daysAgo2;
    routineDaysAgo2.routineName = 'Mi rutina 2';
    routineDaysAgo2.estadoDeAnimo = 'Bien';
    routineDaysAgo2.routine = routine1;
    
    let routineDaysAgo3 = new CalendarUser();
    routineDaysAgo3.dayRoutine = daysAgo3;
    routineDaysAgo3.routineName = 'Mi rutina 3';
    routineDaysAgo3.estadoDeAnimo = 'Regular';
    routineDaysAgo3.routine = routine2;

    let routineDaysAgo4 = new CalendarUser();
    routineDaysAgo4.dayRoutine = daysAgo4;
    routineDaysAgo4.routineName = 'Mi rutina 4';
    routineDaysAgo4.estadoDeAnimo = 'Mal';
    routineDaysAgo4.routine = routine2;

    let routineDaysAgo5 = new CalendarUser();
    routineDaysAgo5.dayRoutine = daysAgo5;
    routineDaysAgo5.routineName = 'Mi rutina 5';
    routineDaysAgo5.estadoDeAnimo = 'No realizada';
    routineDaysAgo5.routine = routine2;
    
    let routineDayAgo1 = new CalendarUser();
    routineDayAgo1.dayRoutine = daysAgo2;
    routineDayAgo1.routineName = 'Mi rutina 6';
    routineDayAgo1.estadoDeAnimo = 'No realizada';
    routineDayAgo1.routine = routine1;

    component.calendarUser.push(routineToday);
    component.calendarUser.push(routineToday2);
    component.calendarUser.push(routineToday3);
    component.calendarUser.push(routineDaysAgo1);
    component.calendarUser.push(routineDaysAgo2);
    component.calendarUser.push(routineDaysAgo3);
    component.calendarUser.push(routineDaysAgo4);
    component.calendarUser.push(routineDaysAgo5);
    component.calendarUser.push(routineDayAgo1);
  });
  
  it('should create calendar with dates', () => {
    expect(component.calendarUser.length).toEqual(9);
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

  it('should select routines with day is daysAgo1 return 1 routine', () => {

    component.onSelection(daysAgo1);

    expect(component.dateSelected).toMatch('Rutinas programadas para el día:');
    expect(component.routinesSelected.length).toEqual(1);
    expect(component.routinesSelected[0].nameRoutine).toEqual('Mi rutina 1');
    expect(component.routinesSelected[0].estadoDeAnimo).toEqual('Bien');
  });

  it('should select routines with day is daysAgo2 return 2 routine', () => {

    component.onSelection(daysAgo2);

    expect(component.dateSelected).toMatch('Rutinas programadas para el día:');
    expect(component.routinesSelected.length).toEqual(2);
  });

  it('should select Todas in opinion return 9 opinions', () => {
    
    let event = { opinion: 'Todas'};
    component.filterRoutinesEstado(event);
    expect(component.calendar.specialDates.length).toEqual(9);
  });

  it('should select opinion Bien return 2 days', () => {
    
    let event = { opinion: 'Bien'};
    component.filterRoutinesEstado(event);
    expect(component.calendar.specialDates.length).toEqual(2);
  });

  it('should select opinion Regular return 1 days', () => {
    
    let event = { opinion: 'Regular'};
    component.filterRoutinesEstado(event);
    expect(component.calendar.specialDates.length).toEqual(1);
  });

  it('should select opinion Mal return 1 days', () => {
    
    let event = { opinion: 'Mal'};
    component.filterRoutinesEstado(event);
    expect(component.calendar.specialDates.length).toEqual(1);
  });

  it('should select opinion No realizada return 2 days', () => {
    
    let event = { opinion: 'No realizada'};
    component.filterRoutinesEstado(event);
    expect(component.calendar.specialDates.length).toEqual(2);
  });
  
  it('Filtering routine Todas return all days', () => {
    
    component.selectedRoutine(0);
    expect(component.calendar.specialDates.length).toEqual(9);
  });
  
  it('if routine 1 is filtered return 6 days', () => {
    
    component.selectedRoutine(1);
    expect(component.calendar.specialDates.length).toEqual(6);
  });

  it('if routine 2 is filtered return 3 days', () => {
    
    component.selectedRoutine(2);
    expect(component.calendar.specialDates.length).toEqual(3);
  });
  
});