import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise } from '../model/exercise';
import { ExerciseService } from '../service/exercise.service';
import { RoutineService } from '../service/routine.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-routine-generated',
  templateUrl: './routine-generated.component.html',
  styleUrls: ['./routine-generated.component.css']
})
export class RoutineGeneratedComponent implements OnInit {
  
  closeResult: string;
  allExercise:Exercise[];
  exerciseSelected:Exercise[] = [];
  nameNewRoutine: string;

  constructor(private router:Router, 
              private serviceExercise: ExerciseService,
              private serviceRoutine: RoutineService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.serviceExercise.getAllExercise()
      .subscribe(data => {
        this.allExercise = data;
      });
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
    return this.nameNewRoutine!= null && 
          this.nameNewRoutine != '' && 
          this.exerciseSelected.length > 0;
  }

  createRoutine(content){
    var idExercises:number[] = []; 
    for(var e of this.exerciseSelected){
      console.log(e.id);
      idExercises.push(e.id);
    }

    let resp = this.serviceRoutine.addRoutine(1, this.nameNewRoutine, idExercises);
    resp.subscribe((response) => {
      console.log(response);
      this.exerciseSelected = [];
      this.nameNewRoutine = null;
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