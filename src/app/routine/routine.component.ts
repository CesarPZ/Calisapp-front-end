import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private service: RoutineService) { }
  
  routines:Routine[];
  routinesForLevel:Routine[];
  routine:Routine;

  ngOnInit():void{
  }

  getRoutinesWithLevel(level:String):void{
    console.log(level);
    this.service.getRoutinesWithLevel(level)
      .subscribe(data => {
        this.routinesForLevel = data;
        
        for(var d of this.routinesForLevel){
          console.log(d);
          this.routine = d;
          for(var e of d.exercises){
            
            console.log(e.processExercise.urlVideo);
          }
        }
      });
  }

}
