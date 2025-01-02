import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css','../../styles/profilestyle2.css']
})
export class ProfileComponent implements OnInit {
  loadingimg=false;
  patientlistnumber:number=0
  loading:boolean=true
  srcimage:string="../assets/profile.png"
  patientlist:any[]=[]
  nurse:any
  imagebase64:any
  department:string=''
  constructor(private service:ServicesService,private sidehost:SidemanagerService) { }
  ngOnInit(): void {
    if(localStorage.getItem("userInfo")){
      this.nurse=localStorage.getItem("userInfo")
      this.nurse=JSON.parse(this.nurse)
      this.srcimage="https://smarthospital.somee.com/"+this.nurse.imageName+"?t=" + new Date().getTime()
      this.department=this.nurse.departmentName
      let departmentid=this.nurse.departmentId
      this.service.get("Patient/GetInDoorPatients/"+departmentid).subscribe(
        (res:any)=>{
          this.patientlist=res
          this.loading=false;
          if(this.patientlist.length>0){
            this.patientlistnumber=this.patientlist.length
          }
        }
      )
     }

  }
  uploadfile(file:any){
    this.getBase64(file).then(
      data => {
        this.imagebase64=data;
        this.imagebase64=this.imagebase64.split(",").pop();
        let nurse=this.nurse
        nurse.image=this.imagebase64
        this.loadingimg=true
        this.service.update("Nurse/update",nurse).subscribe(
         (res:any)=>{
          res.imageName=res.image
          res.password=null
          res.role=null
          res.image=null
          delete res.passwordHash
          delete res.passwordSalt
          res.departmentName=this.nurse.departmentName
          this.nurse=res
          localStorage.removeItem("Info")
          localStorage.setItem("Info",JSON.stringify(this.nurse))
          this.srcimage="https://smarthospital.somee.com/"+res.imageName+"?t=" + new Date().getTime()  
          this.loadingimg=false
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
    this.sidehost.setControl({component:'updatepassword',data:{data:this.nurse,controler:'Nurse/update'},open:true})
  }
  openupdateprofileside(){
    this.sidehost.setControl({component:'updateprofile',data:{data:this.nurse,controler:'Nurse/update'},open:true})
    let subscriber=this.sidehost.control.subscribe({
      next:res=>{
        if(res.open==false&&res.data){
          res.data.imageName=res.data.image
          res.data.image=null
          res.data.password=null
          res.data.departmentName=null
          delete res.data.passwordHash
          delete res.data.passwordSalt
          this.nurse={...res.data,departmentName:this.nurse.departmentName }
          localStorage.removeItem("userInfo")
          localStorage.setItem("userInfo",JSON.stringify(this.nurse))
          subscriber.unsubscribe()
        }
      }
    })
  }
}
