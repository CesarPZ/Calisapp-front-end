import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Routine } from 'src/app/model/routine';
import { CalendarUserService } from 'src/app/service/calendar-user.service';

@Component({
  selector: 'app-opinion-mobile',
  templateUrl: './opinion-mobile.component.html',
  styleUrls: ['./opinion-mobile.component.css']
})
export class OpinionMobileComponent implements OnInit {

  @Input() opinonToday:   string  = '';
  @Input() disable:      boolean  =  true;
  @Output() opinionSelected = new EventEmitter<{opinion:string}>();
  @Input() routine:     Routine | undefined;
  
  estadoDeAnimoDia:string;

  constructor(private calendarUserService: CalendarUserService) { }

  ngOnInit(): void {
    this.estadoDeAnimoDia = this.routine.estadoDeAnimo;
  }

  estadoDeAnimo(opinion: string){
    console.log(opinion);
    console.log(this.routine.idCalendar);
    this.estadoDeAnimoDia = opinion;
    this.calendarUserService.setOpinionDay(opinion, this.routine.idCalendar)
    .subscribe(data => {})
  }

  estadoSeleccionado(estado){
    //this.estadoDeAnimoDia = this.routine.estadoDeAnimo;
    return this.disable && 
      (this.estadoDeAnimoDia != null && 
        this.estadoDeAnimoDia != '' && 
        this.estadoDeAnimoDia != estado);
  }
}
