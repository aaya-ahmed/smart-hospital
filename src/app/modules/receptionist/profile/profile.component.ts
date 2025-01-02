import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css',"../../styles/profilestyle2.css"]
})
export class ProfileComponent implements OnInit {
  receptionist:any;
  today:any=new Date();
  image:any
  imagesrc:any
  loadingimg=false;
  constructor(private service:ServicesService,private sidehost:SidemanagerService) { }
  ngOnInit(): void {
    if(localStorage.getItem("userInfo")){
      this.receptionist=localStorage.getItem("userInfo")
      this.receptionist=JSON.parse(this.receptionist)
      this.imagesrc="https://smarthospital.somee.com/"+this.receptionist.imageName+"?t="+new Date().getTime()
     }
    }
    uploadfile(file:any){
      this.getBase64(file).then(
        data => {
          this.image=data;
          this.image=this.image.split(",").pop()
          let receptionist=this.receptionist
          receptionist.image=this.image
          this.loadingimg=true
          console.log(receptionist)
        this.service.update("Admin/updateReceptionist",receptionist).subscribe(
          (res:any)=>{
            let temp=JSON.parse(localStorage.getItem('userInfo')||'')
            temp.imageName=res.image
            localStorage.setItem("Info",JSON.stringify(this.receptionist))
            this.imagesrc="https://smarthospital.somee.com/"+this.receptionist.imageName+"?t="+new Date().getTime()
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
      this.sidehost.setControl({component:'updatepassword',data:{data:this.receptionist,controler:'Admin/updateReceptionist'},open:true})
    }
    openupdateprofileside(){
      this.sidehost.setControl({component:'updateprofile',data:{data:this.receptionist,controler:'Admin/updateReceptionist'},open:true})
      this.sidehost.control.subscribe({
        next:res=>{
          if(res.open==false&&res.data){
            res.data.imageName=res.data.image
            res.data.image=null
            res.data.password=null
            res.data.departmentName=null
            delete res.data.passwordHash
            delete res.data.passwordSalt
            this.receptionist=res.data
            localStorage.removeItem("userInfo")
            localStorage.setItem("userInfo",JSON.stringify(this.receptionist))
          }
        }
      })
    }
}
