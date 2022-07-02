import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Routine } from 'src/app/model/routine';

@Component({
  selector: 'app-title-mobile',
  templateUrl: './title-mobile.component.html',
  styleUrls: ['./title-mobile.component.css']
})
export class TitleMobileComponent implements OnInit  {
  
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
