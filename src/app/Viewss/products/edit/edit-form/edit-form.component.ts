import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product_service/product-service.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit{

  update={
    crudeMode:"update",
    product:null
  }

  constructor(@Inject(MAT_DIALOG_DATA)private data:any,
  private productService:ProductServiceService,
  private router:Router) { }

  ngOnInit(): void {
    this.getByCode()
  }

  getByCode(){
    const code = this.data
    this.productService.getByCode(code).subscribe(res =>{
      this.update={
        ...this.update,
        product:res
      }
    })
  }

  onSaved(){
    this.router.navigateByUrl("/product")
  }
 
}
