import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { By } from '@angular/platform-browser'

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return invalid form due to missing password data', () => {
    const form = component.loginForm.baseForm;
    const mail = component.loginForm.baseForm.controls['mail']
    mail.setValue('mailTest@gmail.com')

    expect(form.invalid).toBeTrue();
  });

  it('should return invalid form due to missing mail data', () => {
    const form = component.loginForm.baseForm;
    const password = component.loginForm.baseForm.controls['password']

    password.setValue('12345678')

    expect(form.invalid).toBeTrue();
  });

  it('should return valid form', () => {
     const form = component.loginForm.baseForm;
     const mail = component.loginForm.baseForm.controls['mail']
     const password = component.loginForm.baseForm.controls['password']

     mail.setValue('mailTest@gmail.com')
     password.setValue('12345678')
 
     expect(form.valid).toBeTrue();
   });
/*
   it('login user test', () => {
    const form = component.loginForm.baseForm;
    const mail = component.loginForm.baseForm.controls['mail']
    const password = component.loginForm.baseForm.controls['password']

    mail.setValue('mailTest@gmail.com')
    password.setValue('1234')

    const btnElemnt = fixture.debugElement.query(By.css('button.btn'))
    btnElemnt.nativeElement.click()
    const testData = {'mail': 'mailTest@gmail.com', 'password': '1234'}

    expect(component.user).toEqual(testData);
  });
  */
});