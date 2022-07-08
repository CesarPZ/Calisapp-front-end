import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { BaseFormUser } from '../../utils/base-form-user';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(private service: UserService,
              public updateForm: BaseFormUser,
              private spinner: NgxSpinnerService) { }

  user: User=new User();
  messageAlert = "";
  errorMessage = "";

  ngOnInit() {
    this.spinner.show();
    this.service.getUserId()
      .subscribe(data => {
        this.user = data;
        this.spinner.hide();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.updateForm.baseForm.reset();
  }

  update(): void {
    if (this.updateForm.baseForm.invalid) {
      return;
    }
      const formValue = this.updateForm.baseForm.value;
      this.subscription.add(this.service.updateUser(formValue).subscribe(
        (data) => {
          this.user=data;
          this.messageAlert = " El usuario ha sido actualizado de manera correcta!"
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = "Ingresó mal los datos"
        }
      ));
  }

  checkField(field: string): boolean {
    return this.updateForm.isValidField(field);
  }
}