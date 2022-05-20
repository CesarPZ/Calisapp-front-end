import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { StaticDataService } from './static-data.service';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient,
              private staticData: StaticDataService) { }
  
  getRoutines(){  
    return this.http.get<any>(this.staticData.getUrlBase()+"api/routines");
  }

  getRoutinesWithLevel(level:string){  
    return this.http.get<any>(this.staticData.getUrlBase()+"api/routine/"+level);
  }

  addRoutine(nameRoutine:string, exercises:number[], daysRoutine:number[], weeksRoutine:number, routineByLevel:Boolean) {
    let userLogged = this.staticData.getUserLogged();

    return this.http.post<any>(this.staticData.getUrlBase()+"api/createRoutine"+"?"+
                                "userId="+userLogged+
                                "&nameRoutine="+nameRoutine+
                                "&excersices="+exercises+
                                "&daysRoutine="+daysRoutine+
                                "&weeksRoutine="+weeksRoutine+
                                "&routineByLevel="+routineByLevel, 
                                this.httpOptions);
  }

  getARoutineOfUser() {
    let userLogged = this.staticData.getUserLogged();
    return this.http.get<any>(this.staticData.getUrlBase()+"api/routineUser/"+userLogged);
  }

  deleteRoutine(idRoutine: number) {
    let userLogged = this.staticData.getUserLogged();
    return this.http.get<any>(this.staticData.getUrlBase()+"api/deleteRoutine/"+idRoutine+"?"+
                                "&idUser="+userLogged, 
                                this.httpOptions);
  }

  setOpinionRoutine(idRoutine: number, opinonPoints: number) {
    let userLogged = this.staticData.getUserLogged();
    return this.http.put<any>(this.staticData.getUrlBase()+"api/generateOpinion/?"+
                                "&routineId="+idRoutine +
                                "&opinion="+opinonPoints,
                                this.httpOptions);
  }

}
