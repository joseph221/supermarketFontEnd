import { Component,OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup,} from '@angular/forms';
import { SalesServiceService } from 'src/app/services/sales_service/sales-service.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit{
  salesReport:any[]
  configForm:FormGroup
  constructor(private saleservice:SalesServiceService) { }


  ngOnInit(): void {
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
    var theDate2 = new Date(this.configForm.value.secondDate)
    const localDate2 = theDate2.toLocaleDateString('en-CA')
    this.saleservice.filter(localDate1,localDate2).subscribe((res:any )=>{
      this.salesReport = res
    })
  }

  getAllsales(){
    this.saleservice.getAll().subscribe((res:any)=>{
      this.salesReport = res
    })
  }
  
}
