import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  url='https://calisapp-backend.herokuapp.com/';
  //url='http://localhost:8080/';
  userLogged = localStorage.getItem("id");

  constructor() { }
  
  getUrlBase(){
    return this.url;
  }

  getUserLogged(){
    return localStorage.getItem("id");
  }
}
  