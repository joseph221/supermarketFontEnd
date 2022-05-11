import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm!: FormGroup;

  createFormMode={
    crudeMode: "create",
    user: null
  }

  constructor(){ }

  ngOnInit(): void {

  }
  
  onSave(){
    
  }



}
