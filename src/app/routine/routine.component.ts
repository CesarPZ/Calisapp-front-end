import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routine } from '../model/routine';
import { RoutineService } from '../service/routine.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: 'app-routine',
    templateUrl: './routine.component.html',
    styleUrls: ['./routine.component.css']
})

export class RoutineComponent implements OnInit {
  focus: any;
  focus1: any;
  closeResult: string;
  levelRoutines: string;
  routinesForLevel:Routine[];
  weekdays: Map<any,any>= new Map();
  daySelectedInRoutine: Map<any,any>= new Map();
  weeksRoutine: Map<any,any>= new Map();

  constructor(private router:Router, 
              private service: RoutineService,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService) { }
  
  ngOnInit():void { 
    this.weekdays.set(1, "Lunes");
    this.weekdays.set(2, "Martes");
    this.weekdays.set(3, "Miercoles");
    this.weekdays.set(4, "Jueves");
    this.weekdays.set(5, "Viernes");
    this.weekdays.set(6, "Sabado");
    this.weekdays.set(7, "Domingo");
  }

  getValues(map){
    return Array.from(map.values());
  }

  getRoutinesWithLevel(level:String, levelString:string):void{
    this.spinner.show();
    this.service.getRoutinesWithLevel(level)
      .subscribe(data => {
        this.routinesForLevel = data;
        this.levelRoutines = levelString;
        this.spinner.hide();
      });
  }
  
  selectValue(dia:string, routine:Routine){
    this.daySelectedInRoutine.set(routine.id, dia);
  }

  getValuesdaySelectedInRoutine(routine:Routine){
    return (this.daySelectedInRoutine.get(routine.id) != null) ? 
            this.daySelectedInRoutine.get(routine.id):
            "Seleccione un dia";
  }

  existValueWeeksRoutine(weeks, routine:Routine){
    this.weeksRoutine.set(routine.id, weeks.target.value)
    return weeks.target.value;
  }

  validationValueWeeks(routine:Routine){
    return this.weeksRoutine.get(routine.id) != null && 
            this.weeksRoutine.get(routine.id) > 0 &&
            this.weeksRoutine.get(routine.id) <= 20;
  }

  validationDayAndNameWeeks(routine:Routine){
    return this.validationValueWeeks(routine) && this.daySelectedInRoutine.get(routine.id) != null  ;
  }

  initRoutine(rutina:Routine, content){
    this.spinner.show();
    var idExercises:number[] = [];
    var weeksRoutine = this.weeksRoutine.get(rutina.id);
    var daysRoutine:number[] = [];
    this.weekdays.forEach((value:string, key: number) => {
      if(value === this.daySelectedInRoutine.get(rutina.id)){
        daysRoutine.push(key);
      }
    });
    
    for(var e of rutina.exercises){
      idExercises.push(e.id);
    }
    let resp = this.service.addRoutine(rutina.nameRoutine, idExercises, daysRoutine, weeksRoutine, true);
    resp.subscribe((response) => {
      this.routinesForLevel = [];
      this.spinner.hide();
      this.levelRoutines = '';
      this.open(content, 'Notification', '');
    });
  }

  navigateMyRoutine(content){
    this.router.navigate(['myRoutine']);
  }

  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
        this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
        this.modalService.open(content,{ centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    
}
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
  }
}
