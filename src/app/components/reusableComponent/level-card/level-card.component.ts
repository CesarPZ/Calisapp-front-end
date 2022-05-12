import { Component, Input, OnInit } from '@angular/core';
import { RoutineComponent } from '../../routine/routine.component';

@Component({
  selector: 'app-level-card',
  templateUrl: './level-card.component.html',
  styleUrls: ['./level-card.component.css']
})
export class LevelCardComponent implements OnInit {

  @Input() nivelName:   string  | undefined;
  @Input() description: string  | undefined;
  @Input() icon:        string  | undefined;
  @Input() colorCard:   string  | undefined;
  @Input() level:       string  | undefined;
  
  constructor(private routineComponent:RoutineComponent) { }

  ngOnInit(): void {
  }

  getRoutinesWithLevel(){
    this.routineComponent.getRoutinesWithLevel(this.level,'Rutinas de ' + this.nivelName + ':');
  }
}
