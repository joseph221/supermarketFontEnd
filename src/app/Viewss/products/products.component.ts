import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product_service/product-service.service';
import { TableColumns } from 'src/app/shared/table/tableColumns';
import { product } from './product';
import * as XLSX from 'xlsx';  
import { MatDialog } from '@angular/material/dialog';
import { AddproductComponent } from './Add_product/addproduct/addproduct.component';
import { EditFormComponent } from './edit/edit-form/edit-form.component';
import { CartegoryService } from 'src/app/services/category_service/cartegory.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/Admin_service/admin.service';
import { config } from 'src/app/Views/config';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  fileName = "products.xlsx"
  loading:Boolean
  product: product[];   
  productTableColumns: TableColumns[];
  category:any[];
  categoryForm: FormGroup;
  companySetings:config

  
  constructor(private productservice: ProductServiceService,
    private router: Router,private matDailog:MatDialog,private categoryservice:CartegoryService
    ,private company:AdminService) { }
  ExportTOExcel() {  
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
  }

  applyFilter() {
   console.log(this.categoryForm.value)
   this.productservice.filterByCatId(this.categoryForm.value.cat_id).subscribe((res:any) =>{
     this.product = res
   })
    
  }
  formConfiguration(){
    this.categoryForm = new FormGroup({
      categoryName: new FormControl(null,[Validators.required]),
      cat_id:new FormControl(null,[Validators.required])
    });
  }
  
  getCategory(){
    this.categoryservice.getCategories().subscribe(res =>{
      this.category = res
    })
  }

  ngOnInit(): void {
    this.formConfiguration();
    this.initializeColumns();
    this.getCompanySettings()
    this.getProduct();
    this.getCategory();
  }


  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.product = this.product.sort((a: product, b: product) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.product = this.product.sort((a: product, b: product) => b[keyName].localeCompare(a[keyName]));
    } else {
      return this.getProduct();
    }
  }
  
  sender(){
    this.productservice.sendData=this.product;
    this.productservice.cname = this.companySetings?.company_name
    
    
  }
  getCompanySettings(){
    this.company.getComponanyName().subscribe((res) =>{
      this.companySetings = res
    })
  }

  navigate(){
    this.router.navigateByUrl("product-print")
  }
  removeItem(code:String) {
    this.productservice.delete(code) .subscribe(()=> {
      this.getProduct();
  });
   
    console.log(code);
  }
  editProduct(code:String){
    const updateData ={
      data:code,
      width:'50%'

    }
    const dialogRef =this.matDailog.open(EditFormComponent,updateData);
    dialogRef.afterClosed().subscribe(result =>{
      this.ngOnInit();
    })
    
  }

  initializeColumns(): void {
    this.productTableColumns = [
      {
        name: 'Product Code',
        dataKey: 'producode',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Item Name',
        dataKey: 'itemName',
        position: 'right',
        isSortable: false
      },
      {
        name: 'Cost',
        dataKey: 'cost',
        position: 'right',
        isSortable: false
      },
      
      {
        name: 'Price',
        dataKey: 'price',
        position: 'right',
        isSortable: false
      },
      {
        name: 'Unit of Mesurement',
        dataKey: 'uom',
        position: 'right',
        isSortable: false
      },
    ];
  }

  getProduct(){
    this.loading = true;
    this.productservice.getProduct().subscribe(data =>{
      this.product = data;
      this.loading = false
    },(error:HttpErrorResponse) =>{
      this.loading = false
    })
  }

  createProduct(){
    //this.router.navigateByUrl("/addProduct");
    const dialogConfig = {
      width: '50%'
    }
    const dialogRef =this.matDailog.open(AddproductComponent,dialogConfig)
    dialogRef.afterClosed().subscribe(result =>{
      this.ngOnInit()
    })
  }
}
