import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  Url='https://calisapp-backend.herokuapp.com/';

  getAllExercise(){  
    return this.http.get<any>(this.Url+"api/exercises");
  }

  getAllExerciseToRoutine(idRoutine: number){  
    return this.http.get<any>(this.Url+"api/exercisesRoutine/"+idRoutine);
  }

  editExercise(ejercicio:Exercise) {
    var idExercises = ejercicio.id;
    var series = ejercicio.series;
    var repetitions = ejercicio.repetitions;
    
    return this.http.post<any>(this.Url+"api/editExercise/"+idExercises+"?"+
                                  "series="+series+
                                  "&repetitions="+repetitions, 
                                  this.httpOptions);
  }
}
