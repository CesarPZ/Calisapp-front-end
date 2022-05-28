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

  addRoutine(nameRoutine:string, exercises:number[], daysRoutine:number[], weeksRoutine:number) {
    let userLogged = this.staticData.getUserLogged();

    return this.http.post<any>(this.staticData.getUrlBase()+"api/createRoutine"+"?"+
                                "userId="+userLogged+
                                "&nameRoutine="+nameRoutine+
                                "&excersices="+exercises+
                                "&daysRoutine="+daysRoutine+
                                "&weeksRoutine="+weeksRoutine, 
                                this.httpOptions);
  }

  createRouitneFromWithExercise(nameNewRoutine: string, idExercises: number[], dayNumberSelectedInRoutine: number[], weeksRoutine: number, dayExercise: Map<any,any>) {
    let userLogged = this.staticData.getUserLogged();
    let httpOptions2 = {};
    dayExercise.forEach((val: string, key: string) => {
      httpOptions2[key] = val;
    });

    return this.http.post<any>(this.staticData.getUrlBase()+"api/createRoutineExercise"+"?"+
                                "userId="+userLogged+
                                "&nameRoutine="+nameNewRoutine+
                                "&excersices="+idExercises+
                                "&daysRoutine="+dayNumberSelectedInRoutine+
                                "&weeksRoutine="+weeksRoutine, 
                                httpOptions2);
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
