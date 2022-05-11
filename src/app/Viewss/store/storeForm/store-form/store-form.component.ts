import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product_service/product-service.service';
import { StoreserviceService } from 'src/app/services/store_service/storeservice.service';
import { Storee } from '../../Store';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.css']
})
export class StoreFormComponent implements OnInit {
  price = 0
  pqty:number;
  pcode:string;
  min:number;
  control= true
  store:Storee
  constructor(private procuctservice:ProductServiceService,
    private storeServce:StoreserviceService,
    private dialogRef:MatDialogRef<StoreFormComponent>) { }

  ngOnInit(): void {
  }
  getCode(){

      this.storeServce.getBycode(this.pcode).subscribe(res =>{
        this.procuctservice.getByCode(this.pcode).subscribe(res2=>{
          this.price = res2.price
          if(res.minimum_qty >0){
            this.control = false
          }
          console.log(res)
        })
      })
      
  }

  save(){
    console.log(this.min)
    this.store = new Storee(this.price,this.pcode,this.pqty,this.min)
    console.log(this.store)
      this.storeServce.create(this.store).subscribe(response =>{
        this.clear()
        this.dialogRef.close()
        Swal.fire('','Saved','success')
      })
  }
  clear(){
    this.pcode = null;
    this.pqty = null
    this.price = null
  }
}
