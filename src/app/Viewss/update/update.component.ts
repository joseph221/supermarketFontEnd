import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  userForm: FormGroup;

  editFormMode={
    crudeMode: "edit",
    user: null
  }

  constructor(private userservice:UserserviceService,private router: ActivatedRoute,
    private router1: Router) { }

  ngOnInit(): void {
    const user_id = this.userservice.uid;
    this.getById(user_id);
    this.userForm = new FormGroup({
      id: new FormControl(null),
      username: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required])
    });
  }

  getById(id: number){
    this.userservice.getById(id).subscribe((data:any) =>{
      this.editFormMode={
        ...this.editFormMode,
        user:data
      }
    });
  }

  onUpdate(){
    const values = this.userForm.value
    this.userservice.update(values).subscribe((response) =>{
      console.log("Data updated",response)
      this.router1.navigateByUrl("/users")
    })
  }
}
