import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userservice.service';

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
  continue = false
  notwrong = false
  notmatch = false
  match = false
  currentpassword:any
  changepass: FormGroup;
  constructor(private userService:UserserviceService) { }

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
      newpassword: new FormControl('', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )]),
      confirmpassword: new FormControl('', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )])
    });
  }
  onCurrentChange($event){
    console.log(this.currentpassword)
    this.userService.confirm(this.currentpassword).subscribe((res:any)=>{
      if(res != null){
        console.log(res.password)
        console.log(this.info.password)
        if(res.password ==this.info.password){
          this.continue = true
        this.notwrong = false
        }
      }else{
        this.notwrong = true
      }
      
    })
  }
  show(){
    this.showChange = true
  }

 changePass(){
  if(this.changepass.value.newpassword == this.changepass.value.confirmpassword ){
    this.notmatch = false
    this.match = true
    this.userService.changePassword(this.changepass.value.confirmpassword,this.info.id).subscribe((res:any)=>{
      this.showChange = false
    })
    
  }else{
    this.notmatch = true
    this.match = false
  }
    
  }

}
