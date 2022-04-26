import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Routine } from '../model/routine';
import { Exercise } from '../model/exercise';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  Url='https://calisapp-backend.herokuapp.com/';

  getRoutines(){  
    return this.http.get<any>(this.Url+"api/routines");
  }

  getRoutinesWithLevel(level:String){  
    return this.http.get<any>(this.Url+"api/routine/"+level);
  }

  addRoutine(idUser:number, nameRoutine:string, exercises:number[]) {

    return this.http.post<any>(this.Url+"api/createRoutine"+ "?"+
                                "userId="+idUser+
                                "&nameRoutine="+nameRoutine+
                                "&excersices="+exercises, 
                                this.httpOptions);
  }

  getARoutineOfUser(idUser: number) {
    return this.http.get<any>(this.Url+"api/routineUser/"+idUser);
  }
}
