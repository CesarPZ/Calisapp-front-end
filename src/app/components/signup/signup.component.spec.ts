import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return invalid form due to missing password data', () => {
    const form = component.loginForm.baseForm;
    const mail = component.loginForm.baseForm.controls['mail']
    const name = component.loginForm.baseForm.controls['name']

    mail.setValue('mailTest@gmail.com')
    name.setValue('test')

    expect(form.invalid).toBeTrue();
  });

  it('should return invalid form due to missing mail data', () => {
    const form = component.loginForm.baseForm;
    const name = component.loginForm.baseForm.controls['name']
    const password = component.loginForm.baseForm.controls['password']

    name.setValue('test')
    password.setValue('12345678')

    expect(form.invalid).toBeTrue();
  });

  it('should return valid form', () => {
    const form = component.loginForm.baseForm;
    const mail = component.loginForm.baseForm.controls['mail']
    const name = component.loginForm.baseForm.controls['name']
    const password = component.loginForm.baseForm.controls['password']

    mail.setValue('mailTest@gmail.com')
    name.setValue('test')
    password.setValue('12345678')

    expect(form.valid).toBeTrue();
  });
});