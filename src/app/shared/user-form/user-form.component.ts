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
    if(this.formData.crudeMode === "edit"){
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
   
    this.formConfiguration();
    this.getRoles()
  }
  formConfiguration(){
    this.userForm = new FormGroup({
      id: new FormControl(null),
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
    if(this.formData.crudeMode === "create"){
      this.userservice.add(values).subscribe((response) =>{
        Swal.fire('','Saved','success')
        this.router.navigateByUrl('user')
      this.dialogRef.close()
      },(error) =>{
        Swal.fire('','something went wrong on server','error')
      })
    }else if(this.formData.crudeMode === "edit"){
      this.userservice.update(values).subscribe((response) =>{
        Swal.fire('','update successiful','success')
        this.router.navigateByUrl('user')
        this.dialogRef.close()
      },(error) =>{
        Swal.fire('','something went wrong on server','error')
      })

    }
  }
  getRoles(){
    this.role.getRoles().subscribe(res =>{
      this.roles = res
    })
  }

}
