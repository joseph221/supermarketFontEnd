import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { config } from 'src/app/Views/config';
import { product } from 'src/app/Viewss/products/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  sendData:any[]
  cname:string
  
  
  constructor(private http:HttpClient,private router:Router) { 
    
  }

  onDataReady() {
    this.router.navigateByUrl("product-print").then(()=>{
      window.print();
    this.router.navigateByUrl("product")
 
    })
    
  }

  getProduct():Observable<product[]>{
    return this.http.get<product[]>("http://localhost:8081/proList/get");
  }

  getByProduct(code:string,qt:number,cashierNam:string,receiptNo:number):Observable<product>{
    return this.http.get<product>("http://localhost:8081/proList?producode="+ code)
    .pipe(map((data:product) => data = { ...data,qty:qt,cashierName:cashierNam,receiptNo:receiptNo}))
  }

  delete(code:String){
    return this.http.delete("http://localhost:8081/proList/delete/"+code);
  }

  getByCode(id:String):Observable<product>{
    return this.http.get<product>("http://localhost:8081/proList?producode="+id)
  }

  update(body: object){
    return this.http.put("http://localhost:8081/proList/put",body)
  }

  add(body:any){
    return this.http.post("http://localhost:8081/proList/post",body);
  }
  getProductNum(){
    return this.http.get("http://localhost:8081/proList/pronum");
  }

  filterByCatId(cat_id:number){
     return this.http.get("http://localhost:8081/proList/report/"+cat_id);
  }
}
