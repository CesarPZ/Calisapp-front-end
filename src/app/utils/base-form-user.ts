import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormUser {
  private isValidEmail = /\S+@\S+\.\S+/;
  private isValidMobileNumber = "^[0-9]+$";
  errorMessage = null;
  errorMessageMail = null;
  errorMessageName = null;
  errorMessageMobileNumber = null;

  constructor(private fb: FormBuilder) {}

  baseForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    mail: ['',[Validators.required, Validators.pattern(this.isValidEmail)],],
    password: ['', [Validators.required, Validators.minLength(4)]],
    mobileNumber: ['', [Validators.compose([Validators.pattern(this.isValidMobileNumber),
                        Validators.minLength(10), Validators.maxLength(10)])]],
  });

  isValidField(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseForm.get(field).touched || this.baseForm.get(field).dirty) &&
      !this.baseForm.get(field).valid
    );
  }

  private getErrorMessage(field: string): void {
    const { errors } = this.baseForm.get(field);

    if (errors) {
      const minlenght = errors?.minlength?.requiredLength;
      const messages = {
        required: 'Debe ingresar un valor', //'You must enter a value'
        pattern: 'No es un email valido', //'Not a valid email'
        minlength: `Este campo debe tener más de ${minlenght} caracteres`, //`This field must be longer than ${minlenght} characters`
      }; 

      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
      this.errorMessageMail = 'No es un email valido';
      this.errorMessageName = 'Debe ingresar un valor de al menos 4 caracteres';
      this.errorMessageMobileNumber = 'Debe ingresar un valor numérico de 10 caracteres';
    }
  }
}