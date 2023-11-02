import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LogInAndOutService } from 'src/app/services/log-in-and-out.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../styles/sidebar.css']
})
export class SidebarComponent implements OnInit {
  @Input()sideState:boolean=true;
  @Input()linksList:{link:string,icon:string,title:string}[]=[]
  @Output()sideStateout:EventEmitter<Boolean>=new EventEmitter();
  currentlink:string="";
  constructor(private route:Router,private service:LogInAndOutService) { }
  ngOnInit(): void {
    this.currentlink=this.route.url.split('/').pop()||"profile";
  }
  @HostListener('window:resize',['$event'])
  onwendowresize(){
    if(window.innerWidth<=700){
      this.sideStateout.emit(false)
      this.sideState=false
    }
    else{
      this.sideStateout.emit(true)
      this.sideState=true
    }
  }
  goToPage(pagename:string){
    this.currentlink=pagename
    this.route.navigate([`/${localStorage.getItem('userRole')}/${pagename}`])
  }
  logoutadmin(){
    this.service.logout();
    this.route.navigate(['/home'])
  }
  close(){
    this.sideState=false;
    this.sideStateout.emit(false)
  }
}