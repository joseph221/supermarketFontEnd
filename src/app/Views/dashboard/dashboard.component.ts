import { AfterContentChecked, AfterViewChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AdminService } from 'src/app/services/Admin_service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  companyName:string

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private adminservice:AdminService) {}
  
  
  ngOnInit(): void {
    this.adminservice.getComponanyName().subscribe(res=>{
      this.companyName = res.company_name
    })
  }

  createUser(){
    alert("working")
  }

}
