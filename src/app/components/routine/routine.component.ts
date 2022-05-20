import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routine } from '../../model/routine';
import { RoutineService } from '../../service/routine.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Exercise } from '../../model/exercise';

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
  tabSelected: Map<any,any>= new Map();
  routinesOpenDetail:number[]=[];

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

  getRoutinesWithLevel(level:string, levelString:string):void{
    this.spinner.show();
    this.service.getRoutinesWithLevel(level)
      .subscribe(data => {
        this.routinesForLevel = data;
        this.levelRoutines = levelString;
        this.spinner.hide();
      });
  }

  selectValue(selectedDays, routine:Routine){
    this.daySelectedInRoutine.set(routine.id, selectedDays);
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
    return this.validationValueWeeks(routine) && 
            this.daySelectedInRoutine.get(routine.id) != null && 
            this.daySelectedInRoutine.get(routine.id).length != 0;
  }

  daysRoutine(rutina:Routine){
    let dias = new Set<number>();
    for(var exercise of rutina.exercises){
      dias.add(exercise.dayExercise);
    }
    let myArray: number[] = Array.from(dias).sort((n1,n2) => n1 - n2);
    
    return myArray;
  }

  exercisesRou(routine:Routine, day){
    var exerciseDay:Exercise[] = [];
    for(var ex of routine.exercises){
      if(ex.dayExercise == day){
        exerciseDay.push(ex);
      }
    }
    return exerciseDay;
  }

  tabSelectedRoutine(rutina:Routine, dia){
    this.tabSelected.set(rutina.id, dia);
  }

  initRoutine(rutina:Routine, content){
    this.spinner.show();
    var idExercises:number[] = [];
    var weeksRoutine = this.weeksRoutine.get(rutina.id);
    var daysRoutine:number[] = [];
    this.weekdays.forEach((value:string, key:number) => {
      if(this.daySelectedInRoutine.get(rutina.id).includes(value)){
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

  setOpenDetail(routine:Routine, status:boolean){
    if(status){
      this.routinesOpenDetail.push(routine.id);
    }else{
      const index:number = this.routinesOpenDetail.indexOf(routine.id);

      if (index !== -1) {
          this.routinesOpenDetail.splice(index, 1);
      }
    }
  } 

  getOpenDetail(routine:Routine){
    return this.routinesOpenDetail.includes(routine.id);
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
