import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TitleMobileComponent } from './title-mobile.component';
import { Routine } from 'src/app/model/routine';

describe('TitleMobileComponent', () => {
  let component: TitleMobileComponent;
  let fixture: ComponentFixture<TitleMobileComponent>;
  let routine = new Routine();
  routine.nameRoutine = 'Mi nueva rutina';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ HttpClientModule ],
      declarations: [ TitleMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleMobileComponent);
    component = fixture.componentInstance;
    component.routine = routine;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
