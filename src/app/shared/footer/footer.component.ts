import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { StaticDataService } from 'src/app/service/static-data.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    test : Date = new Date();

    constructor(private router: Router,
                private staticData: StaticDataService ) {}

    ngOnInit() {

    }
    getPath(){
      return this.router.url;
    }

    userLogued(){
      let isMyRoutineToday = this.router.url == "/myRoutineToday";
      return this.staticData.getUserLogged() && !isMyRoutineToday;   
     }
}
