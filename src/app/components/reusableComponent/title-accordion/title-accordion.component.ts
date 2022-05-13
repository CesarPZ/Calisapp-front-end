import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Routine } from 'src/app/model/routine';

@Component({
  selector: 'app-title-accordion',
  templateUrl: './title-accordion.component.html',
  styleUrls: ['./title-accordion.component.css']
})
export class TitleAccordionComponent implements OnInit {
  
  @Input() routine:     Routine | undefined;
  @Input() colorText: string    = 'white';
  
  @Output() openDetails = new EventEmitter();
  
  routinesOpenDetail:Routine[]=[];

  constructor() { }

  ngOnInit(): void { }

  setOpenDetail(routine:Routine, status:boolean){
    this.openDetails.emit(status);
    if(status){
      this.routinesOpenDetail.push(routine);
    }else{
      const index:number = this.routinesOpenDetail.indexOf(routine);

      if (index !== -1) {
          this.routinesOpenDetail.splice(index, 1);
      }
    }
  }

  getOpenDetail(){
    return this.routinesOpenDetail.includes(this.routine);
  }
}
