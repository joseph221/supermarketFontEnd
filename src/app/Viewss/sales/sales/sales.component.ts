import { Component,OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup,} from '@angular/forms';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx'; 
import { AdminService } from 'src/app/services/Admin_service/admin.service';
import { SalesServiceService } from 'src/app/services/sales_service/sales-service.service';
import { config } from 'src/app/Views/config';
import { TableColumns } from 'src/app/shared/table/tableColumns';
import { Sales } from './Sale';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit{
  fileName = "sales.xlsx"
  loading:Boolean
  configForm:FormGroup
  from:any
  to:any
  companySettings:config
  sales:Sales[]
  salesTableColumns: TableColumns[];
  constructor(private saleservice:SalesServiceService,
    private router:Router,
    private company:AdminService) { }
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

  initializeColumns(): void {
    this.salesTableColumns = [
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
      },
      {
        name: 'RECEIPT NO',
        dataKey: 'receiptNo',
        position: 'right',
        isSortable: false
      },
      {
        name: 'DATE',
        dataKey: 'createdDate',
        position: 'right',
        isSortable: false
      }
    ];
  }

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.sales = this.sales.sort((a: Sales, b: Sales) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.sales = this.sales.sort((a: Sales, b: Sales) => b[keyName].localeCompare(a[keyName]));
    } else {
      return this.getAllsales()
    }
  }
  
  getCompanySettings(){
    this.company.getComponanyName().subscribe((res) =>{
      this.companySettings = res
    })
  }
  sender(){
    this.saleservice.cname = this.companySettings?.company_name
    this.saleservice.sendData = this.sales
    this.saleservice.from = this.from
    this.saleservice.to = this.to
  }
  navigate(){
    this.router.navigateByUrl("sales-print")
  }

  ngOnInit(): void {
    this.initializeColumns()
    this.getCompanySettings()
    this.formConfig()
    this.getAllsales()
  }

  formConfig(){
    this.configForm = new FormGroup({
      firstDate:new FormControl(''),
      secondDate:new FormControl('')
    })
  }
  
  fiter(){
    console.log(this.configForm.value.firstDate)
    var theDate1 =new Date(Date.parse(this.configForm.value.firstDate));
    const localDate1 = theDate1.toLocaleDateString('en-CA')
    this.from = localDate1
    var theDate2 = new Date(this.configForm.value.secondDate)
    const localDate2 = theDate2.toLocaleDateString('en-CA')
    this.to = localDate2
    this.saleservice.filter(localDate1,localDate2).subscribe((res:any )=>{
      this.sales = res
    })
  }

  getAllsales(){
    this.loading=true
    this.saleservice.getAll().subscribe((res:any)=>{
      this.sales = res
      this.loading= false
    })
    this.loading =false
  }
  
}
