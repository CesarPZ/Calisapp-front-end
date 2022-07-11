import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { OpinionMobileComponent } from './opinion-mobile.component';
import { Routine } from 'src/app/model/routine';

describe('OpinionMobileComponent', () => {
  let component: OpinionMobileComponent;
  let fixture: ComponentFixture<OpinionMobileComponent>;
  let routine = new Routine();
  routine.estadoDeAnimo = "Bien";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ HttpClientModule ],
      declarations: [ OpinionMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionMobileComponent);
    component = fixture.componentInstance;
    component.routine = routine;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
