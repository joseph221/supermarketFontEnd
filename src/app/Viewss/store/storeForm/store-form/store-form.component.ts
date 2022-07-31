import { Component, Inject, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product_service/product-service.service';
import { StoreserviceService } from 'src/app/services/store_service/storeservice.service';
import { Storee, StoreEdit } from '../../Store';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.css']
})
export class StoreFormComponent implements OnInit {
  price = 0
  pqty: number;
  pcode: string;
  min: number;
  control = true
  store: Storee
  id: number = 0
  constructor(@Inject(MAT_DIALOG_DATA) private mode: any, private procuctservice: ProductServiceService,
    private storeServce: StoreserviceService,
    private dialogRef: MatDialogRef<StoreFormComponent>) { }

  ngOnInit(): void {

    if (this.mode != null) {
      this.id = this.mode.id
      this.price = this.mode.price
      this.pcode = this.mode.producode
      this.pqty = this.mode.qty
      this.min = this.mode.minimum_qty
      console.log("from parent=>", this.id)
    }
  }
  getCode() {

    this.storeServce.getBycode(this.pcode).subscribe(res => {
      this.procuctservice.getByCode(this.pcode).subscribe(res2 => {
        this.price = res2.price
        if (res.minimum_qty > 0) {
          this.control = false
        }
        console.log(res)
      })
    })

  }

  save() {
    console.log(this.id)
    if (this.id == 0) {
      console.log("add")
      this.store = new Storee(this.price, this.pcode, this.pqty, this.min)
      console.log(this.store)
      this.storeServce.create(this.store).subscribe(response => {
        this.clear()
        this.dialogRef.close()
        Swal.fire('', 'Saved', 'success')
      })
    } else {
      console.log("update")
      this.store = new StoreEdit(this.price,this.pcode,this.pqty,this.min,this.id)
    console.log(this.store)
      this.storeServce.update(this.store).subscribe(response =>{
        this.clear()
        this.dialogRef.close()
        Swal.fire('','updated','success')
      })
    }

  }
  clear() {
    this.pcode = null;
    this.pqty = null
    this.price = null
  }
}
