import { Component, OnInit } from '@angular/core';
import { partinfopatient } from 'src/app/models/patient';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-reverse-patient',
  templateUrl: './reverse-patient.component.html',
  styleUrls: ['./reverse-patient.component.css']
})
export class ReversePatientComponent implements OnInit {
  patients:partinfopatient[]=[]
  templist:partinfopatient[]=[]
  doctors:any[]=[]
  rooms:any[]=[]
  freebeds:any[]=[]
  today=new Date()

  patientRevesion={
    causeOfAdmission:"",
    roomId: 0,
    bedId: 0,
    departmentId: 0,
    oralMedicalHistory: "",
    orderdByDoctorId: 0,
    patientId: 0,
    enterDate: ""
  }
  departmentname:string="";
  departmentid:number=0
  successflag:boolean=false;
  errorflag:boolean=false
  pageflag:boolean=false
  constructor(private service:ServicesService) { }
  ngOnInit(): void {
    let user:any=localStorage.getItem('userInfo')
    this.departmentid=JSON.parse(user).departmentId
    this.departmentname=JSON.parse(user).departmentName
    this.service.get("Patient/getAllPatients").subscribe(
      (res:any)=>{
        if(res){
          this.patients=res;
        this.pageflag=true
        }
        else{
          this.pageflag=false
        }
      }
    )
    this.service.get("Admin/GetFreeRooms").subscribe(
      (res:any)=>{
        this.rooms=res
      }
    )
    this.service.get("Departments/getEmpsByDepartmentId/"+this.departmentid).subscribe(
     (res:any)=>{
        this.doctors=res.doctorDtos
      }
    )   
  }
  getfreebeds(event:any){
    this.service.get("Admin/GetFreeBedsByRoomId?RoomId="+parseInt(event.target.value)).subscribe(
      (res:any)=>{
        this.freebeds=res
      }
    )
  }
submit(form:any){
  if(form.valid){
    let patient:any=this.patients.find((n:any)=>(n.firstName+" "+n.lastName)==form.value.patient)?.id
    this.patientRevesion.causeOfAdmission=form.value.causeOfAdmission
    this.patientRevesion.oralMedicalHistory=form.value.oralMedicalHistory
    this.patientRevesion.patientId=patient
    this.patientRevesion.departmentId=this.departmentid
    this.patientRevesion.orderdByDoctorId=parseInt(form.value.doctor)
    this.patientRevesion.bedId=parseInt(form.value.bed)
    this.patientRevesion.roomId=parseInt(form.value.room)
    this.patientRevesion.enterDate=this.today.toISOString().substring(0,10)
     this.service.post("Patient/ReservePatient",this.patientRevesion).subscribe(
       res=>{},
       (err:any)=>{
         if(err.status==200){
           this.successflag=true
           setTimeout(() => {
             this.successflag=false
             form.reset()
             form.submitted=false
           }, 1000);
         }
         else{
           this.errorflag=true
           setTimeout(() => {
             this.errorflag=false
           }, 1000);
         }
       
       }
     )
  }

}
filtername(event:any){
  let name=String(event.target.value)
  let length=name.length
  this.templist=this.patients
  this.patients=[]
  for(let i of this.templist){
    let pname=i.firstName+i.lastName
    if(pname.substring(0,length).toLocaleLowerCase()==name){
      this.patients.push(i)
     }
  }
}
}
