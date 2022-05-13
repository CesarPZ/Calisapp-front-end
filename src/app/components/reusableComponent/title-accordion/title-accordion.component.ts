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
  
  routinesOpenDetail:boolean=false;

  constructor() { }

  ngOnInit(): void { }

  setOpenDetail(status:boolean){
    this.openDetails.emit(status);
    this.routinesOpenDetail = status;
  }
}
