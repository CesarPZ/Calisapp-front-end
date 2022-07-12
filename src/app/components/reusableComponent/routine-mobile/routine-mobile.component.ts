import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from 'src/app/model/exercise';
import { Routine } from 'src/app/model/routine';

@Component({
  selector: 'app-routine-mobile',
  templateUrl: './routine-mobile.component.html',
  styleUrls: ['./routine-mobile.component.css']
})
export class RoutineMobileComponent implements OnInit {
  
  @Input() routine:     Routine | undefined;
  routinesOpenDetail:boolean = false;
  exercisePosition:number = 0;
  nextRoutineOrFinish:string = "Siguiente Ejercicio";
  exerciseSelect:Exercise;
  
  constructor() { }

  ngOnInit(): void {
    if(this.routine.exercises.length == this.exercisePosition+1){
      this.nextRoutineOrFinish = "Finalizar Rutina";
    }
    this.exerciseSelect = this.routine.exercises[this.exercisePosition];
  }

  setOpenDetail(status:boolean){
    this.routinesOpenDetail = status;
  }

  getOpenDetail(){
    return this.routinesOpenDetail;
  }

  nextExercise(){
    var ejercicios = this.routine.exercises;
    this.exercisePosition = this.exercisePosition +1;

    if(ejercicios.length <= this.exercisePosition+1){
      this.nextRoutineOrFinish = "Finalizar Rutina";
    }
    if(ejercicios.length >= this.exercisePosition+1){
      this.exerciseSelect = this.routine.exercises[this.exercisePosition];
    }
  }
  
  nextRoutine(){
    var ejercicios = this.routine.exercises;
    return ejercicios.length > this.exercisePosition;
  }

  daysRoutine(rutina:Routine){
    let dias = new Set<number>();
    for(var exercise of rutina.exercises){
      dias.add(exercise.dayExercise);
    }
    let myArray: number[] = Array.from(dias).sort((n1,n2) => n1 - n2);
    
    return myArray;
  }
}
