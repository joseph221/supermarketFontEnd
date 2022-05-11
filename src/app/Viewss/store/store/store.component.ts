import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TableColumns } from 'src/app/shared/table/tableColumns';
import * as XLSX from 'xlsx'; 
import { Store } from '../Store';
import { StoreserviceService } from 'src/app/services/store_service/storeservice.service';
import { StoreFormComponent } from '../storeForm/store-form/store-form.component';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  fileName = "store.xlsx"
  loading:Boolean
  store: Store[];   
  storeTableColumns: TableColumns[];

  mode={
    crudeMode: "create",
    data: null
  } 
  
  constructor(private storeService:StoreserviceService,
    private router: Router,
    private matDailog:MatDialog,
   ) { }

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
    this.getStore();
  }

  ngOnInit(): void {
    this.initializeColumns();
    this.getStore();
  }

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.store = this.store.sort((a: Store, b: Store) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.store = this.store.sort((a: Store, b: Store) => b[keyName].localeCompare(a[keyName]));
    } else {
      return this.getStore();
    }
  }

  removeItem(id:number) {
    this.storeService.delete(id) .subscribe(()=> {
      this.getStore();
    });
   
    console.log(id);
  }
  editStore(id:number){
    this.storeService.getById(id).subscribe(result =>{
        this.mode ={
          ...this.mode,
          crudeMode:"update",
          data:result
        }
    })
  }

  initializeColumns(): void {
    this.storeTableColumns = [
      {
        name: 'Barcode',
        dataKey: 'producode',
        position: 'right',
        isSortable: false
      },
      {
        name: 'Product Price',
        dataKey: 'price',
        position: 'right',
        isSortable: false
      },
      {
        name: 'Quantity',
        dataKey: 'qty',
        position: 'right',
        isSortable: false
      },
      {
        name: 'Amount',
        dataKey: 'amount',
        position: 'right',
        isSortable: false
      }
    ];
  }

  getStore(){
    this.loading = true;
    this.storeService.getStore().subscribe((res:any)=>{
      this.store = res
      this.loading = false
    })
    this.loading=false
    
  }

  createStore(){
    const dialogConfig = {
      width: '50%'
    }
    const dialogRef =this.matDailog.open(StoreFormComponent,dialogConfig)
    dialogRef.afterClosed().subscribe(result =>{
      this.ngOnInit()
    })
  }
  


}
