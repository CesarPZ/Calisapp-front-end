import { Component, OnInit } from '@angular/core';
import { Routine } from '../../model/routine';
import { RoutineService } from '../../service/routine.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Exercise } from '../../model/exercise';
import { ExerciseService } from '../../service/exercise.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-my-routine',
  templateUrl: './my-routine.component.html',
  styleUrls: ['./my-routine.component.css']
})
export class MyRoutineComponent implements OnInit {

  closeResult: string;
  seriesExercise:number;
  repetitionsExercise:number;
  routinesUser:Routine[]=[];
  routinePermissionToModify:number[]=[];
  routineIsUpdate:number[]=[];
  routinesOpenDetail:number[]=[];
  menssageRoutineExisting: string;
  
  constructor(private serviceRoutine: RoutineService,
              private serviceExercise: ExerciseService,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService) { }


  ngOnInit(): void {
    this.spinner.show();
    this.serviceRoutine.getARoutineOfUser()
      .subscribe(data => {
        this.routinesUser = data;
        this.spinner.hide();
        if(this.routinesUser.length > 0){
          this.menssageRoutineExisting = 'Tus rutinas:';
        }else{
          this.menssageRoutineExisting = ' Actualmente no tienes ninguna rutina generada';
        }
      });
  }
  
  haveRoutine(){
    return this.routinesUser.length > 0;
  }

  enableModification(routine:Routine):void{
    this.routinePermissionToModify.push(routine.id);
  }

  getPermissionToModify(routine:Routine){
    return this.routinePermissionToModify.includes(routine.id);
  }

  modifiedExercise(classic, exercise:Exercise){
    this.seriesExercise = exercise.series;
    this.repetitionsExercise = exercise.repetitions;
    this.open(classic,'','');
  }

  validationValueSeries(){
    return this.seriesExercise != null && this.seriesExercise > 0;
  }
  
  validationValueRepetitions(){
    return this.repetitionsExercise != null && this.repetitionsExercise > 0;
  }
  
  enabledChangesExercise(){
    return !(this.validationValueSeries() && this.validationValueRepetitions());
  }

  saveChangesExercise(exerciseCurrent:Exercise){
    exerciseCurrent.series = this.seriesExercise;
    exerciseCurrent.repetitions = this.repetitionsExercise;
    this.seriesExercise = null;
    this.repetitionsExercise = null;
  }
  
  discardChanges(routine:Routine){
    this.serviceRoutine.getRoutine(routine.id)
    .subscribe(data => {
      console.log(data);
      routine.exercises = data.exercises;
    });
    
    this.closeEdition(routine);
  }

  saveRoutine(routineCurrent:Routine){
    this.closeEdition(routineCurrent);

    for(let i=0; i<routineCurrent.exercises.length; i++){
      this.serviceExercise.editExercise(routineCurrent.exercises[i])
      .subscribe(data => {
        routineCurrent.exercises[i] = data;
        if(!this.routineIsUpdate.includes(routineCurrent.id)){
          this.routineIsUpdate.push(routineCurrent.id);
        }
      });
    }
  }

  closeEdition(routine:Routine){
    const index: number = this.routinePermissionToModify.indexOf(routine.id);

    if (index !== -1) {
        this.routinePermissionToModify.splice(index, 1);
    }
  }

  currentRoutineIsUpdate(routine:Routine){
    return this.routineIsUpdate.includes(routine.id);
  }

  closeAlertIsUpdated(routine:Routine){
    console.log(routine);
    console.log(this.routineIsUpdate);
    const index: number = this.routineIsUpdate.indexOf(routine.id);

    if (index !== -1) {
        this.routineIsUpdate.splice(index, 1);
    }
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

  deleteRoutineSelect(routine:Routine){
    this.serviceRoutine.deleteRoutine(routine.id)
    .subscribe(data => {
      //this.routinesUser = data;
    });
  }

  deleteRoutine(content){
    this.open(content, 'Notification', '');
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

