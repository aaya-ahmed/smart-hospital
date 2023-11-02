import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inpatient } from 'src/app/models/patient';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-inpatientlist',
  templateUrl: './inpatientlist.component.html',
  styleUrls: ['./inpatientlist.component.css']
})
export class InPatientListComponent implements OnInit {
  inpatient:inpatient[]=[]
  flag=false
  patientflag:boolean=false
  patient:inpatient={
    patientName: '',
    patientId: 0,
    indoorPatientRecordId: 0,
    age: 0,
    gender: '',
    causeOfAdmission: '',
    oralMedicalHistory: '',
    enterDate: '',
    room_Number: 0,
    bedNumber: 0,
    floor_Number: 0
  };

  constructor(private service:ServicesService,private router:Router) { }

  ngOnInit(): void {
    let user:any=localStorage.getItem('userInfo')
    let departmentid=JSON.parse(user).departmentId;
    this.service.getindoorpatient(departmentid).subscribe(
      (res:any)=>{ 
        this.inpatient=res
        this.flag=true
        if(this.inpatient.length>0){
          this.patientflag=true
        }
      }
     )
  }
  examine(index:number){
    this.router.navigate(['./doctor/examination'],{queryParams:this.inpatient[index],skipLocationChange:true})
  }
}
