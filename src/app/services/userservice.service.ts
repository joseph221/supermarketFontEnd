import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../Views/config';
import { User } from '../Viewss/users/User';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) { }

  getAll():Observable<User[]>{
    return this.http.get<User[]>("http://localhost:8080/user/get");
  }

  add(body:object){
    return this.http.post("http://localhost:8080/user/post",body);
  }

  getById(id:number){
    return this.http.get(`${"http://localhost:8080/user"}/${id}`)
  }

  update(body: object){
    return this.http.put("http://localhost:8080/user/put",body)
  }
  
  delete(id:number){
    return this.http.get(`${"http://localhost:8080/user/delete"}/${id}`)
  }

  getConfig():Observable<config>{
    return this.http.get<config>("http://localhost:8080/config/get")
  }

  changeCofig(body:any){
    return this.http.post("http://localhost:8080/config/post",body)
  }
  getAllConfig():Observable<config[]>{
    return this.http.get<config[]>("http://localhost:8080/config/getAll")
  }
}
