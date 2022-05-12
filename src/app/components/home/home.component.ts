import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    model = {
        left: true,
        middle: false,
        right: false
    };

    focus;
    focus1;
    constructor(public user: UserService,) { }

    ngOnInit() {}
}
