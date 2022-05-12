import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { RoutineComponent } from './components/routine/routine.component';
import { LoginComponent } from './components/login/login.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { RoutineGeneratedComponent } from './components/routine-generated/routine-generated.component';
import { MyRoutineComponent } from './components/my-routine/my-routine.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'register',         component: SignupComponent },
    { path: 'routine',          component: RoutineComponent },
    { path: 'routineGenerated', component: RoutineGeneratedComponent },
    { path: 'myRoutine',        component: MyRoutineComponent },
    { path: 'login',            component: LoginComponent },
    { path: 'calendar',         component: CalendarComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
