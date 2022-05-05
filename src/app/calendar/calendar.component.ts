import { Component, OnInit, ViewChild } from '@angular/core';
import { DateRangeType, IgxCalendarComponent } from 'igniteui-angular';
import { CalendarUser } from '../model/calendar-user';
import { CalendarUserService } from '../service/calendar-user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
 
export class CalendarComponent implements OnInit{
  
  constructor( private calendarUserService: CalendarUserService) { }

  @ViewChild('calendar', { static: true }) public calendar: IgxCalendarComponent;
  public today = new Date(Date.now());

  calendarUser:CalendarUser[]=[];
  currentDate:CalendarUser= new CalendarUser();

  public ngOnInit() {
    let specialDay = [];
    this.calendarUserService.getAllExerciseToUser(1)
      .subscribe(data => {
        this.calendarUser = data;
        this.calendar.specialDates = [];
        for(var calendar of data){
          let range = [
            new Date(calendar.dateRoutine),
            new Date(calendar.dateRoutine)
          ];
          this.calendar.specialDates.push({ 
            type: DateRangeType.Between, dateRange: range });
        }
      });
  }

  public onSelection(date: Date) {
    let dia1 = new CalendarUser();
    //dia1.des = date.toDateString();
    
    this.currentDate = dia1;
  }
}
