import { Component} from '@angular/core';
import { AdddoctorComponent } from '../doctor/adddoctor/adddoctor.component';
import { ShowdoctorComponent } from '../doctor/showdoctor/showdoctor.component';
import { AddnurseComponent } from '../nurse/addnurse/addnurse.component';
import { ShownurseComponent } from '../nurse/shownurse/shownurse.component';
import { AddemployeeComponent } from '../employees/addemployee/addemployee.component';
import { AdddepartmentComponent } from '../departments/adddepartment/adddepartment.component';
import { AddbedComponent } from '../seat-beds/addbed/addbed.component';
import { SetScheduleComponent } from '../schadule/setschadule/setschedule.component';
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
      case "addDoctor":
      case "updateDoctor":
        this.currentComponent=this.viewrefrence.createComponent(AdddoctorComponent)
      break;
      case "addNurse":
      case "updateNurse":
        this.currentComponent=this.viewrefrence.createComponent(AddnurseComponent)
      break;
      case "addEmployee":
      case "updateEmployee":
        this.currentComponent=this.viewrefrence.createComponent(AddemployeeComponent)
      break;
      case "addDepartment":
      case "updateDepartment":
        this.currentComponent=this.viewrefrence.createComponent(AdddepartmentComponent)
      break;
      case "addBed":
        this.currentComponent=this.viewrefrence.createComponent(AddbedComponent)
      break;
      case "showNurse":
        this.currentComponent=this.viewrefrence.createComponent(ShownurseComponent)
      break;
      case "showDoctor":
        this.currentComponent=this.viewrefrence.createComponent(ShowdoctorComponent)
      break;
      case "addSchedule":
        this.currentComponent=this.viewrefrence.createComponent(SetScheduleComponent)
      break;
    }
    this.currentComponent.instance.data=data
  }
}
