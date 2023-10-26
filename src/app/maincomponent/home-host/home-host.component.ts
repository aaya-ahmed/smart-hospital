import { Component, OnInit,OnDestroy, ViewChild } from '@angular/core';
import { HostDirective } from 'src/app/directivies/host.directive';
import { SidemanagerService } from 'src/app/services/sidemanager.service';
import { LoginComponent } from '../login/login.component';
import { RegComponent } from '../reg/reg.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-host',
  templateUrl: './home-host.component.html',
  styleUrls: ['./home-host.component.css']
})
export class HomeHostComponent implements OnInit,OnDestroy {
  viewcontainer:any;
  @ViewChild(HostDirective,{static:true})hostchild!:HostDirective
  subscriber!:Subscription
  constructor(private hostservice:SidemanagerService) { }
  ngOnDestroy(): void {
    this.subscriber?.unsubscribe()
  }

  ngOnInit(): void {
    this.subscriber=this.hostservice.control.subscribe(
      res=>{
        if(res.open==true){

          this.createcomponent(res.component)
        }
        else if(res.open==false&&this.viewcontainer){
          this.viewcontainer.clear()
        }
      }
    )
  }
  createcomponent(component:string){
    this.viewcontainer=this.hostchild.viewContainerRef;
    this.viewcontainer?.clear()
    switch(component){
      case 'login':
        this.viewcontainer.createComponent(LoginComponent)
        break;
      case 'register':
        this.viewcontainer.createComponent(RegComponent)
        break;
    }
  }
}
