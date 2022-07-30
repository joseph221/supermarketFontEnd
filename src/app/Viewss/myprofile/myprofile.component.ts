import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  info:any
  roles:any[]
  role:any
  showChange = false
  changepass: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.changepassconfig()
    this.info = JSON.parse(sessionStorage.getItem("user"))
    this.roles = this.info.roles
    
    this.roles.forEach((role:any)=>{
      this.role = role
      console.log(this.role)
    })
  }

  changepassconfig(){
    this.changepass = new FormGroup({
      currentpassword: new FormControl('', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )]),
      newpassword: new FormControl('', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )]),
      confirmpassword: new FormControl('', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )])
    });
  }
  show(){
    this.showChange = true
  }

}
