import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { patientrequest } from 'src/app/models/patient';

@Component({
  selector: 'app-out-patient',
  templateUrl: './out-patient.component.html',
  styleUrls: ['./out-patient.component.css']
})
export class OutPatientComponent implements OnInit {
  outpatientflag:number=1
  section:string='reports'
  patient:patientrequest={
    patientName:"",
    slotTime:"",
    patientId: 0,
    age: 0,
    gender:"",
    complain:"",
    examined: false,
    indoorPatientRecordId:0
}
  constructor(private router:ActivatedRoute) { }

  ngOnInit(): void {   
    this.router.queryParams.subscribe(  
      (params:any)=>{
       this.patient=params
      }
    )
  }
  changesection(sectioname:string){
    this.section=sectioname
  }
}
