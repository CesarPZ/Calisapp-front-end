import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyRoutineComponent } from './my-routine.component';
import { HttpClientModule } from '@angular/common/http'; 
import { RoutineService } from 'src/app/service/routine.service';

describe('MyRoutineComponent', () => {
  let component: MyRoutineComponent;
  let fixture: ComponentFixture<MyRoutineComponent>;
  let routineService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ HttpClientModule ],
      declarations: [ MyRoutineComponent ],
      providers: [ { provider: RoutineService, useValue: routineService} ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});