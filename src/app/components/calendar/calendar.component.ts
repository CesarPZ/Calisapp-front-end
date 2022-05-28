import { Component, OnInit, ViewChild } from '@angular/core';
import { DateRangeType, IgxCalendarComponent } from 'igniteui-angular';
import { CalendarUser } from '../../model/calendar-user';
import { Exercise } from '../../model/exercise';
import { Routine } from '../../model/routine';
import { CalendarUserService } from '../../service/calendar-user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
 
export class CalendarComponent implements OnInit{
  calendarUser:CalendarUser[]=[];
  currentDate:CalendarUser= new CalendarUser();
  routinesSelected:Routine[]=[];
  routineIsUpdate:number[]=[];
  routinesOpenDetail:Routine[]=[];
  namesRoutines:Map<any,any>= new Map();
  nameRoutineSelected:string = 'Todas';
  dateSelected:string='Rutinas programadas para hoy:';
  calendarStyle:string = 'calendar-wrapper';
  routineSelect:Routine;
  stateSelected:string = 'Todas';
  daySelected:Date;

  constructor( private calendarUserService: CalendarUserService) { }

  @ViewChild('calendar', { static: true }) 
  public calendar: IgxCalendarComponent;

  public ngOnInit() {
    this.calendarUserService.getAllCalendarToUser()
      .subscribe(data => {
        this.calendarUser = data;
        this.selectedRoutine(0);

        this.namesRoutines.set(0,'Todas');
        for(var calendar of data){
          this.namesRoutines.set(calendar.routine.id,calendar.routine.nameRoutine);
        }
      })
  }

  selectedRoutine(routineId:number){
    this.stateSelected = 'Todas';
    this.calendar.specialDates = [];
    let routineSelected;
    let now = new Date();
    let todayOrSelect = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    for(var calendar of this.calendarUser){
      if(routineId == 0 || routineId == calendar.routine.id){
        let range = [
          new Date(calendar.dayRoutine),
          new Date(calendar.dayRoutine)
        ];
        this.calendar.specialDates.push({ 
          type: DateRangeType.Between, dateRange: range });
        routineSelected = calendar.routine;
      }
    }
    if(routineId == 0){
      this.routineSelect = null;
    }else{
      this.routineSelect = routineSelected;
    }
    this.onSelection(todayOrSelect);
  }

  onSelection(date: Date) {
    this.daySelected= date;
    let now = new Date();
    var todayOrSelect = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

    if(date.getTime() == todayOrSelect.getTime()){
      this.dateSelected ='Rutinas programadas para hoy:'
    }else{
      this.dateSelected ='Rutinas programadas para el día: ' +
                          date.getDate().toString() + '/' +
                          date.getMonth().toString() + '/' + 
                          date.getFullYear().toString() ;
    }

    this.routinesSelected = [];
    for(var calendar of this.calendarUser){
      if(new Date(calendar.dayRoutine).getTime() == date.getTime() && 
        (this.stateSelected == 'Todas' || this.stateSelected == calendar.estadoDeAnimo) ){
        let routine = new Routine();
        routine.exercises = calendar.exercises;
        routine.nameRoutine = calendar.routineName;
        routine.daySelected = calendar.exerciseNumberDayRoutine;
        routine.idCalendar = calendar.idCalendarUser;
        routine.estadoDeAnimo = calendar.estadoDeAnimo;
        this.routinesSelected.push(routine);
      }
    }
  }

  currentRoutineIsUpdate(routine:Routine){
    return this.routineIsUpdate.includes(routine.id);
  }

  setOpenDetail(routine:Routine, status:boolean){
    if(status){
      this.routinesOpenDetail.push(routine);
    }else{
      const index:number = this.routinesOpenDetail.indexOf(routine);

      if (index !== -1) {
          this.routinesOpenDetail.splice(index, 1);
      }
    }
  }

  getOpenDetail(routine:Routine){
    return this.routinesOpenDetail.includes(routine);
  }

  closeAlertIsUpdated(routine:Routine){
    const index: number = this.routineIsUpdate.indexOf(routine.id);

    if (index !== -1) {
        this.routineIsUpdate.splice(index, 1);
    }
  }

  daysRoutine(rutina:Routine){
    let dias = new Set<number>();
    for(var exercise of rutina.exercises){
      dias.add(exercise.dayExercise);
    }
    let myArray: number[] = Array.from(dias).sort((n1,n2) => n1 - n2);
    
    return myArray;
  }
  
  exercisesRou(routine:Routine, day){
    var exerciseDay:Exercise[] = [];
    for(var ex of routine.exercises){
      if(ex.dayExercise == day){
        exerciseDay.push(ex);
      }
    }
    return exerciseDay;
  }

  estadoDeAnimo(estado, routinesSelected){
    let now = new Date();
    let todayOrSelect = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    if(this.daySelected == todayOrSelect){
      this.calendarUserService.setOpinionDay(estado.opinion, routinesSelected.idCalendar)
      .subscribe(data => {})
    }
    
  }

  calculateEstadoDeAnimoToday(rou: Routine){
    return rou.estadoDeAnimo;
  }

  filterRoutinesEstado(estadoDeAnimo){
    let estado = estadoDeAnimo.opinion;
    this.calendar.specialDates = [];
    let now = new Date();
    let todayOrSelect = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    for(var calendar of this.calendarUser){
      console.log(calendar.estadoDeAnimo);
      console.log(estado);
      if(calendar.estadoDeAnimo == estado ||  estado == 'Todas'){
        let range = [
          new Date(calendar.dayRoutine),
          new Date(calendar.dayRoutine)
        ];
        this.calendar.specialDates.push({ 
          type: DateRangeType.Between, dateRange: range });
      }
    }
    this.stateSelected = estado;
    this.onSelection(todayOrSelect);
  }

  haveviewEstado(){
    let now = new Date();
    let todayOrSelect = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    return todayOrSelect >= this.daySelected;
  }
}
