import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser'
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  mail:FormGroup=new FormGroup({
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
    if(this.mail.valid){
      this.loader=true;
      emailjs.send("service_kadvtfh","template_66a1fpr",this.mail.value,'A_im0Pw7bhdGvjOxQ').then(
        res=>{
          this.loader=false;
          this.issent=1;
          this.mail.patchValue({
            message:'',
            subject:'',
            from_name:''
          })
          
          let timer=setTimeout(() => {
            this.issent=0
            clearTimeout(timer)
          }, 2000);
        },
        err=>{
          this.issent=2
          this.loader=false;
          let timer=setTimeout(() => {
            this.issent=0
            clearTimeout(timer)
          }, 2000);
        }
      );
    }
  }
}
