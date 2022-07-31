import { Component, OnInit } from '@angular/core';
import { StoreserviceService } from 'src/app/services/store_service/storeservice.service';

@Component({
  selector: 'app-storeprintlayout',
  templateUrl: './storeprintlayout.component.html',
  styleUrls: ['./storeprintlayout.component.css']
})
export class StoreprintlayoutComponent implements OnInit {
  data:any
  cname:any
  date:any
  total:number=0
  constructor(private storeservice:StoreserviceService) { }

  ngOnInit(): void {
    this.cname = this.storeservice.cname
    console.log("cname",this.cname)
    this.data = this.storeservice.sendData
    this.data.forEach((element:any) => {
      this.total += element.amount
    });
    var date1 = new Date()
    this.date = date1.toLocaleDateString('en-CA')
    console.log(this.data)
    this.storeservice.onDataReady();
  }

}
