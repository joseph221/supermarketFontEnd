import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/Admin_service/admin.service';
import { RoleserviceService } from 'src/app/services/role_service/roleservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { UsersComponent } from 'src/app/Viewss/users/users.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit ,OnChanges{
  roles:any[]
  userForm!: FormGroup;

  @Input() formData!:{
    crudeMode: String;
    user: any;
  } 

  constructor(private userservice:UserserviceService,private router:Router,
    private admin:AdminService,private role:RoleserviceService,
    private dialogRef:MatDialogRef<UsersComponent>) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.formData.crudeMode === "update"){
      if(this.formData.user != null){
       Object.keys(this.formData.user).forEach((key) =>{
         if(this.userForm.value.hasOwnProperty(key)){
           this.userForm.get(key).setValue(this.formData.user[key])
         }
       })
      }
    }
  }

  ngOnInit(): void {
    console.log('passed from parent =>',this.formData);
    this.formConfiguration();
    this.getRoles()
  }
  formConfiguration(){
    this.userForm = new FormGroup({
      firstname: new FormControl(null,[Validators.required]),
      lastname: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[Validators.required]),
      username: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required]),
      roleId:new FormControl('',[Validators.required])
    });
  }
  onSave(){
    const values = this.userForm.value
    console.log(values)
    this.userservice.add(values).subscribe((response) =>{
      console.log("Data added",response)
      Swal.fire('','user saved','success')
      this.router.navigateByUrl('user')
      this.dialogRef.close()
    })
  }
  getRoles(){
    this.role.getRoles().subscribe(res =>{
      this.roles = res
    })
  }

}
