import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receipt } from 'src/app/Viewss/receipt/Receipt';

@Injectable({
  providedIn: 'root'
})
export class ReceiptServiceService {

  constructor(private http:HttpClient) { }

  addreceipt(data:object){
    return this.http.post("http://localhost:8080/receipt/post",data);
  }

  getReceipt():Observable<Receipt[]>{
    return this.http.get<Receipt[]>("http://localhost:8080/receipt/get");
  }

  getByReceiptNo(receiptNo:number):Observable<Receipt[]>{
    return this.http.get<Receipt[]>("http://localhost:8080/receipt/"+receiptNo);
  }
}
