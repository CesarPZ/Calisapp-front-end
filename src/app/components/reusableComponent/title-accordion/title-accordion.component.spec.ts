import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleAccordionComponent } from './title-accordion.component';


describe('TitleAccordionComponent', () => {
  let component: TitleAccordionComponent;
  let fixture: ComponentFixture<TitleAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleAccordionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
