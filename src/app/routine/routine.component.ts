import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routine } from '../model/routine';
import { RoutineService } from '../service/routine.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-routine',
    templateUrl: './routine.component.html',
    styleUrls: ['./routine.component.scss']
})

export class RoutineComponent implements OnInit {
  focus: any;
  focus1: any;
  closeResult: string;
  
  constructor(private router:Router, 
              private service: RoutineService,
              private modalService: NgbModal) { }
  
  routinesForLevel:Routine[];

  ngOnInit():void{
  }

  getRoutinesWithLevel(level:String):void{
    this.service.getRoutinesWithLevel(level)
      .subscribe(data => {
        this.routinesForLevel = data;
      });
  }
  
  initRoutine(rutina:Routine, content){
    var idExercises:number[] = []; 
    for(var e of rutina.exercises){
      console.log(e.id);
      idExercises.push(e.id);
    }

    let resp = this.service.addRoutine(1, rutina.nameRoutine, idExercises);
    resp.subscribe((response) => {
      console.log(response);
      this.routinesForLevel = [];
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
