import { Component } from '@angular/core';
import { ScanFormComponent } from '../scans/scanform/scanform.component';
import { UpdateprofileComponent } from 'src/app/modules/shared/profile/updateprofile/updateprofile.component';
import { UpdatepasswordComponent } from 'src/app/modules/shared/profile/updatepassword/updatepassword.component';
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
      case "addscan":
        this.currentComponent=this.viewrefrence.createComponent(ScanFormComponent)
      break;  
      case "updatescan":
        this.currentComponent=this.viewrefrence.createComponent(ScanFormComponent)
      break;    
    }
    this.currentComponent.instance.data=data
  }

}
