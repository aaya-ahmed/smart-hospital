import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inpatient } from 'src/app/models/patient';

@Component({
  selector: 'app-in-patient',
  templateUrl: './in-patient.component.html',
  styleUrls: ['./in-patient.component.css']
})
export class InPatientComponent implements OnInit {
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
  }
  section:string='reports'
  outpatientflag:number=0
  constructor(private router:ActivatedRoute) { }
  ngOnInit(): void {
    this.router.queryParams.subscribe(
      (param:any)=>{
        this.patient=param
      }
    )
  }
  changesection(sectioname:string){
    this.section=sectioname
  }
}