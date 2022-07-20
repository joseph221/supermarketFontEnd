import { Component, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
import { Router } from '@angular/router';
import { TableColumns } from 'src/app/shared/table/tableColumns';
import { User } from './User';
import { Sort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { config } from 'src/app/Views/config';
import { RoleserviceService } from 'src/app/services/role_service/roleservice.service';
import { Role } from './Role';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,OnChanges {
  @ViewChild('ChangeConfig') changeConf:TemplateRef<any>
  @ViewChild('Addrole') addrole:TemplateRef<any>
  configForm:FormGroup
  roleForm:FormGroup
  user!: User[];
  userTableColumns!: TableColumns[];
  showform = false
  configData:config[];
  roleData:Role[] = [];
  role:Role
  create = true
  
  constructor(private userservice: UserserviceService,
    private router: Router,private dialog:MatDialog,
    private roleservice:RoleserviceService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.viewAll();
    console.log(changes)
  }

  ngOnInit(): void {
    this.getRoles()
    this.roleFormConfig()
    this.getConfig()
    this.formConfig()
    this.initializeColumns();
    this.viewAll();
  }

  ExportTOExcel(){

  }

  showForm(){
    this.userservice.getConfig().subscribe(res=>{
      Object.keys(res).forEach((key)=>{
        if(this.configForm.value.hasOwnProperty(key)){
          this.configForm.get(key).setValue(res[key])
        }
      })
    })
    this.showform = true
  }
  showHide(){
    this.showform = false
  }

  //company configuration
  formConfig(){
    this.configForm = new FormGroup({
      company_name:new FormControl("",[Validators.required]),
      tax_rate:new FormControl("",[Validators.required]),
      address:new FormControl("",[Validators.required]),
      city:new FormControl("",[Validators.required]),
      phone:new FormControl("",[Validators.required])
    })
  }

  changeConfig(){
    this.userservice.getConfig().subscribe(res=>{
      Object.keys(res).forEach((key)=>{
        if(this.configForm.value.hasOwnProperty(key)){
          this.configForm.get(key).setValue(res[key])
        }
      })
    })
    const dialconfig ={
      width:'45%'
    }
    this.dialog.open(this.changeConf,dialconfig);
  }
  getConfig(){
    this.userservice.getAllConfig().subscribe(res=>{
      this.configData = res
    })
  }

  onSave(){
    const values = this.configForm.value
    values['id'] = 1
    this.userservice.changeCofig(values).subscribe(res =>{
      Swal.fire('','saved','success')
      window.location.reload()
    })
  }

  //roles
  roleFormConfig(){
    this.roleForm = new FormGroup({
      roleName:new FormControl('',[Validators.required])
    })
  }
  AddRole(){
    const dialconfig ={
      width:'35%'
    }
    this.dialog.open(this.addrole,dialconfig)
  }
  Save(){
    if(this.create){
      const values = this.roleForm.value
      this.roleservice.Addrole(values).subscribe(res=>{
        Swal.fire('',"Role saved",'success')
        this.getRoles()
        this.dialog.closeAll()
        window.location.reload()
        this.create = true
      })
    }else if(!this.create){
      const values = this.roleForm.value
      values['roleId'] = this.role.roleId
      console.log(values)
      
      this.roleservice.updateRole(values).subscribe(res =>{
        Swal.fire('','role updated','success')
        this.getRoles()
        this.dialog.closeAll()
        window.location.reload()
        this.create = true
      })
    }
    
  }

  getRoles(){
    this.roleservice.getRoles().subscribe(res =>{
      this.roleData = res
    })
  }
  getRoleById(id:number){
    this.roleservice.getById(id).subscribe(res =>{
      this.role = res
      this.create = false
      Object.keys(res).forEach((key) =>{
        if(this.roleForm.value.hasOwnProperty(key)){
          this.roleForm.get(key).setValue(res[key])
          const dialconfig ={
            width:'35%'
          }
          this.dialog.open(this.addrole,dialconfig)
        }
      })
    })
  }
  

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.user = this.user.sort((a: User, b: User) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.user = this.user.sort((a: User, b: User) => b[keyName].localeCompare(a[keyName]));
    } else {
      return this.viewAll();
    }
  }

  removeItem(id:number) {
    this.userservice.delete(id) .subscribe(()=> {
    this.viewAll();
    });
   
  }

  editUser(id:any){
    console.log(id)
    this.userservice.uid = id
    const conAndData = {
      data:id,
      width:'50%'
    }
    const dialogRef =this.dialog.open(UpdateComponent,conAndData)
    dialogRef.afterClosed().subscribe(result =>{
      this.ngOnInit();
    })
  }

  

  initializeColumns(): void {
    this.userTableColumns = [
      {
        name: 'SN',
        dataKey: 'id',
        position: 'left',
        isSortable: true
      },
      {
        name: 'First Name',
        dataKey: 'firstname',
        position: 'right',
        isSortable: false
      },
      {
        name: 'Last Name',
        dataKey: 'lastname',
        position: 'right',
        isSortable: true
      },
      {
        name: 'User Name',
        dataKey: 'username',
        position: 'right',
        isSortable: false
      },
      {
        name: 'Roles',
        dataKey: 'roles.roleName',
        position: 'right',
        isSortable: true
      },
    ];
    
  }
  
  viewAll(){
    this.userservice.getAll().subscribe((dat) => {
      this.user = dat
      console.log(this.user)
   })
  }

  createUser(){
    const config={
      width:'50%'
    }
    const dialogRef = this.dialog.open(AddUserComponent,config)
    
    
    //this.router.navigateByUrl("main/adduser");
  }

  
}
