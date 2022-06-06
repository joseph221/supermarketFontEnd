import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from 'src/app/Viewss/store/Store';

@Injectable({
  providedIn: 'root'
})
export class StoreserviceService {
  sendData:any[]
  cname:string
  constructor(private http:HttpClient,private router:Router) { }

  onDataReady() {
    this.router.navigateByUrl("store-print").then(()=>{
      window.print();
    this.router.navigateByUrl("store")
 
    })
  }
  getTotalStore(){
    return this.http.get("http://localhost:8081/store/amount")
  }

  delete(id:number){
    return this.http.delete(""+id)
  }

  getById(id:number){
    return this.http.get(""+id)
  }

  getBycode(code:string):Observable<Store>{
    return this.http.get<Store>("http://localhost:8081/store?producode="+code)
  }

  create(body:Store){
    return this.http.post("http://localhost:8081/store/post",body)
  }

  getStore(){
    return this.http.get("http://localhost:8081/store/get")
  }
}
