import { Component, OnInit, ViewChild,OnDestroy } from '@angular/core';
import { HostDirective } from 'src/app/directivies/host.directive';
import { UpdatepasswordComponent } from 'src/app/modules/shared/profile/updatepassword/updatepassword.component';
import { UpdateprofileComponent } from 'src/app/modules/shared/profile/updateprofile/updateprofile.component';
import { SidemanagerService } from 'src/app/services/sidemanager.service';
import { sidehosttemplate } from '../../shared/sidehosttemplate/sidehost.component';
@Component({
  selector: 'app-sidehost',
  templateUrl: '../../shared/sidehosttemplate/sidehost.component.html',
  styleUrls:['../../styles/addingform.css','../../shared/sidehosttemplate/sidehost.component.css']
})
export class SidehostComponent extends sidehosttemplate{
  loadcomponent(component:string,data:any){
    this.viewrefrence = this.host.viewContainerRef;
    this.viewrefrence.clear();
    switch (component){
      case "updateprofile":
        this.currentComponent=this.viewrefrence.createComponent(UpdateprofileComponent)
      break;  
      case "updatepassword":
        this.currentComponent=this.viewrefrence.createComponent(UpdatepasswordComponent)
      break;    
    }
    this.currentComponent.instance.data=data
  }

}
