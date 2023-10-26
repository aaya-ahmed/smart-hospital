import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { logindata } from 'src/app/models/login';
import { LogInAndOutService } from 'src/app/services/log-in-and-out.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loader:boolean=false
    //validation requirement for loginform
    login:FormGroup=new FormGroup({
      UserName:new FormControl('',[Validators.required]),
      Password:new FormControl('',[Validators.required])
    });
    //make variabe for error message when don't found user
    message:string='';
  constructor(private route:Router,private service:LogInAndOutService,private hostsetvice:SidemanagerService) { }
  ngOnInit(): void {
  }

  //to get control list for each element in form
  get UserNamev(){
    return this.login.controls['UserName']
  }
  get Passwordv(){
    return this.login.controls['Password']
  }
  submit(){
    if(this.login.valid){
      this.loader=true
      this.message='';
      this.service.auth_user(this.login.value).subscribe(
        (res:any)=>{
         if(res.status=='successful'){
          const helper = new JwtHelperService();
          const decodedToken = helper.decodeToken(res.token);
          let id= decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
          let role=res.role.toLowerCase()
          this.service.getinfo(role,id).subscribe(
          (res:any)=>{
            if(role.toLowerCase ()=="doctor"&&res.departmentName=="Scan"){
              role="scan doctor"
            }
            else if(role.toLowerCase ()=="doctor"&&res.departmentName=="Labs"){
              role="lab doctor"
            }
            localStorage.setItem("userInfo",JSON.stringify(res));
            localStorage.setItem("userRole",role.toLowerCase());
            localStorage.setItem("userToken",res.token);
            localStorage.setItem("login","true")
            this.route.navigate(['/'+role.toLowerCase ()])
            this.close()
          }
        );
          }
          else{
            this.loader=false
            this.message=res.status
          }
        },
       (err:any)=>{
          this.loader=false
          this.message=err.message
        }
        );
      }
  }
  close(){
    this.hostsetvice.setControl({open:false,component:'',data:''})
  }
  gotoreg(){
    this.hostsetvice.setControl({open:false,component:'',data:''})
    this.hostsetvice.setControl({open:true,component:'register',data:''})

  }

}
