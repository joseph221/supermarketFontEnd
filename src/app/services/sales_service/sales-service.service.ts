import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesServiceService {

  constructor(private http:HttpClient) { }

  getTotalSales(){
    return this.http.get("http://localhost:8080/sales/totalsales")
  }

  filter(firstDate:any,secondDate:any){
    return this.http.get("http://localhost:8080/sales/salereport/start/"+firstDate+"/end/"+secondDate)
  }

  getAll(){
    return this.http.get("http://localhost:8080/sales/get")
  }
}
