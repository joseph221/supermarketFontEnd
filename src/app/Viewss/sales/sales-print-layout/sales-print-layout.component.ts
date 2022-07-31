import { Component, OnInit } from '@angular/core';
import { SalesServiceService } from 'src/app/services/sales_service/sales-service.service';

@Component({
  selector: 'app-sales-print-layout',
  templateUrl: './sales-print-layout.component.html',
  styleUrls: ['./sales-print-layout.component.css']
})
export class SalesPrintLayoutComponent implements OnInit {
  data:any
  cname:any
  date:any
  from:any
  to:any
  total:number = 0
  constructor(private salesservice:SalesServiceService) { }

  ngOnInit(): void {
    this.cname = this.salesservice.cname
    this.data = this.salesservice.sendData
    this.data.forEach((element:any) => {
      this.total += element.amount
    });
    this.from = this.salesservice.from
    this.to = this.salesservice.to
    this.salesservice.onDataReady()
  }

}
