import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartegoryService } from 'src/app/services/category_service/cartegory.service';
import { ProductServiceService } from 'src/app/services/product_service/product-service.service';
import Swal from 'sweetalert2';
import { AddproductComponent } from '../../Add_product/addproduct/addproduct.component';
import { EditFormComponent } from '../../edit/edit-form/edit-form.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit,OnChanges {
  prodForm!:FormGroup;
  category:any;
  public selectedFile;
  public event1;
  imgURL:any
  
  @Input() info:{
    crudeMode: String;
    product: any;
  } 

  @Output() saved:EventEmitter<any> = new EventEmitter<any>(null);

  constructor(private categoryService:CartegoryService,
    private productService:ProductServiceService,
    private dialogRef:MatDialogRef<EditFormComponent,AddproductComponent>) { }

  ngOnChanges(changes: SimpleChanges): void {
   if(this.info.crudeMode === "update"){
     if(this.info.product != null){
      Object.keys(this.info.product).forEach((key) =>{
        if(this.prodForm.value.hasOwnProperty(key)){
          this.prodForm.get(key).setValue(this.info.product[key])
        }
      })
     }
   }
  }

  ngOnInit(): void {
    console.log(this.info)
    this.formConfiguration();
    this.getCategory()
  }
  onFileChanged(event){
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedFile = file
      const reader = new FileReader();
      reader.onload = e => this.imgURL = reader.result;

      reader.readAsDataURL(file);
  }
  }

  formConfiguration(){
    this.prodForm = new FormGroup({
      producode:new FormControl(null,[Validators.required]),
      itemName:new FormControl(null,[Validators.required]),
      brand:new FormControl(null,[Validators.required]),
      type:new FormControl(null,[Validators.required]),
      cost:new FormControl(null,[Validators.required]),
      price:new FormControl(null,[Validators.required]),
      uom:new FormControl(null,[Validators.required]),
      cat_id:new FormControl(null,Validators.required),
      imgBytes:new FormControl(null,Validators.required)
    })
  }

  getCategory(){
    this.categoryService.getCategories().subscribe(data =>{
      this.category = data;
    },(error) =>{
      Swal.fire('','something went wrong on server','error')
    })
  }

  onSave(){
    const values = new FormData
    values.append('producode',this.prodForm.value.producode)
    values.append('itemName',this.prodForm.value.itemName)
    values.append('brand',this.prodForm.value.brand)
    values.append('type',this.prodForm.value.type)
    values.append('cost',this.prodForm.value.cost)
    values.append('price',this.prodForm.value.price)
    values.append('uom',this.prodForm.value.uom)
    values.append('cat_id',this.prodForm.value.cat_id)
    values.append('imgBytes',this.selectedFile)
    if(this.info.crudeMode === "create"){
      this.productService.add(values).subscribe((response) =>{
        Swal.fire('','Saved','success')
        this.dialogRef.close()
      },(error) =>{
        Swal.fire('','something went wrong on server','error')
      })
    }else if(this.info.crudeMode === "update"){
        values ['producode'] = this.info.product.producode
      this.productService.update(values).subscribe((response) =>{
        Swal.fire('','update successiful','success')
        this.dialogRef.close()
      },(error) =>{
        Swal.fire('','something went wrong on server','error')
      })
    }
  }

}
