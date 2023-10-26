import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { patientreport } from 'src/app/models/patient';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-discharge',
  templateUrl: './discharge.component.html',
  styleUrls: ['./discharge.component.css']
})
export class DischargeComponent implements OnInit {
  patientrep:patientreport={
    patientId: 0,
    dateOfDischarge: '',
    recommendation: '',
    indoorPatientRecordId: 0,
    enterDate: ''
  }
  today=new Date().toISOString().substring(0,10)
  @Input("patient")patient:any;
  constructor(private services:ServicesService,private router:Router) { }
  ngOnInit(): void {
  }
  discharge(form:any){
    if(form.valid){
      this.patientrep.patientId=parseInt(this.patient.patientId);
      this.patientrep.dateOfDischarge=this.today+"T00:00:00"
      this.patientrep.indoorPatientRecordId=parseInt(this.patient.indoorPatientRecordId)
      this.patientrep.recommendation=form.value.recommendation
      this.patientrep.enterDate=this.patient.enterDate
      this.services.post("Patient/AddPatientReport",this.patientrep).subscribe(
        res=>{
         this.router.navigate(['./doctor/in-patientlist'])
        }
      )
    }
  }
}
