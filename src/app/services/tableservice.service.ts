import { Injectable } from '@angular/core';
import { UpdateComponent } from '../Viewss/update/update.component';
import { UsersComponent } from '../Viewss/users/users.component';

@Injectable({
  providedIn: 'root'
})
export class TableserviceService {

  
  
  constructor(public usercomponent: UsersComponent,public updateComponent: UpdateComponent) { }

  getAll(){
    this.usercomponent.viewAll();
  }

}
