import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/app/Views/config';
import { UsersComponent } from 'src/app/Viewss/users/users.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private userComponent:UsersComponent,private http:HttpClient) { }

  getComponanyName():Observable<config>{
    return this.http.get<config>("http://localhost:8080/config/get")
  }

}
