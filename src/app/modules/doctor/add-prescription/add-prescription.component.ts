import { Component, Input, OnInit } from '@angular/core';
import {   NgForm } from '@angular/forms';
import {  PrescriptionItem } from 'src/app/models/prescription';
import { Slot } from 'src/app/models/schadule';
import { ServicesService } from 'src/app/services/services.service';


@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css']
})
export class AddPrescriptionComponent implements OnInit {
  @Input("patient")patient:any
  @Input("outpatientflag")outpatientflag:number=0;
  allPrescriptionItems : Array<PrescriptionItem> = [];
  prescriptionItem:Array<any> = [];
  indoorPatientRecordId:any;
  date=new Date().toISOString();
  flag:boolean=false;
  minDate=new Date()
  maxDate=new Date()
  busyslot:any[]=[]
  fullschedule:Slot[]=[];
  slot:any[]=[]
  busyslotslist:any
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
      "appointmentType": "re-appointment",
      "complain": "",
      "patientId": 0,
      "doctorId": 0,
      "examined": false
    }
  }
  doctorInfo:any;
  doctor:number=0
  departmentid:number=0;
  appointflag:boolean=false
  timeflag:boolean=false
  messflag:boolean=false
  precflag:boolean=false
  newPrescriptionItem:any={medicine_Name: '',medicine_concentration: '',instructions: '',medicineType: '',doseNumber: '',doseRepition:'',durarionNum: '',durarionReptition:''}
  constructor(private services:ServicesService) { }
  ngOnInit(): void {
    this.doctorInfo=localStorage.getItem('userInfo')
    this.doctorInfo=JSON.parse(this.doctorInfo)
    this.doctor=this.doctorInfo.id
    this.departmentid=this.doctorInfo.departmentId
    this.maxDate.setDate(this.maxDate.getDate() + 90);
    this.services.get("TimeSlot/GetBusySlots/"+this.doctor+"/"
    +this.minDate.toISOString().substring(0,10)+"/"+this.maxDate.toISOString().substring(0,10)).subscribe(
      (res:any)=>{
        this.busyslot=res
      }
    )
    this.services.get("TimeSlot/GetSlotsByDepartment/"+this.departmentid).subscribe(
      (res:any)=>{
        for(let i of res){
          if(i.doctorId==this.doctor){
            this.fullschedule=i.workSchedules
          }
        }
      }
    )
  }
  addRow() {     
      this.prescriptionItem.push(this.newPrescriptionItem);
      this.newPrescriptionItem={medicine_Name: '',medicine_concentration: '',instructions: '',medicineType: '',doseNumber: '',doseRepition:'',durarionNum: '',durarionReptition:''}
      this.flag=true;
  }
  deleteRow(index:number) {
      this.prescriptionItem.splice(index, 1);
      if(this.prescriptionItem.length==0){
        this.flag=false;
      }
  }
  getAllItems(){
    let item:any={medicine_Name:'',medicine_concentration:'',instructions:'',medicineType:'',dose:'',durarion:''};
     for( let i of this.prescriptionItem){
      item={medicine_Name: i.medicine_Name,medicine_concentration:i.medicine_concentration,instructions:i.instructions,
           medicineType:i.medicineType,dose:i.doseNumber+' '+i.doseRepition,durarion:i.durarionNum+' '+i.durarionReptition }
           this.allPrescriptionItems.push(item);
   }
   
   return this.allPrescriptionItems
   
  }
addPrescription(form:NgForm,flag:number){
   if(form.valid){
    if(this.outpatientflag){
      this.indoorPatientRecordId=null
   }
   else{
     this.indoorPatientRecordId=parseInt(this.patient.indoorPatientRecordId)
   }
   if(flag){
    let allPrescriptionData:any={
      prescriptionItems:this.getAllItems(),
      prescription_Date: this.date,
      diagnosis:form.value.diagnosis,
      re_appointement_date:this.appoint.appointmentDto.appointmentDate+"T"+ this.appoint.timeslotdto.slot_time,
      patientId:parseInt(this.patient.patientId) ,
      doctorId: this.doctor,
      indoorPatientRecordId:this.indoorPatientRecordId
     }
    this.services.post("Doctor/AddPrescription",allPrescriptionData).subscribe(res=>{
      form.reset()
      this.precflag=true
      setTimeout(() => {
        this.precflag=false
      }, 500);
    })
   }
   else{
    let allPrescriptionData:any={
      prescriptionItems:this.getAllItems(),
      prescription_Date: this.date,
      diagnosis:form.value.diagnosis,
      patientId:parseInt(this.patient.patientId) ,
      doctorId: this.doctor,
      indoorPatientRecordId:this.indoorPatientRecordId
     }
    this.services.post("Doctor/AddPrescription",allPrescriptionData).subscribe(res=>{form.reset()
      this.precflag=true
      setTimeout(() => {
        this.precflag=false
      }, 500);})
   }
  
  }

  }
  addAppointment(form:NgForm,precform:NgForm){
    if(precform.valid&&this.flag){
    if(form.value.reAppointTime==undefined&&form.value.reAppointDate==undefined){
      this.addPrescription(precform,0)
    }
    else if(form.value.reAppointTime=="reAppointTime"&&form.value.reAppointDate=="reAppointDate"){
      this.addPrescription(precform,0)
    }
    else if(form.value.reAppointTime=="reAppointTime"&&form.value.reAppointDate!=""){
      this.timeflag=true
      this.messflag=true
      setTimeout(() => {
        this.messflag=false
      }, 1000);
    }
    else{
      let index=parseInt(form.value.reAppointTime)
      this.appoint.timeslotdto.slot_time=this.slot[index].slotTime
      this.appoint.timeslotdto.slotnumber=this.slot[index].slotNumber
      this.appoint.timeslotdto.doctorId=this.doctor
      this.appoint.appointmentDto.appointmentDate=form.value.reAppointDate.toISOString().substring(0,8)+form.value.reAppointDate.getDate()
      this.appoint.appointmentDto.patientId=parseInt(this.patient.patientId);
      this.appoint.appointmentDto.complain=this.patient.complain
      this.appoint.appointmentDto.doctorId=this.doctor
      this.services.post("Appointment",this.appoint).subscribe(
        res=>{
          this.addPrescription(precform,1)
        }
      )
     }}
    else{
      this.messflag=true
      setTimeout(() => {
        this.messflag=false
      }, 500);
    }
  }
weekendsDatesFilter = (d: any): boolean => {
  let doctorday=false;
  if(d!=undefined){  
    const day = d.getDay();
    if(this.fullschedule.find(e=>e.dayOfWork==day)){
      doctorday=true;
      }
      else  {doctorday=false;}      
  }
  return doctorday
}
freetime(date:any){
  let day=new Date(date.target.value).getDay();
  let tempday=new Date(date.target.value)
  tempday.setDate(tempday.getDate()+1)
  let actualdate=tempday.toISOString().substring(0,10)
  let tempfreetime:any=this.fullschedule.find(e=>e.dayOfWork==day)
  this.appoint.timeslotdto.dayofwork=new Date(date.target.value).getDay()
  this.busyslotslist=this.busyslot.find(e=>e.day.substring(0,10)==actualdate)
if(this.busyslot.find(e=>e.day.substring(0,10)==actualdate)){
  for(let i of this.busyslotslist.busySlots){
    let index=tempfreetime.slots.findIndex((e:any)=>e.slotTime==i)
    tempfreetime.slots.splice(index,1);
  }
  this.slot=tempfreetime.slots
}
else{
  this.slot=tempfreetime.slots
}
}


}
