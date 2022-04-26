import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise } from '../model/exercise';
import { ExerciseService } from '../service/exercise.service';
import { RoutineService } from '../service/routine.service';

@Component({
  selector: 'app-routine-generated',
  templateUrl: './routine-generated.component.html',
  styleUrls: ['./routine-generated.component.css']
})
export class RoutineGeneratedComponent implements OnInit {

  constructor(private router:Router, 
              private serviceExercise: ExerciseService,
              private serviceRoutine: RoutineService) { }

  allExercise:Exercise[];
  exerciseSelected:Exercise[] = [];
  nameNewRoutine: string;

  ngOnInit(): void {
    this.serviceExercise.getAllExercise()
      .subscribe(data => {
        this.allExercise = data;
      });
  }

  addExerciseToRoutine(ejercicio:Exercise){
    this.exerciseSelected.push(ejercicio);
  }

  removeExerciseToRoutine(ejercicio:Exercise){
    const index: number = this.exerciseSelected.indexOf(ejercicio);
    if (index !== -1) {
        this.exerciseSelected.splice(index, 1);
    }
  }

  isSelected(ejercicio:Exercise){
    return !this.exerciseSelected.includes(ejercicio);
  }

  createRoutine(){
    var idExercises:number[] = []; 
    for(var e of this.exerciseSelected){
      console.log(e.id);
      idExercises.push(e.id);
    }

    let resp = this.serviceRoutine.addRoutine(1, this.nameNewRoutine, idExercises);
    resp.subscribe((response) => {
      console.log(response);
      this.router.navigate(['myRoutine']);
    });
  }
}
