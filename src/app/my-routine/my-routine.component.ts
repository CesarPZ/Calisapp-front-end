import { Component, OnInit } from '@angular/core';
import { Routine } from '../model/routine';
import { RoutineService } from '../service/routine.service';

@Component({
  selector: 'app-my-routine',
  templateUrl: './my-routine.component.html',
  styleUrls: ['./my-routine.component.css']
})
export class MyRoutineComponent implements OnInit {

  constructor(private serviceRoutine: RoutineService) { }

  routinesUser:Routine[];
  
  ngOnInit(): void {
    this.serviceRoutine.getARoutineOfUser(1)
      .subscribe(data => {
        this.routinesUser = data;
      });
  }
}
