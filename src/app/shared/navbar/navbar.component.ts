import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { UserService } from '../../service/user.service'
import { StaticDataService } from 'src/app/service/static-data.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];

    constructor(public user: UserService,
                public location: Location,
                private router: Router,
                private staticData: StaticDataService,
                private deviceService: DeviceDetectorService) {
    }

    ngOnInit() {
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else
               window.scrollTo(0, 0);
       }
     });
     this.location.subscribe((ev:PopStateEvent) => {
         this.lastPoppedUrl = ev.url;
     });
     this.user.hide();
    }

    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '#/home' ) {
            return true;
        }
        else {
            return false;
        }
    }

    logout(){
        this.user.hide();
        
        localStorage.removeItem('id');    
        this.router.navigate(['home']);
    } 

    userLogued(){
     return this.staticData.getUserLogged();   
    }

    userProfile(){
        this.router.navigate(['/user-profile'])
            .then(() => {
                window.location.reload();
        });
    }

    navbarClass(){
        const isMobile = this.deviceService.isMobile();
        var navbar =  'navbar-collapse collapse';
        if(isMobile){
            navbar = 'collapse'
        }
        return navbar;
    }
}
