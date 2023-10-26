import { Component, OnInit } from '@angular/core';
import { allSlot } from 'src/app/models/schadule';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.css']
})
export class MakeAppointmentComponent implements OnInit {
  
  patients:any[]=[]
  departments:any[]=[]
  fullschedule:allSlot[]=[]
  busyslot:any[]=[]
  showslot:any=[]
  workofdays:any[]=[]
  minDate=new Date() 
  maxDate=new Date()
  doctorschedule:allSlot={
    doctorId: 0,
    doctorName: '',
    workSchedules: []
  }
  appoint={
      "timeslotdto": {
        "slotnumber": 0,
        "dayofwork": 0,
        "slot_time": "",
        "reserved": true,
        "doctorId": 0
      },
      "appointmentDto": {
        "appointmentDate": "",
        "appointmentType": "",
        "complain": "",
        "patientId": 0,
        "doctorId": 0,
        "examined": false
      }
    }
    departmentflag:boolean=false
    doctorflag:boolean=false 
    submitted:boolean=false
    selectflag:boolean=false
    patientid:number=0
    patientname:string=""
  constructor(private generalservices:ServicesService) { }
//here we call patient and departments
  ngOnInit(): void {
  ///service to get all patients
  if(localStorage.getItem("userRole")=="patient"){
    this.selectflag=true
    let user:any=localStorage.getItem('userInfo')
    this.patientid=JSON.parse(user).id
    this.patientname=JSON.parse(user).firstName+" "+JSON.parse(user).lastName
  }
  else{
    this.generalservices.get("Patient/getAllPatients").subscribe(
      (res:any)=>{this.patients=res;}
    )
  }

  ///service to get all clicical 
  this.generalservices.get("Departments/GetAllClinicalDept").subscribe(
    (res:any)=>{
      this.departments=res;
    }
  );
  this.maxDate.setDate(this.maxDate.getDate() + 90);
  }
  //here get schedule department 
  getallschedule(deptid:any){
    this.showslot=[]
    let id=deptid.target.value
    if(id!=''){
      this.departmentflag=true
      this.generalservices.get("TimeSlot/GetSlotsByDepartment/"+id).subscribe(
        (res:any)=>{
          this.fullschedule=res
        }
      )
    } 
    else{
      this.departmentflag=false
      this.fullschedule=[]
    }
  }
    //from schadle department we get doctor schedule
  getdoctorschedule(event:any){
    let id=event.target.value
  if(id!=''){
    this.doctorflag=true
      //get busy slots for doctors
      this.generalservices.get("TimeSlot/GetBusySlots/"+this.fullschedule[id].doctorId+"/"
      +this.minDate.toISOString().substring(0,10)+"/"+this.maxDate.toISOString().substring(0,10)).subscribe(
        (res:any)=>{
          this.busyslot=res
        }
      )
      this.workofdays=[]
      this.doctorschedule={
        doctorId: 0,
        doctorName: '',
        workSchedules: []
      }
      this.doctorschedule= this.fullschedule[id]

      for(let i of this.fullschedule[id].workSchedules){
        this.workofdays.push(i.dayOfWork);
      }
  }
  else{
    this.doctorflag=false
  }
  }
  ////here we get free slots
getdate(event:any){
  let prev_day=event.target.value.toISOString().substring(0,10)
  let tomorrow = new Date(prev_day)
  tomorrow.setDate(tomorrow.getDate() + 1)
  let correctday=tomorrow.toISOString().substring(0,10)
  this.showslot=this.doctorschedule.workSchedules.find(e=>e.dayOfWork==event.target.value.getDay())?.slots
  let temp:any=this.busyslot.find((e:any)=>e.day.substring(0,10)==correctday);
      if(temp!=undefined&&temp.busySlots.length>0){
        for(let j of temp.busySlots){
          let index=this.showslot.findIndex((e:any)=>e.slotTime==j)
          this.showslot.splice(index,1);
    } 
  }
}

  weekendsDatesFilter = (d: any): boolean => {
    if(d==null){ return false}
    else{
    const day = d.getDay();
if(day !== this.workofdays[0] && day !== this.workofdays[1] && day !== this.workofdays[2]
  &&day !== this.workofdays[3] && day !== this.workofdays[4]&&day !== this.workofdays[5]&&day !== this.workofdays[6]){
  return false;
}
  else  {return true}
    }
}
submitappoint(appointform:any){
  this.submitted=true
if(appointform.valid){
let date=(appointform.value.appointdate).toISOString().substring(0,8)+String(appointform.value.appointdate).substring(8,10)
this.appoint.timeslotdto.slotnumber=this.showslot[parseInt(appointform.value.time)].slotNumber
this.appoint.timeslotdto.slot_time=this.showslot[parseInt(appointform.value.time)].slotTime
this.appoint.timeslotdto.dayofwork=appointform.value.appointdate.getDay()
this.appoint.timeslotdto.doctorId=this.fullschedule[parseInt(appointform.value.doctorid)].doctorId
this.appoint.appointmentDto.appointmentDate=date
this.appoint.appointmentDto.appointmentType="Appointment"
this.appoint.appointmentDto.complain=appointform.value.complain
this.appoint.appointmentDto.doctorId=this.fullschedule[parseInt(appointform.value.doctorid)].doctorId

if(this.patientid==0){
  let patient=this.patients.find((n:any)=>(n.firstName+" "+n.lastName)==appointform.value.patientid)
  this.appoint.appointmentDto.patientId=patient.id
}
else{
  this.appoint.appointmentDto.patientId=this.patientid
}

this.generalservices.post("Appointment",this.appoint).subscribe(
  res=>{
    appointform.reset()
    this.submitted=false
    this.generalservices.get("TimeSlot/GetBusySlots/"+this.appoint.appointmentDto.doctorId+"/"
    +this.minDate.toISOString().split('T')[0]+"/"+this.maxDate.toISOString().split('T')[0]).subscribe(
      (res:any)=>{
        this.busyslot=res
      }
    )
  }
)

}
else{
  appointform.submitted=true
}
}

}