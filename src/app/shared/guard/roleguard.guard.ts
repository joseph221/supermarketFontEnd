import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleguardGuard implements CanActivate {
  user = JSON.parse(sessionStorage.getItem('user'))
  currentRole:any
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      return this.isAuthorize(route);
      
      
      
      
    
   
  }
  private isAuthorize(route:ActivatedRouteSnapshot):boolean{
    const expectedRoles = route.data.expectedRoles;
      this.user.roles.forEach(element => {
        this.currentRole = element.roleName
      });
    if(this.currentRole == expectedRoles){
      console.log(this.currentRole)
      return true
    }else{
      this.router.navigate(['home'])
      console.log(this.currentRole)
      return false
    }
    
  }
  
}
