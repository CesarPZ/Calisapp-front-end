import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { BaseFormUser } from '../utils/base-form-user';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  hide = true;
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private service: UserService, public loginForm: BaseFormUser) {}

  user: User = new User();
  errorMessage = "";

  ngOnInit() {
    this.service.hide();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.loginForm.baseForm.reset();
  }

  register(): void {
    if (this.loginForm.baseForm.invalid) {
      return;
    }

    const formValue = this.loginForm.baseForm.value;
    this.subscription.add(
      this.service.createUser(formValue).subscribe((response) => {
        console.log(response.status);
          if (response) {
            localStorage.setItem("id", response.id.toString());
            //localStorage.setItem("role", "ROLE_USER"); 
            this.service.show();
            this.router.navigate(['home']);
          }
        },
        (error: HttpErrorResponse) => {
          console.log('error');
          console.log(this.errorMessage);
          console.log(formValue.mail);
          this.errorMessage = "El usuario con el email: \n " + formValue.mail + " ya existe!!!"
        })
    );
    this.errorMessage = "";
  }

  checkField(field: string): boolean {
    return this.loginForm.isValidField(field);
  }
}
