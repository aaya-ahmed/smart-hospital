import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { nurseData } from 'src/app/models/nurse';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-shownurse',
  templateUrl: './shownurse.component.html',
  styleUrls: ['../../../styles/showdata.css']
})
export class ShownurseComponent implements OnInit {
  nurse:nurseData={
    firstName: '',
    lastName: '',
    createdDtm: '',
    age: 0,
    nationalId: '',
    image: '',
    bloodType: '',
    phoneNumber: '',
    address: '',
    gender: '',
    userName: '',
    mail: '',
    password: '',
    role: '',
    departmentId: 0,
    departmentName: '',
    isActive: true,
    nurseNotes: '',
    nurseDegree: '',
    nurseSpecialization: ''
  };
  subcriber:Subscription=new Subscription();
  constructor(private sidemanagersirvice:SidemanagerService) { }

  ngOnInit(): void {
    this.subcriber=this.sidemanagersirvice.control.subscribe({
      next:res=>{
        this.nurse=res.data;
        this.subcriber.unsubscribe()
      }
    })
  }
  close(){
    this.sidemanagersirvice.setControl({open:false,component:'',data:{}})
  }

}
