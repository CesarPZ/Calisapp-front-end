import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from 'src/app/model/exercise';

@Component({
  selector: 'app-exercise-information-card',
  templateUrl: './exercise-information-card.component.html',
  styleUrls: ['./exercise-information-card.component.css']
})
export class ExerciseInformationCardComponent implements OnInit {
  
  @Input() exercise:   Exercise  | undefined;
  @Input() colorStyle: string    = 'white';

  constructor() { }

  ngOnInit(): void { }

  styleCard(){
    return {color: this.colorStyle};
  }
}
