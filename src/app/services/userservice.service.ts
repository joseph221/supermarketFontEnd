import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../Views/config';
import { User } from '../Viewss/users/User';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  uid:any
  constructor(private http: HttpClient) { }

  getAll():Observable<User[]>{
    return this.http.get<User[]>("http://localhost:8081/user/get");
  }

  add(body:object){
    return this.http.post("http://localhost:8081/user/post",body);
  }

  getById(id:number){
    return this.http.get(`${"http://localhost:8081/user"}/${id}`)
  }

  update(body: object){
    return this.http.put("http://localhost:8081/user/put",body)
  }
  
  delete(id:number){
    return this.http.get(`${"http://localhost:8081/user/delete"}/${id}`)
  }

  getConfig():Observable<config>{
    return this.http.get<config>("http://localhost:8081/config/get")
  }

  changeCofig(body:any){
    return this.http.post("http://localhost:8081/config/post",body)
  }
  getAllConfig():Observable<config[]>{
    return this.http.get<config[]>("http://localhost:8081/config/getAll")
  }

  login(username:String,password:String){
    return this.http.get("http://localhost:8081/user/login/uname/"+username+"/pass/"+password)
  }

  confirm(currentpass:any){
    return this.http.get("http://localhost:8081/user/confirm/"+currentpass)
  }

  changePassword(newpass:any,id:any){
    return this.http.get("http://localhost:8081/user/changepassword/"+newpass+"/id/"+id)
  }
}
