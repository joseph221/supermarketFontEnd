import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TableColumns } from 'src/app/shared/table/tableColumns';
import { Category } from '../../model/Cetegory';
import * as XLSX from 'xlsx'; 
import { CartegoryService } from 'src/app/services/category_service/cartegory.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {

  fileName = "categories.xlsx"
  loading:Boolean
  category: Category[];   
  categoryTableColumns: TableColumns[];

  mode={
    crudeMode: "create",
    data: null
  } 
  
  constructor(private categoryService:CartegoryService,private router: Router,private matDailog:MatDialog) { }
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
    this.getCategory();
  }

  ngOnInit(): void {
    this.initializeColumns();
    this.getCategory();
  }

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.category = this.category.sort((a: Category, b: Category) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.category = this.category.sort((a: Category, b: Category) => b[keyName].localeCompare(a[keyName]));
    } else {
      return this.getCategory();
    }
  }

  removeItem(id:number) {
    this.categoryService.delete(id) .subscribe(()=> {
      this.getCategory();
    });
   
    console.log(id);
  }
  editCategory(id:number){
    this.categoryService.getById(id).subscribe(result =>{
        this.mode ={
          ...this.mode,
          crudeMode:"update",
          data:result
        }
    })
  }

  initializeColumns(): void {
    this.categoryTableColumns = [
      {
        name: 'Category Name',
        dataKey: 'categoryName',
        position: 'right',
        isSortable: false
      }
    ];
  }

  getCategory(){
    this.loading = true;
    this.categoryService.getCategories().subscribe(data =>{
     this.category = data
      this.loading = false
    },(error:HttpErrorResponse) =>{
      this.loading = false
    })
  }

  createCategory(){
    //this.router.navigateByUrl("/addProduct");
    
  }
}
