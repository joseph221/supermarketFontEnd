import { AfterContentChecked, AfterViewInit, Component, NgModule, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product_service/product-service.service';
import { ReceiptServiceService } from 'src/app/services/receipt_service/receipt-service.service';
import { product } from '../products/product';
import { Receipt } from '../receipt/Receipt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit,AfterViewInit,AfterContentChecked{
  convertedImage:any
  price:number;
  receipt: Receipt;
  pcode:any;
  pqty:number;
  receiptData: Receipt[];
  receiptNo = 970;
  total:number;
  total1 = 0;
  product:product;
  purchasedProduct:product[]=[];

  constructor(private procuctservice:ProductServiceService,
    private receiptservice:ReceiptServiceService,) { 
    
  }
  ngAfterViewInit(): void {
    
  }

  ngAfterContentChecked()  {
    this.getTotal1();
   this.total =this.getTotal();
  }

  getTotal():number{
    var total = 0;
    if (Array.isArray(this.purchasedProduct)) {
      this.purchasedProduct.forEach(element => {
        total = total + element.qty*element.price;
       });
    }
    return total;
  }
  getTotal1(){
   
    if (this.pqty == undefined) {
      this.total1 = this.price
    } else {
      this.total1 = this.price * this.pqty
    }
    
  }


  ngOnInit(): void {
    
    //this.receiptNo = this.getRandomInt();
    const $btnPrint = document.querySelector("#btnPrint");
    $btnPrint.addEventListener("click", () => {
    window.print();
  });
  }

  getRandomInt() {
    return Math.floor(Math.random()*(1000-100 +1))+100
  }
  
  fetch(){
    console.log(this.pcode)
    this.procuctservice.getByProduct(this.pcode,1,"joseph",this.receiptNo ).subscribe(data=>{
      this.product = data;
      console.log(this.product)
      if (this.checkIfExist(this.product.producode) == true) {
        this.purchasedProduct.find(item => item.producode == this.pcode).qty++
      } else {
        this.purchasedProduct.push(this.product);
      }
      this.price = data.price
      this.convertedImage = 'data:image/jpg;base64,' + data.picByte
  
    })
  }

  fetchqty(){
    this.purchasedProduct.find(item => item.producode == this.pcode).qty = this.pqty
    this.clear()
  }

  save(){
    
    if (this.purchasedProduct.length !== 0) { 
      this.receiptservice.addreceipt(this.purchasedProduct).subscribe(response =>{
        this.clear()
        this.purchasedProduct=[];
        this.receiptNo = this.getRandomInt();
        Swal.fire('','Saved','success')
      })
    }
    Swal.fire('','incomplete records','error')
  }
  clear(){
    this.pcode = null;
    this.pqty = null
  }
  checkIfExist(producode:string){
    var isPresent:Boolean;
    this.purchasedProduct.some(item => {
      isPresent = item.producode === producode
    })
    return isPresent
  }
  removePro(details){
    this.purchasedProduct.splice( this.purchasedProduct.findIndex(a =>
       a.producode === details.id) , 1)
  }

}