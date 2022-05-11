import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/Viewss/categories/model/Cetegory';

@Injectable({
  providedIn: 'root'
})
export class CartegoryService {

  constructor(private http:HttpClient) { }

  getCategories():Observable<Category[]>{
   return this.http.get<Category[]>("http://localhost:8080/category/get");
  }
  add(body:object){
    return this.http.post("http://localhost:8080/category/post",body);
  }

  getById(id:number){
    return this.http.get("http://localhost:8080/category/"+id)
  }

  update(body: object){
    return this.http.put("http://localhost:8080/category/put",body)
  }

  delete(id:number){
    return this.http.delete("http://localhost:8080/category/delete/"+id);
  }

  getCategoryNum(){
    return this.http.get("http://localhost:8080/category/categonum");
  }
}
