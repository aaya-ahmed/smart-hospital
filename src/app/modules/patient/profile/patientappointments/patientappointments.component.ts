import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-patientappointments',
  templateUrl: './patientappointments.component.html',
  styleUrls: ['./patientappointments.component.css']
})
export class PatientappointmentsComponent implements OnInit {
  @Input()patient:number=-1
  appointment:any[]=[];
  appointflag:boolean=false
  index:number=0;
  deletedApp:any;
  deleteMess:boolean=false;
  numOfAppoinments:number=0;
  constructor(private service:ServicesService) { }

  ngOnInit(): void {
    this.service.get("Appointment/GetAppointmentsByPatientId/"+this.patient).subscribe(
      (res:any)=>{
        this.appointment=res
        this.numOfAppoinments=this.appointment.length;
        if(this.numOfAppoinments>0){
          this.appointflag=true
        }
      }
     );
  }
  cancelAppoinment(deletedApp:any,index:number){
    this.deleteMess=true;
    this.deletedApp=deletedApp;
    this.index=index;
  }
  ensureCancelAppoint(){
   
    this.service.delete("Appointment/CancelAppointment/"+this.appointment[this.index].appointmentId).subscribe(
      res=>{ 
       
       },
      err=>{ 
        this.appointment.splice(this.index,1)
        this.numOfAppoinments=this.appointment.length;
       }
    )
  }
  close(){
    this.deleteMess=false
  }
}
