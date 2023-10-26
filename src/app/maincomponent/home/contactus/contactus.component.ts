import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser'
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  email:FormGroup=new FormGroup({
    subject: new FormControl('',Validators.required),
    message:new FormControl('',Validators.required),
    from_name:new FormControl('',[Validators.required,Validators.email]),
    to_name: new FormControl('hospital',Validators.required)
  })
  loader:boolean=false
  issent:number=0;
  constructor() { }

  ngOnInit(): void {
  }
  sendemail(){
    if(this.email.valid){
      this.loader=true;
      emailjs.send("service_d99j9tl","template_3dtc1gf",this.email.value,'wAg78t0zNh3DqGimN').then(
        res=>{
          this.loader=false;
          this.issent=1;
          this.email.reset()
          let timer=setTimeout(() => {
            this.issent=0
            clearTimeout(timer)
          }, 2000);
        },
        err=>{
          this.issent=2
        }
      );
    }
  }
}
