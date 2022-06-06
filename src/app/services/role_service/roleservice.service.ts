import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/Viewss/users/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleserviceService {

  constructor(private http:HttpClient) { }

  Addrole(body:any){
    return this.http.post("http://localhost:8081/role/post",body)
  }

  getRoles():Observable<Role[]>{
    return this.http.get<Role[]>("http://localhost:8081/role/get")
  }

  getById(id:number):Observable<Role>{
    return this.http.get<Role>("http://localhost:8081/role/"+id)
  }

  updateRole(body:any){
    return this.http.put("http://localhost:8081/role/edit",body)
  }
}
