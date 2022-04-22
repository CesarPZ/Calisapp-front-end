import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Routine } from '../model/routine';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  constructor(private http:HttpClient) { }


  Url='https://calisapp-backend.herokuapp.com/';

  getRoutines(){  
    return this.http.get<any>(this.Url+"api/routines");
  }

}
