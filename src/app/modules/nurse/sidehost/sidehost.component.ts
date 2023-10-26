import { Component} from '@angular/core';
import { AddVitalSignComponent } from '../in-patient/add-vital-sign/add-vital-sign.component';
import { ShowMedicineComponent } from '../in-patient/show-medicine/show-medicine.component';
import { ShowVitalComponent } from '../in-patient/show-vital/show-vital.component';
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
      case "addvitalsign":
        this.currentComponent=this.viewrefrence.createComponent(AddVitalSignComponent)
      break;
      case "showmedicine":
        this.currentComponent=this.viewrefrence.createComponent(ShowMedicineComponent)
      break;
      case "showvital":
        this.currentComponent=this.viewrefrence.createComponent(ShowVitalComponent)
      break;
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
