import { Component, HostListener, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { SidemanagerService } from 'src/app/services/sidemanager.service';
import { NavigationEnd, Router } from '@angular/router';
import { LogInAndOutService } from 'src/app/services/log-in-and-out.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  toggle:boolean=false
  logoutstatus:boolean=true
  constructor(private router:Router,private service:LogInAndOutService,private breakpointObserver:BreakpointObserver,private hostservice:SidemanagerService) { }


  ngOnInit(): void {
    this.breakpointObserver.observe(['(min-width: 767.98px)']).subscribe(
      result=>{
        if(result.matches){
          this.toggle=true
          let routing=this.router.events.subscribe(
            res=>{
              if(res instanceof NavigationEnd){
                this.togglenav()
              }
              routing.unsubscribe()
            }
          )
        }
      }
    )
    this.logoutstatus=this.service.outstate
  }
  togglenav(){
    this.toggle=!this.toggle
  }
  openlogin(){
    this.hostservice.setControl({open:true,component:'login',data:{}})
  }
  openreg(){
    this.hostservice.setControl({open:true,component:'register',data:{}})
  }
  openprofile(){
    let user=localStorage.getItem('userRole')
    this.router.navigate([`/${user}`])
  }
  logout(){
    this.service.logout()
    this.logoutstatus=this.service.outstate
  }
}
