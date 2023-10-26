import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['../../../styles/addingform.css']
})
export class UpdatepasswordComponent implements OnInit {
  user:any
  controler:string=''
  subscriber:any
  passwordflag: boolean=false;
  submitted:boolean=false;
  userpassword:FormGroup=new FormGroup({
    password:new FormControl('',[Validators.pattern(""),Validators.required,Validators.minLength(8)])
  }  );
  constructor(private sidehost:SidemanagerService,private service:ServicesService) { }

  ngOnInit(): void {
    this.subscriber=this.sidehost.control.subscribe({
      next:res=>{
        if(res.data){
          this.user=res.data.data
          this.controler=res.data.controler;
        }
      }
    })
  }
  get password(){
    return this.userpassword.controls['password']
  }
  updatepassword(){
    this.submitted=true
    if(this.userpassword.valid){
        let newuser=this.user;
        console.log(newuser)
        newuser.password=this.password.value;
        this.service.update(`${this.controler}`,newuser).subscribe(
        res=>{
          this.close()
        },
        err=>{
            this.submitted=false
        }
      )
    }
  }
  close(){
    this.subscriber?.unsubscribe()
    this.sidehost.setControl({open:false,component:'',data:null})
  }

}
