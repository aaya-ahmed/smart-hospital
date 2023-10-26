import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-show-appointment',
  templateUrl: './show-appointment.component.html',
  styleUrls: ['./show-appointment.component.css']
})
export class ShowAppointmentComponent implements OnInit {
  doctors:any[]=[]
  appointment:any[]=[]
  private doctorid:number=-1;
  today:any=new Date();
  appointflag:boolean=false
  loading:boolean=true;
  constructor(private service:ServicesService) { }
  
  ngOnInit(): void {
    this.today=this.today.toISOString().slice(0,10)
    this.service.get("Doctor/getAllDoctors").subscribe(
     (res:any)=>{
        this.doctors=res;
        this.getappointment(this.doctors[0].id);
      }
    )

  }


  getappointment($event:any){
    this.loading=true
    let id=(typeof $event == 'number')?$event:+$event.target.value;
    this.service.get("Appointment/GetAppointmentsForTodayByDoctorId/"+id+"/"+this.today).subscribe(
     (res:any)=>{
        this.appointment=res
        console.log(this.appointment)
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
