import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { doctor, doctors } from 'src/app/models/doctors';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css','../../styles/profilestyle2.css']
})
export class ProfileComponent implements OnInit {

  doctor:doctor
  today=new Date();
  requestList:any[]=[];
  image:any
  imagebase64:any
  srcimage:any;
  constructor(private service:ServicesService,private sidehost:SidemanagerService) { 
    this.doctor={
      "docDegree": '',
      "docSpecialization": '',
      "clinicalDoctor": false,
      "id": -1,
      "firstName": '',
      "lastName": '',
      "createdDtm": '',
      "age": -1,
      "nationalId":'',
      "image": null,
      "imageName": '',
      "bloodType": '',
      "phoneNumber": '',
      "address": '',
      "gender": '',
      "userName": '',
      "mail": '',
      "password": null,
      "role": null,
      "departmentId": -1,
      "departmentName": '',
      "isActive": true
    }
  }
  ngOnInit(): void {
    if(localStorage.getItem("userInfo")){
      this.doctor=JSON.parse(localStorage.getItem("userInfo")||'')
      this.srcimage="https://localhost:7163/"+ this.doctor.imageName+"?t="+new Date().getTime()
     }
    }
 
    uploadfile(file:any){
      this.getBase64(file).then(
        data => {
          this.imagebase64=data;
          this.imagebase64=this.imagebase64.split(",").pop();
          let doctor=this.doctor
          doctor.password= null
          doctor.role=null
          doctor.image=this.imagebase64
          this.service.update("Doctor/update",doctor).subscribe(
           (res:any)=>{
             this.srcimage="https://localhost:7163/"+res.image+"?t="+new Date().getTime()
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
            delete res.data.passwordSalt
            delete res.data.passwordHash
            res.data.imageName=res.data.image
            res.data.image=null
            this.doctor={...res.data,departmentName:this.doctor.departmentName }
            localStorage.removeItem("userInfo")
            localStorage.setItem("userInfo",JSON.stringify(this.doctor))
            subscriber.unsubscribe()
          }
        }
      })
    }
 
}
