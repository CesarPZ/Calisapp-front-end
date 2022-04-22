import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routine } from '../model/routine';
import { RoutineService } from '../service/routine.service';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit {
  focus: any;
  focus1: any;

  constructor(private service: RoutineService) { }

  routine:Routine[];

  ngOnInit():void{
    this.service.getRoutines()
    .subscribe(data => {
      for(var d of data){
        console.log(d);
        for(var e of d.exercises){
          console.log(e);
        }
      }
    });
    
  }

}
