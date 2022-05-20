import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AdminService } from 'src/app/services/Admin_service/admin.service';
import { ProductServiceService } from 'src/app/services/product_service/product-service.service';

@Component({
  selector: 'app-pro-print-latout',
  templateUrl: './pro-print-latout.component.html',
  styleUrls: ['./pro-print-latout.component.css']
})
export class ProPrintLatoutComponent implements OnInit{
  data:any
  cname:any
  date:any
  constructor(private productservice:ProductServiceService) { }
  

  ngOnInit(): void {
    this.cname = this.productservice.cname
    console.log("cname",this.cname)
    this.data = this.productservice.sendData
    var date1 = new Date()
    this.date = date1.toLocaleDateString('en-CA')
    console.log(this.data)
    this.productservice.onDataReady();
  }
  

 


}
