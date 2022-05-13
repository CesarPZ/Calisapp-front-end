import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Routine } from 'src/app/model/routine';
import { TitleAccordionComponent } from './title-accordion.component';


describe('TitleAccordionComponent', () => {
  let component: TitleAccordionComponent;
  let fixture: ComponentFixture<TitleAccordionComponent>;
  let routine = new Routine();
  routine.nameRoutine = 'Mi nueva rutina';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleAccordionComponent ],
      imports:[ HttpClientModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleAccordionComponent);
    component = fixture.componentInstance;
    component.routine = routine;
    fixture.detectChanges();
  });

  it('routinesOpenDetail with default is false', () => {
    expect(component.routinesOpenDetail).toEqual(false);
  });

  it('hope the routine is added to the list', () => {
    fixture.detectChanges();
    const treeNodeElement: HTMLElement = fixture.nativeElement.querySelector('#button1');
    treeNodeElement.click();

    expect(component.routinesOpenDetail).toEqual(true);
  });

  it('hope the routine is remove to the list', () => {
    fixture.detectChanges();
    const treeNodeElement: HTMLElement = fixture.nativeElement.querySelector('#button1');
    treeNodeElement.click();

    fixture.detectChanges();
    const treeNodeElement2: HTMLElement = fixture.nativeElement.querySelector('#button2');
    treeNodeElement2.click();

    expect(component.routinesOpenDetail).toEqual(false);
  });

});