import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Routine } from 'src/app/model/routine';

@Component({
  selector: 'app-opinion-day',
  templateUrl: './opinion-day.component.html',
  styleUrls: ['./opinion-day.component.css']
})
export class OpinionDayComponent implements OnInit {

  @Input() opinonToday:   string  = '';
  @Input() disable:      boolean  =  true;
  @Output() opinionSelected = new EventEmitter<{opinion:string}>();

  estadoDeAnimoDia:string;

  constructor() { }

  ngOnInit(): void {
    this.estadoDeAnimoDia = this.opinonToday;
  }

  estadoDeAnimo(opinion: string){
    this.estadoDeAnimoDia = opinion;
    this.opinionSelected.emit({opinion:opinion});
  }

  estadoSeleccionado(estado){
    return this.disable && 
      (this.estadoDeAnimoDia != null && 
        this.estadoDeAnimoDia != '' && 
        this.estadoDeAnimoDia != estado);
  }
}
