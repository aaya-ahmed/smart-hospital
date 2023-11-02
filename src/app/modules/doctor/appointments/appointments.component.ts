import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appointmentDto } from 'src/app/models/appointment';
import { ServicesService } from 'src/app/services/services.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  date:Date=new Date()
  today:string=''
  appointments:appointmentDto[]=[]
  flag:boolean=false;
  flagbtn:boolean=false
  messflag:boolean=false
  number_of_appointment:number=0
  constructor(private route:Router,private service:ServicesService) { }
  ngOnInit(): void {
    let day=new Date(this.date)
    this.today=`${day.getMonth()+1}-${day.getDate()}-${day.getFullYear()}`
    let id=JSON.parse(localStorage.getItem('userInfo')||'').id
    this.service.get("Appointment/GetAppointmentsForTodayByDoctorId/"+id+"/"+this.today).subscribe(
    (res:any)=>{
      if(res.length>0){
        this.number_of_appointment=res.length
        this.flagbtn=true
      for(let i of res){
        this.messflag=true
        if(!res.examined){
          this.appointments.push(i)
        }
      }
    }
    else{
      this.number_of_appointment=0
      this.messflag=true
    }
    this.flag=true

      }
    )
  }
  gotopatient(index:number){
    let temp:any={
      patientName:this.appointments[index].patientName,
      slotTime: this.appointments[index].slotTime,
      patientId: this.appointments[index].patientId,
      age: this.appointments[index].age,
      gender: this.appointments[index].gender,
      complain: this.appointments[index].complain,
      examined: this.appointments[index].examined,
      indoorPatientRecordId:-1
  }
    
    this.route.navigate(['./doctor/examination'],{queryParams:temp,skipLocationChange:true});
  }
  getappointments(event:any){
    this.appointments=[]
    this.flag=false;
    let id=JSON.parse(localStorage.getItem('userInfo')||'').id
    this.service.get("Appointment/GetAppointmentsForTodayByDoctorId/"+id+"/"+event.target.value).subscribe(
      (res:any)=>{
        if(res.length>0){
          this.number_of_appointment=res.length
          this.messflag=false
        for(let i of res){
          if(!res.examined){
            this.appointments.push(i)
          }
        }
      }
      else{
        this.number_of_appointment=0
        this.messflag=true
      }
      this.flag=true
        }
      )
  }
}
