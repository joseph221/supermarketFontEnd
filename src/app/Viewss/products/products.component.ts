import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product_service/product-service.service';
import { TableColumns } from 'src/app/shared/table/tableColumns';
import { product } from './product';
import * as XLSX from 'xlsx';  
import { MatDialog } from '@angular/material/dialog';
import { AddproductComponent } from './Add_product/addproduct/addproduct.component';
import { EditFormComponent } from './edit/edit-form/edit-form.component';

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
  
  constructor(private productservice: ProductServiceService,private router: Router,private matDailog:MatDialog) { }
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
  ngOnChanges(changes: SimpleChanges): void {
    
    console.log(changes)
  }

  ngOnInit(): void {
    this.initializeColumns();
    this.getProduct();
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
