import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http:HttpClient) { }

  Url='https://calisapp-backend.herokuapp.com/';

  getAllExercise(){  
    return this.http.get<any>(this.Url+"api/exercises");
  }
}
