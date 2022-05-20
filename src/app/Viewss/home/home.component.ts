import { Component,OnInit} from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js'
import { Color,Label } from 'ng2-charts';
import { CartegoryService } from 'src/app/services/category_service/cartegory.service';
import { ProductServiceService } from 'src/app/services/product_service/product-service.service';
import { SalesServiceService } from 'src/app/services/sales_service/sales-service.service';
import { StoreserviceService } from 'src/app/services/store_service/storeservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  numOfCat:any =0
  numOfPro:any =0
  totalStore:any =0
  totalSales:any =0
  constructor(
    private salesService:SalesServiceService,
    private productService:ProductServiceService,
    private categoryService:CartegoryService,
    private storeService:StoreserviceService) { }


  banners:any = [{title:"Category",numb: this.numOfCat},{title:"Products",numb: this.numOfPro},{title:"Store",numb: this.totalStore},{title:"Sales",numb: this.totalSales}]

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Sales' },
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'green',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType:ChartType = 'line';

 
  getTotalSale(){
    this.salesService.getTotalSales().subscribe((res:any) =>{
      this.totalSales =res
      this.productService.getProductNum().subscribe((proNum:any) =>{
        this.numOfPro = proNum
        this.categoryService.getCategoryNum().subscribe((catNum:any)=>{
          this.numOfCat = catNum
          this.storeService.getTotalStore().subscribe((store) =>{
            this.totalStore = store
            this.banners = [
              {
                title:
                  "Category",
                numb: this.numOfCat
              },
              {
                title:
                  "Products",
                numb: this.numOfPro
              },
              {
                title:
                "Store",
                src: this.totalStore
              },
              {
                title:
                  "Sales",
                numb: this.totalSales
              }
            ];
          })
        })
      })
    })
  }

  ngOnInit(): void {
    this.getTotalSale()
  }
}
