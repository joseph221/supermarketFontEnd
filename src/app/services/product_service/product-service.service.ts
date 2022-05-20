import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { product } from 'src/app/Viewss/products/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  sendData:any[]
  isPrinting=false
  constructor(private http:HttpClient,private router:Router) { }

  onPrint(){
    this.isPrinting = true
    this.router.navigateByUrl("print")
  }

  onDataReady() {
    this.router.navigateByUrl("print").then(()=>{
      window.print();
    this.isPrinting = false
    this.router.navigateByUrl("product")
 
    })
    
  }

  getProduct():Observable<product[]>{
    return this.http.get<product[]>("http://localhost:8080/proList/get");
  }

  getByProduct(code:string,qt:number,cashierNam:string,receiptNo:number):Observable<product>{
    return this.http.get<product>("http://localhost:8080/proList?producode="+ code)
    .pipe(map((data:product) => data = { ...data,qty:qt,cashierName:cashierNam,receiptNo:receiptNo}))
  }

  delete(code:String){
    return this.http.delete("http://localhost:8080/proList/delete/"+code);
  }

  getByCode(id:String):Observable<product>{
    return this.http.get<product>("http://localhost:8080/proList?producode="+id)
  }

  update(body: object){
    return this.http.put("http://localhost:8080/proList/put",body)
  }

  add(body:any){
    return this.http.post("http://localhost:8080/proList/post",body);
  }
  getProductNum(){
    return this.http.get("http://localhost:8080/proList/pronum");
  }


}
