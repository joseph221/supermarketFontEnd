import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;

  @Input() formData!:{
    crudeMode: String;
    user: any;
  } 

  constructor(private userservice:UserserviceService,private router:Router) { }

  ngOnInit(): void {
    console.log('passed from parent =>',this.formData);
    this.formConfiguration();
  }
  formConfiguration(){
    this.userForm = new FormGroup({
      username: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required])
    });
  }
  onSave(){
    const values = this.userForm.value
    this.userservice.add(values).subscribe((response) =>{
      console.log("Data added",response)
      this.router.navigateByUrl("/users")
    })
  }

}
