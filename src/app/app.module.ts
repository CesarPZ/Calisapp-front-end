import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { RoutineComponent } from './routine/routine.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutineService } from './service/routine.service';
import { RoutineGeneratedComponent } from './routine-generated/routine-generated.component';
import { MyRoutineComponent } from './my-routine/my-routine.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { IgxCalendarModule,	IgxDialogModule } from "igniteui-angular";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    RoutineComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    CalendarComponent,
    RoutineGeneratedComponent,
    MyRoutineComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    IgxCalendarModule,
    IgxDialogModule
  ],
  providers: [RoutineService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
