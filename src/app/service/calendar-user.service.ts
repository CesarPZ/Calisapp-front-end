import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StaticDataService } from './static-data.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarUserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http:HttpClient,
              private staticData: StaticDataService) { }
  
  getAllCalendarToUser(){
    let userLogged = this.staticData.getUserLogged();
    return this.http.get<any>(this.staticData.getUrlBase()+"api/calendarUser/"+userLogged);
  }

  setOpinionDay(estado: string, idCalendar: any) {
    let userLogged = this.staticData.getUserLogged();
    return this.http.put<any>(this.staticData.getUrlBase()+
                              "api/addOpinion/"+idCalendar+"?"+
                              "opinon="+estado,
                              this.httpOptions);
  }
}
