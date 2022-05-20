import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartegoryService } from 'src/app/services/category_service/cartegory.service';
import Swal from 'sweetalert2';
import { CategorylistComponent } from '../../categoryList/categorylist/categorylist.component';


@Component({
  selector: 'app-categoryform',
  templateUrl: './categoryform.component.html',
  styleUrls: ['./categoryform.component.css']
})
export class CategoryformComponent implements OnInit,OnChanges {

  categoryForm: FormGroup;

  @Input() formData!:{
    crudeMode: String;
    data: any;
  } 

  constructor(private router:Router,private categoryService:CartegoryService,private categoryList:CategorylistComponent) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.formData.crudeMode === "update") {
      Object.keys(this.formData.data).forEach((key) =>{
        if(this.categoryForm.value.hasOwnProperty(key)){
          this.categoryForm.get(key).setValue(this.formData.data[key])
        }
      })
    }

  }

  ngOnInit(): void {
    console.log('passed from parent =>',this.formData);
    this.formConfiguration();
  }
  formConfiguration(){
    this.categoryForm = new FormGroup({
      categoryName: new FormControl(null,[Validators.required])
    });
  }

  onSave(){
    const values = this.categoryForm.value
    if(this.formData.crudeMode === "create"){
      this.categoryService.add(values).subscribe((response) =>{
      Swal.fire('','Saved','success')
      this.categoryList.ngOnInit()
      this.categoryForm.reset("")
      },(error) =>{
        Swal.fire('','something went wrong on server','error')
      })
      console.log("working")
    }else if(this.formData.crudeMode === "update"){
       values ['id'] = this.formData.data.id
      this.categoryService.update(values).subscribe((response) =>{
        Swal.fire('','update successiful','success')
        this.categoryList.ngOnInit()
        this.categoryForm.reset("")
        this.formData = {
          ...this.formData,
          crudeMode:"create",
          data:null
        }
      },(error) =>{
        Swal.fire('','something went wrong on server','error')
      })
    }
    
  }
}
