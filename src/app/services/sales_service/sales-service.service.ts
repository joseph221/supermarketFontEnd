import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesServiceService {
  sendData:any[]
  cname:string
  from:any
  to:any
  constructor(private http:HttpClient,private router:Router) { }

  onDataReady(){
    this.router.navigateByUrl("sales-print").then(()=>{
      window.print()
      this.router.navigateByUrl("sales")
    })
  }

  getTotalSales(){
    return this.http.get("http://localhost:8080/sales/totalsales")
  }

  filter(firstDate:any,secondDate:any){
    return this.http.get("http://localhost:8080/sales/salereport/start/"+firstDate+"/end/"+secondDate)
  }

  getAll(){
    return this.http.get("http://localhost:8080/sales/get")
  }

  getChartData(){
    return this.http.get("http://localhost:8080/sales/chart")
  }
}
