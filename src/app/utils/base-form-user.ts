import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormUser {
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = null;

  constructor(private fb: FormBuilder) {}

  baseForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    mail: ['',[Validators.required, Validators.pattern(this.isValidEmail)],],
    password: ['', [Validators.required, Validators.minLength(4)]],
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
        required: 'You must enter a value', //'Debe ingresar un valor',
        pattern: 'Not a valid email', //'No es un email valido', 
        minlength: `This field must be longer than ${minlenght} characters`, //`Este campo debe tener más de  ${minlenght} caracteres`, //`This field must be longer than ${minlenght} characters`
      };

      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }
}