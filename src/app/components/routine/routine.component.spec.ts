/*import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RoutineComponent } from './routine.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { RoutineService } from 'src/app/service/routine.service';
import { Router } from '@angular/router';
import { StaticDataService } from 'src/app/service/static-data.service';
import { HttpClient } from '@angular/common/http';

describe('RoutineComponent', () => {
  let component: RoutineComponent;
  let fixture: ComponentFixture<RoutineComponent>;
  let router:Router;
  let service:RoutineService;
  let modalService:NgbModal;
  let spinner:NgxSpinnerService;
  let httpClient:HttpClient;
  let staticDataService:StaticDataService;

  beforeEach(waitForAsync(() => {
   // service = new RoutineService(httpClient, staticDataService);
    //component = new RoutineComponent(Router,RoutineService,NgbModal,NgxSpinnerService);
    TestBed.configureTestingModule({
      imports: [  ],
      declarations: [ RoutineComponent ],
      providers: [ { provider: Router, useClass: router },
                    { provider: RoutineService, useClass: service },
                    { provider: NgbModal, useClass: modalService },
                    { provider: NgxSpinnerService, useClass: spinner } ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(RoutineComponent);
      component = fixture.componentInstance;
    });

  }));
  
  it('should create the app', waitForAsync(() => {
    let weekdays: Map<any,any>= new Map();
    weekdays.set(1, "Lunes");
    weekdays.set(2, "Martes");
    weekdays.set(3, "Miercoles");
    weekdays.set(4, "Jueves");
    weekdays.set(5, "Viernes");
    weekdays.set(6, "Sabado");
    weekdays.set(7, "Domingo");

    let values = component.getValues(weekdays);
    expect(values.length).toEqual(7);
  }));
});*/