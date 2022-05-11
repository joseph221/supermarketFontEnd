import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  create={
    crudeMode:"create",
    product:null
  } 

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onSaved(){
    this.router.navigateByUrl("/product")
  }
}
