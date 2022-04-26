import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise } from '../model/exercise';
import { Routine } from '../model/routine';
import { RoutineService } from '../service/routine.service';

@Component({
    selector: 'app-routine',
    templateUrl: './routine.component.html',
    styleUrls: ['./routine.component.scss']
})

export class RoutineComponent implements OnInit {
  focus: any;
  focus1: any;

  constructor(private router:Router, 
              private service: RoutineService) { }
  
  routinesForLevel:Routine[];

  ngOnInit():void{
  }

  getRoutinesWithLevel(level:String):void{
    this.service.getRoutinesWithLevel(level)
      .subscribe(data => {
        this.routinesForLevel = data;
      });
  }
  
  initRoutine(rutina:Routine){
    var idExercises:number[] = []; 
    for(var e of rutina.exercises){
      console.log(e.id);
      idExercises.push(e.id);
    }

    let resp = this.service.addRoutine(1, rutina.nameRoutine, idExercises);
    resp.subscribe((response) => {
      console.log(response);
      this.router.navigate(['myRoutine']);
    });
  }

}
