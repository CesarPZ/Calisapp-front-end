import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { RoutineComponent } from './components/routine/routine.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './components/home/home.module';
import { LoginComponent } from './components/login/login.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutineService } from './service/routine.service';
import { RoutineGeneratedComponent } from './components/routine-generated/routine-generated.component';
import { MyRoutineComponent } from './components/my-routine/my-routine.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { IgxCalendarModule,	IgxDialogModule } from "igniteui-angular";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { LevelCardComponent } from './components/reusableComponent/level-card/level-card.component';
import { ExerciseInformationCardComponent } from './components/reusableComponent/exercise-information-card/exercise-information-card.component';
import { TitleAccordionComponent } from './components/reusableComponent/title-accordion/title-accordion.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SpinnerComponent } from './components/reusableComponent/spinner/spinner.component'
import { YouTubePlayerModule } from "@angular/youtube-player";
import { NgxStarRatingModule } from 'ngx-star-rating';
import { OpinionRoutineComponent } from './components/reusableComponent/opinion-routine/opinion-routine.component';
import { OpinionDayComponent } from './components/reusableComponent/opinion-day/opinion-day.component';
import { RoutineTodayComponent } from './components/routine-today/routine-today.component';
import { ExerciseInformationMobileComponent } from './components/reusableComponent/exercise-information-mobile/exercise-information-mobile.component';
import { TitleMobileComponent } from './components/reusableComponent/title-mobile/title-mobile.component';
import { RoutineMobileComponent } from './components/reusableComponent/routine-mobile/routine-mobile.component';
import { OpinionMobileComponent } from './components/reusableComponent/opinion-mobile/opinion-mobile.component';

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
    MyRoutineComponent,
    LevelCardComponent,
    ExerciseInformationCardComponent,
    TitleAccordionComponent,
    FilterPipe,
    SpinnerComponent,
    OpinionRoutineComponent,
    OpinionDayComponent,
    RoutineTodayComponent,
    ExerciseInformationMobileComponent,
    TitleMobileComponent,
    RoutineMobileComponent,
    OpinionMobileComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    NgxSpinnerModule,
    IgxCalendarModule,
    IgxDialogModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    MatTabsModule,
    YouTubePlayerModule,
    NgxStarRatingModule
  ],
  providers: [RoutineService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
