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
}
