import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private service: UserService) { }

  user: User=new User();
  
  ngOnInit() {
    this.service.getUserId()
      .subscribe(data => {
        this.user = data;
      });
  }
}
