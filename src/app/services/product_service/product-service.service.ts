import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { product } from 'src/app/Viewss/products/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http:HttpClient) { }

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
