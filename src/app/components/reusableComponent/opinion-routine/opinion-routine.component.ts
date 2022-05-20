import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Routine } from 'src/app/model/routine';
import { RoutineService } from 'src/app/service/routine.service';

@Component({
  selector: 'app-opinion-routine',
  templateUrl: './opinion-routine.component.html',
  styleUrls: ['./opinion-routine.component.css']
})
export class OpinionRoutineComponent implements OnChanges {
  
  @Input() routine:       Routine | undefined;
  @Input() message:       string  | undefined;
  @Input() disabledStar:  boolean = false;
  
  form: FormGroup;

  constructor(private serviceRoutine: RoutineService, 
              private fb: FormBuilder) { }

  ngOnChanges(): void {
    if(this.existRoutinesSelected()){
      this.form = this.fb.group({
        rating: [this.routine.opinion, Validators.required],
      })
    }else{
      this.form = this.fb.group({
        rating: ['', Validators.required],
      })
    }
  }

  updateOpinionRoutine(){
    var opinonPoints = this.form.get('rating').value;
    this.serviceRoutine.setOpinionRoutine(this.routine.id, opinonPoints)
      .subscribe(data => {});
  }

  existRoutinesSelected(){
    return this.routine != null && this.routine.id != 0;
  }
}
