import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { User } from '../model/user'
import { Observable} from 'rxjs';
import { StaticDataService } from './static-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient,
              private staticData: StaticDataService) { }

  getUsers(){
    return this.http.get<User[]>(this.staticData.getUrlBase()+'api/users');
  }

  createUser(user:User): Observable<any>{
    return this.http.post<any>(this.staticData.getUrlBase()+
                                    'api/users/register?name='+user.name+
                                    '&mail='+user.mail+
                                    '&password='+user.password,
                                    this.httpOptions);
  }

  login(user:User): Observable<any>{
    return this.http.post<any>(this.staticData.getUrlBase()+
                                    'api/users/login?mail='+user.mail+
                                    '&password='+user.password, 
                                    this.httpOptions);
  }
  
  getUserId(){
    let userLogged = this.staticData.getUserLogged();
    return this.http.get<User>(this.staticData.getUrlBase()+'api/users/'+userLogged);
  }

  updateUser(user:User){
    return this.http.put<User>(this.staticData.getUrlBase()+'api/users/'+user.id+
                                                          '?name='+user.name+
                                                          '&password='+user.password
                                                          ,user);
    }

  deleteUser(user:User){
    return this.http.delete<User>(this.staticData.getUrlBase()+
                                      'api/users/'+user.id, 
                                      this.httpOptions);
  }

  visible: boolean = true;
  hide() { this.visible = false }
  show() { this.visible = true }
}
