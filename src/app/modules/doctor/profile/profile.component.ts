import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css','../../styles/profilestyle2.css']
})
export class ProfileComponent implements OnInit {
  doctor:any;
  numOfIndoors=0;
  appointflag:boolean=false
  today=new Date();
  todayDate=''
  numberDetails:any={"numberOfTodayAppointment": 0,"numberOfAllAppointments": 8,"numberOfInDoorPatients": 2}
  appointment:any[]=[];
  image:any="../assets/profile.png"
  imagesrc:any
  loading:boolean=true
  constructor(private service:ServicesService,private sidehost:SidemanagerService) { }
  ngOnInit(): void {
    if(localStorage.getItem("userInfo")){
      this.doctor=localStorage.getItem("userInfo")
      this.doctor=JSON.parse(this.doctor)
    }
    this.imagesrc="https://localhost:7163/"+this.doctor.imageName+"?t="+new Date().getTime()
    this.todayDate=`${this.today.getMonth()+1}-${this.today.getDate()}-${this.today.getFullYear()}`
    this.service.get("Appointment/GetAppointmentsForTodayByDoctorId/"+this.doctor.id+"/"+this.todayDate).subscribe(
      (res:any)=>{
        this.appointment=res
        this.loading=false;
        if(this.appointment.length>0){
          this.appointflag=true
        }
    });
    this.service.get('Appointment/GetAppointmentsDetailsByDoctorId/'+this.doctor.id+'/'+this.todayDate).subscribe(
      (res:any)=>{
        this.numberDetails=res;
    })
  }
  uploadfile(file:any){
    this.getBase64(file).then(
      data => {
        this.image=data;
        this.image=this.image.split(",").pop()
        let doctor=this.doctor
        doctor.image=this.image
      this.service.update("Doctor/update",doctor).subscribe(
        (res:any)=>{
          let doctor=JSON.parse(localStorage.getItem('userInfo')||'');
          doctor.imageName=res.image
          this.doctor=doctor
          localStorage.removeItem("userInfo")
          localStorage.setItem("userInfo",JSON.stringify(doctor))
         this.imagesrc="https://localhost:7163/"+res.image+"?t="+new Date().getTime()
        }
      )
    });
  }
  getBase64(file:any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = () =>{ resolve(reader.result)};
      reader.onerror = error => reject(error);
    });
  } 
  openupdatepasswordside(){
    this.sidehost.setControl({component:'updatepassword',data:{data:this.doctor,controler:'Doctor/update'},open:true})
  }
  openupdateprofileside(){
    this.sidehost.setControl({component:'updateprofile',data:{data:this.doctor,controler:'Doctor/update'},open:true})
    let subscriber=this.sidehost.control.subscribe({
      next:res=>{
        if(res.open==false&&res.data){
          res.data.imageName=res.data.image
          res.data.image=null
          res.data.password=null
          res.data.departmentName=null
          delete res.data.passwordHash
          delete res.data.passwordSalt
          this.doctor={...res.data,departmentName:this.doctor.departmentName }
          localStorage.removeItem("userInfo")
          localStorage.setItem("userInfo",JSON.stringify(this.doctor))
          subscriber.unsubscribe()
        }
      }
    })
  }
}
