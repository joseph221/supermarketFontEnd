import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router:Router,private userservice:UserserviceService) { 
    this.loginConfig()
  }


  ngOnInit(): void {
    this.loginConfig()
  }
  loginConfig(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      password: new FormControl('', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )])
    });
  }

  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }
    this.userservice.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(res =>{
      
      if(res != null){
        sessionStorage.setItem('user',JSON.stringify(res))
        this.router.navigate(['main/home'])
        console.log("faild to navigate")
      }else{
        console.log("no such user")
        this.router.navigate(['login'])
      }
    })
    // localStorage.setItem('user',this.loginForm.value.email)
  }
}
