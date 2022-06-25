import { Component, OnInit } from '@angular/core';
import { CalendarUser } from 'src/app/model/calendar-user';
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
          let routine = new Routine();
          routine.exercises = calendar.exercises;
          routine.nameRoutine = calendar.routineName;
          routine.daySelected = calendar.exerciseNumberDayRoutine;
          routine.idCalendar = calendar.idCalendarUser;
          routine.estadoDeAnimo = calendar.estadoDeAnimo;
          this.routinesToday.push(routine);
        }
        console.log(this.routinesToday);
        console.log(this.routinesToday[0]);
        console.log(this.routinesToday[0].exercises[0]);
        this.exerciseSelect = this.routinesToday[0].exercises[this.exercisePosition];
      })

      
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
