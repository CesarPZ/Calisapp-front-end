import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise } from '../model/exercise';
import { ExerciseService } from '../service/exercise.service';
import { RoutineService } from '../service/routine.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-routine-generated',
  templateUrl: './routine-generated.component.html',
  styleUrls: ['./routine-generated.component.css']
})
export class RoutineGeneratedComponent implements OnInit {
  
  closeResult: string;
  allExercise:Exercise[];
  exerciseSelected:Exercise[] = [];
  nameNewRoutine:string;
  weekdays: Map<any,any>= new Map();
  weeksRoutine:number;
  daySelectedInRoutine:string[] = [];

  constructor(private router:Router, 
              private serviceExercise: ExerciseService,
              private serviceRoutine: RoutineService,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.weekdays.set(1, "Lunes");
    this.weekdays.set(2, "Martes");
    this.weekdays.set(3, "Miercoles");
    this.weekdays.set(4, "Jueves");
    this.weekdays.set(5, "Viernes");
    this.weekdays.set(6, "Sabado");
    this.weekdays.set(7, "Domingo");
    
    this.serviceExercise.getAllExercise()
      .subscribe(data => {
        this.allExercise = data;
        this.spinner.hide();
      });
  }

  getValues(map){
    return Array.from(map.values());
  }

  addExerciseToRoutine(ejercicio:Exercise){
    this.exerciseSelected.push(ejercicio);
  }

  removeExerciseToRoutine(ejercicio:Exercise){
    const index: number = this.exerciseSelected.indexOf(ejercicio);
    if (index !== -1) {
        this.exerciseSelected.splice(index, 1);
    }
  }

  isSelected(ejercicio:Exercise){
    return !this.exerciseSelected.includes(ejercicio);
  }

  exerciseIsSelected(ejercicio:Exercise){
    if(this.exerciseSelected.includes(ejercicio)){
      return 'card-success'
    }
    return 'card-transparent';
  }

  isVisible(){
    console.log(this.daySelectedInRoutine);
    return this.nameNewRoutine!= null && 
            this.nameNewRoutine != '' && 
            this.daySelectedInRoutine.length != 0 &&
            this.validationValueWeeks() &&
            this.exerciseSelected.length > 0;
  }

  createRoutine(content){
    this.spinner.show();
    let idExercises:number[]=[];
    let dayNumberSelectedInRoutine:number[] = [];
    this.weekdays.forEach((value:string, key: number) => {
      if(this.daySelectedInRoutine.includes(value)){
        dayNumberSelectedInRoutine.push(key);
      }
    });

    for(var e of this.exerciseSelected){
      idExercises.push(e.id);
    }

    let resp = this.serviceRoutine.addRoutine(this.nameNewRoutine, idExercises, 
                                  dayNumberSelectedInRoutine, this.weeksRoutine, false);
    resp.subscribe((response) => {
      console.log(response);
      this.open(content, 'Notification', '');
      this.exerciseSelected = [];
      this.spinner.hide();
    });
  }
  getValuesdaySelectedInRoutine(){
    return (this.daySelectedInRoutine != null) ? 
            this.daySelectedInRoutine:
            "Seleccione un dia";
  }

  validationValueWeeks(){
    return this.weeksRoutine != null && 
            this.weeksRoutine > 0 &&
            this.weeksRoutine <= 20;
  }

  validationDayAndNameWeeks(){
    return this.validationValueWeeks() && this.daySelectedInRoutine != null  ;
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