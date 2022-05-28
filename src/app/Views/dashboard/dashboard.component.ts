import { AfterContentChecked, AfterViewChecked, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AdminService } from 'src/app/services/Admin_service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy{
  companyName:string
  email:any
  role:any[]
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private adminservice:AdminService,private router:Router) {}
  ngOnDestroy(): void {
    sessionStorage.clear()
  }
  
  
  ngOnInit(): void {
    this.adminservice.getComponanyName().subscribe(res=>{
      this.companyName = res.company_name
    })
    var user = JSON.parse(sessionStorage.getItem('user'))
    this.email = user.email
    this.role = user.roles
    console.log(this.role)
  }

  createUser(){
    alert("working")
  }

  logOut(){
    sessionStorage.clear()
    this.router.navigateByUrl('/login')
  }

}
