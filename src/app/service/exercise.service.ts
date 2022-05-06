import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise';
import { StaticDataService } from './static-data.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http:HttpClient,
              private staticData: StaticDataService) { }

  getAllExercise(){  
    return this.http.get<any>(this.staticData.getUrlBase()+"api/exercisesApp");
  }

  getAllExerciseToRoutine(idRoutine: number){
    return this.http.get<any>(this.staticData.getUrlBase()+"api/exercisesRoutine/"+idRoutine);
  }

  editExercise(ejercicio:Exercise) {
    var idExercises = ejercicio.id;
    var series = ejercicio.series;
    var repetitions = ejercicio.repetitions;
    
    return this.http.post<any>(this.staticData.getUrlBase()+
                                    "api/editExercise/"+idExercises+"?"+
                                    "series="+series+
                                    "&repetitions="+repetitions, 
                                    this.httpOptions);
  }
}
