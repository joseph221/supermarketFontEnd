import { Component } from '@angular/core';
import { ProductServiceService } from './services/product_service/product-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tryFont';

  constructor(public printService: ProductServiceService) { }
  
}
