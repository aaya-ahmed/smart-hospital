import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.css']
})
export class PatientAppointmentComponent implements OnInit {
  patients:any[]=[]
  appointment:any[]=[]
  appointflag:boolean=false
  loading:boolean=false;
  constructor(private service:ServicesService) { }

  ngOnInit(): void {
    this.service.get("Patient/getAllPatients").subscribe(
      (res:any)=>{
        this.patients=res
      }
    )
  }
  getappoint($event:any){
    this.loading=true
    let id=this.patients.find(p=>`${p.firstName}${p.lastName}`==$event.target.value).id;
    if(id)
    this.service.get("Appointment/GetAppointmentsByPatientId/"+id).subscribe(
      (res:any)=>{
        this.appointment=res
        if(this.appointment.length>0){
        this.appointflag=true
      }
      else{
        this.appointflag=false
      }
      this.loading=false
    }
    )
  }

}
