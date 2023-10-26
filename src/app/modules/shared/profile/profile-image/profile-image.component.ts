import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit {
  @Input()controller:string='';
  user:any;
  image:any="../assets/profile.png";
  imagesrc:any;
  constructor(private service:ServicesService,private sidehost:SidemanagerService) { }
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('userInfo')||'');
    if(this.user.imageName&&this.user.imageName!='')
    this.imagesrc="https://smarthospital.somee.com/"+this.user.imageName+"?t="+new Date().getTime()
    else
    this.imagesrc=this.image
  }
  uploadfile(file:any){
    this.imagesrc='../assets/Spinner.svg'
    this.getBase64(file).then(
      data => {
        this.image=data;
        this.image=this.image.split(",").pop()
        let user=this.user
        user.image=this.image
      this.service.update(this.controller,user).subscribe(
        (res:any)=>{
          let user=JSON.parse(localStorage.getItem('userInfo')||'');
          user.imageName=res.image
          localStorage.removeItem("userInfo")
          localStorage.setItem("userInfo",JSON.stringify(user))
         this.imagesrc="https://smarthospital.somee.com/"+res.image+"?t="+new Date().getTime()
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
    this.sidehost.setControl({component:'updatepassword',data:{data:this.user,controler:this.controller},open:true})
  }

}
