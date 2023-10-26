import { Component, Input, OnInit } from '@angular/core';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  user:any;
  @Input()controller:string='';
  showdata:boolean=false;
  constructor(private sidehost:SidemanagerService) { }
  ngOnInit(): void {
    if(localStorage.getItem("userInfo")){
      this.user=localStorage.getItem("userInfo")
      this.user=JSON.parse(this.user)
      if(this.user.role=='Doctor'||'nurse')this.showdata=true
    }
  }
  openupdateprofileside(){
    this.sidehost.setControl({component:'updateprofile',data:{data:this.user,controler:this.controller},open:true})
    let subscriber=this.sidehost.control.subscribe({
      next:res=>{
        if(res.open==false&&res.data){
          res.data.imageName=res.data.image
          res.data.image=null
          res.data.password=null
          delete res.data.passwordHash
          delete res.data.passwordSalt
          if(res.data.departmentName){
            res.data.departmentName=null
            this.user={...res.data,departmentName:this.user.departmentName }
          }
          else{
            this.user=res.data
          }
          localStorage.removeItem("userInfo")
          localStorage.setItem("userInfo",JSON.stringify(this.user))
          subscriber.unsubscribe()
        }
      }
    })
  }
}
