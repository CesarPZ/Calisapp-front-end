import { Component, OnInit } from '@angular/core';
import { Exercise } from '../model/exercise';
import { ExerciseService } from '../service/exercise.service';

@Component({
  selector: 'app-routine-generated',
  templateUrl: './routine-generated.component.html',
  styleUrls: ['./routine-generated.component.css']
})
export class RoutineGeneratedComponent implements OnInit {

  allExercise:Exercise[];

  constructor(private serviceExercise: ExerciseService) { }

  ngOnInit(): void {
    this.serviceExercise.getAllExercise()
      .subscribe(data => {
        this.allExercise = data;
      });
  }

}
