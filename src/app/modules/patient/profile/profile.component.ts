import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SidemanagerService } from 'src/app/services/sidemanager.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css','../../styles/profilestyle2.css']
})
export class ProfileComponent implements OnInit {
  patient:any;
  numOfIndoorRec:number=0;
  srcimage:any
  nationalidflag:boolean=false
  image:any
  constructor(private service:ServicesService,private sidehost:SidemanagerService) { }
 
  ngOnInit(): void {
    if(localStorage.getItem("userInfo")){
      this.patient=localStorage.getItem("userInfo")
      this.patient=JSON.parse(this.patient)
      this.srcimage="https://smarthospital.somee.com/"+this.patient.imageName+"?t="+new Date().getTime()
     }
    this.service.get("Patient/GetIndoorPatientRecordsByPatientId/"+this.patient.id).subscribe(
      (res:any)=>{
        this.numOfIndoorRec=res.length;
      }
    )
    }
  uploadfile(file:any){
    this.getBase64(file).then(
      data => {
        this.image=data;
        this.image=this.image.split(",").pop()
        let patient=this.patient
        patient.image=this.image
      this.service.update("patient/update",patient).subscribe(
        (res:any)=>{
         delete res.passwordSalt
         delete res.passwordHash
         res.imageName=res.image
         res.image=null
         res.role=null
        res.password=null
         this.patient=res
         localStorage.removeItem("userInfo")
         localStorage.setItem("userInfo",JSON.stringify(this.patient))
         this.srcimage="https://smarthospital.somee.com/"+this.patient.imageName+"?t="+new Date().getTime()
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
    this.sidehost.setControl({component:'updatepassword',data:{data:this.patient,controler:'Patient/update'},open:true})
  }
  openupdateprofileside(){
    this.sidehost.setControl({component:'updateprofile',data:{data:this.patient,controler:'Patient/update'},open:true})
    let subscriber=this.sidehost.control.subscribe({
      next:res=>{
        if(res.open==false&&res.data){
          delete res.data.passwordSalt
          delete res.data.passwordHash
          res.data.imageName=res.data.image
          res.data.image=null
          this.patient={...res.data,departmentName:this.patient.departmentName }
          localStorage.removeItem("userInfo")
          localStorage.setItem("userInfo",JSON.stringify(this.patient))
          subscriber.unsubscribe()
        }
      }
    })
  }
}
