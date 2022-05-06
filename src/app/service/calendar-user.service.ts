import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarUserService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  Url='https://calisapp-backend.herokuapp.com/';
  
  getAllExerciseToUser(idUser: number){  
    return this.http.get<any>(this.Url+"api/calendarUser/"+idUser);
  }
}
