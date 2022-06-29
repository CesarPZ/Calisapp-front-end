import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { BaseFormUser } from '../../utils/base-form-user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  constructor(private service: UserService,
              public updateForm: BaseFormUser
              ) { }

  user: User=new User();
  messageAlert = "";
  errorMessage = "";

  ngOnInit() {
    this.service.getUserId()
      .subscribe(data => {
        this.user = data;
      });
  }

  update (user:User){
    if (this.updateForm.baseForm.invalid) {
      return;
    }
      //const formValue = this.updateForm.baseForm.value;
      this.service.updateUser(user)
      .subscribe(data=>{
        this.user=data;
        this.messageAlert = " El usuario ha sido actualizado de manera correcta!"
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = "Ingresó mal los datos"
      }
    );
    this.errorMessage = "";
  }

  checkField(field: string): boolean {
    return this.updateForm.isValidField(field);
  }
}