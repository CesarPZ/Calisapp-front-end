import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { User } from '../model/user'
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
    httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  Url='https://calisapp-backend.herokuapp.com/';

  getUsers(){
    return this.http.get<User[]>(this.Url+'/api/users');
  }

  createUser(user:User): Observable<any>{
    return this.http.post<any>(this.Url+'/api/users/register?name='+user.name+
                                                            '&mail='+user.mail+
                                                            '&password='+user.password,
                                                            this.httpOptions);
  }

  login(user:User): Observable<any>{
    return this.http.post<any>(this.Url+'/api/users/login?mail='+user.mail+
                                                 '&password='+user.password, 
                                                 this.httpOptions);
  }
  
  getUserId(id:number){
    return this.http.get<User>(this.Url+'/api/users/'+id);
  }

  updateUser(user:User){
    return this.http.put<User>(this.Url+'/api/users/'+user.id+
                                        '?name='+user.name+
                                        '&password='+user.password
                                        ,user);
  }

  deleteUser(user:User){
    return this.http.delete<User>(this.Url+'/api/users/'+user.id, this.httpOptions);
  }

  visible: boolean = true;

  hide() { this.visible = false }

  show() { this.visible = true }
}
