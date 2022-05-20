import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AdminService } from 'src/app/services/Admin_service/admin.service';
import { ProductServiceService } from 'src/app/services/product_service/product-service.service';

@Component({
  selector: 'app-pro-print-latout',
  templateUrl: './pro-print-latout.component.html',
  styleUrls: ['./pro-print-latout.component.css']
})
export class ProPrintLatoutComponent implements OnInit,OnChanges {
  data:any
  cname:string
  constructor(private productservice:ProductServiceService,private company:AdminService) { }
  ngOnChanges(changes: SimpleChanges): void {
   
  }

  ngOnInit(): void {
    this.data = this.productservice.sendData
    this.company.getComponanyName().subscribe((res:any) =>{
      this.cname = res
    })
    console.log(this.data)
    this.productservice.onDataReady();
  }

 


}
