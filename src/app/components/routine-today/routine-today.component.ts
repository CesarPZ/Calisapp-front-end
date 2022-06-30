import { Component, OnInit } from '@angular/core';
import { CalendarUser } from 'src/app/model/calendar-user';
import { DayAndOpinion } from 'src/app/model/day-and-opinion';
import { Exercise } from 'src/app/model/exercise';
import { Routine } from 'src/app/model/routine';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-routine-today',
  templateUrl: './routine-today.component.html',
  styleUrls: ['./routine-today.component.css']
})
export class RoutineTodayComponent implements OnInit {
  
  calendatToday:CalendarUser= new CalendarUser();
  routinesToday:Routine[]=[];
  routinesOpenDetail:Routine[]=[];
  exerciseSelect:Exercise;
  exercisePosition:number = 0;
  
  constructor(private userService:UserService) { }

  public ngOnInit() {
    this.userService.getRoutinesToday()
      .subscribe(data => {
        this.calendatToday = data;
        for(var calendar of data){
          let diaDeRutina = this.calculateDate(calendar.dayAndOpinion);
          let routine = new Routine();
          routine.exercises = this.calculateDayExercise(calendar.routine, diaDeRutina);
          console.log(routine.exercises);  
          routine.nameRoutine = calendar.routine.nameRoutine;
          this.routinesToday.push(routine);
        }
        this.exerciseSelect = this.routinesToday[0].exercises[this.exercisePosition];
      })
  }

  calculateDayExercise(routine:Routine, diaDeRutina: any){
    let diasRoutine = new Array();
    for(var exercise of routine.exercises){
      if(!diasRoutine.includes(exercise.dayExercise)){
        diasRoutine.push(exercise.dayExercise);
      }
    }

    return this.calculateExercises(routine, diasRoutine.sort(), diaDeRutina);
  }


  calculateExercises(routine: Routine, diasRoutine: any[], dayNumberRoutine: any){
    let resp = 1;
    let exercises = new Array();
    
    if(diasRoutine.length == 1) {
			resp = diasRoutine[0];
		}else{
      let dayPosition = dayNumberRoutine;
      while(dayPosition > 0) {
        if(dayPosition <= diasRoutine.length) {
          resp = diasRoutine[dayPosition-1];
          break;
        }else {
          dayPosition = dayPosition - diasRoutine.length;
        }
      }
    }

    for(var exercise of routine.exercises){
      if(exercise.dayExercise == resp){
        exercises.push(exercise);
      }
    }
    return exercises;
  }

  calculateDate(dayAndOpinions: DayAndOpinion[]){
    let diaDeRutina;
    let now = new Date();
    var todayOrSelect = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    for(var dayAndOpinion of dayAndOpinions){
      if(todayOrSelect.getTime() == new Date(dayAndOpinion.dayOpinon).getTime()){
        diaDeRutina = dayAndOpinion.dayNumberRoutine;
      }
    }
    return diaDeRutina;
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

  nextExercise(){
    var ejercicios = this.routinesToday[0].exercises;
    this.exercisePosition = this.exercisePosition +1;
    if(ejercicios.length > this.exercisePosition){
      this.exerciseSelect = this.routinesToday[0].exercises[this.exercisePosition];
    }
  }
  nextRoutine(){
    var ejercicios = this.routinesToday[0].exercises;
    return ejercicios.length > this.exercisePosition;
  }
}
