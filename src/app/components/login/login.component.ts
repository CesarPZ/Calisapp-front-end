import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { BaseFormUser } from '../../utils/base-form-user';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  private subscription: Subscription = new Subscription();

  constructor(private router:Router,
    private service:UserService,
    public loginForm: BaseFormUser
    ){}

  user: User=new User();
  errorMessage = ""

  ngOnInit(){
    this.loginForm.baseForm.get('name').setValidators(null);
    this.service.hide();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.loginForm.baseForm.reset();
  }

  onLogin(): Observable<any> {
    if (this.loginForm.baseForm.invalid) {
      return;
    }

    const formValue = this.loginForm.baseForm.value;
    this.subscription.add(this.service.login(formValue).subscribe(
      (response) => {
        if (response) {
          console.log(response);
          localStorage.setItem("id",response.id.toString());
          this.service.show();
          this.router.navigate(['home']);
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = "Ingresó mal los datos"
      }
    ));

    this.errorMessage = "";
  }   

  checkField(field: string): boolean {
    return this.loginForm.isValidField(field);
  }
  
  Register(){
    this.router.navigate(["register"]);
  }
}
