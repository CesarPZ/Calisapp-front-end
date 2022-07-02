import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from 'src/app/model/exercise';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exercise-information-mobile',
  templateUrl: './exercise-information-mobile.component.html',
  styleUrls: ['./exercise-information-mobile.component.css']
})
export class ExerciseInformationMobileComponent implements OnInit {
  
  @Input() exercise:   Exercise  | undefined;
  @Input() colorStyle: string    = 'white';
  closeResult: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {     
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  styleCard(){
    return {color: this.colorStyle};
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

  urlVideoExercise(){
    return "https://www.youtube.com/watch?v=" + this.exercise.processExercise.urlVideo;
  }
}