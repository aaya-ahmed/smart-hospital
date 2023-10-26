import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['../../../styles/addingform.css']
})
export class UpdateprofileComponent implements OnInit {
  user:any;
  updateflag:boolean=false
  controler:string=''
  userForm:FormGroup=new FormGroup({
    userName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9'-'\s]*")]),
    firstName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(10) ]),
    lastName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3),Validators.maxLength(14) ]),
    nationalId:new FormControl('',[Validators.required,Validators.pattern("^(2|3)[0-9]{6}(230)[0-9]{4}$"),Validators.minLength(14), Validators.maxLength(14)]),
    address:new FormControl(''),
    gender:new FormControl('',[Validators.required]),
    age:new FormControl(0,[Validators.required,Validators.min(20),Validators.max(90)]),
    mail:new FormControl('',[Validators.email]),
    bloodType:new FormControl(''),
    phoneNumber:new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$") ,Validators.maxLength(11) ,Validators.minLength(11)]),
    }  );
    nationalidflag:boolean=false
    submitted:boolean=false;
    subscriber:any
  constructor(private service:ServicesService,private sidemanagment:SidemanagerService) { }

  ngOnInit(): void {
    this.subscriber=this.sidemanagment.control.subscribe(
      res=>{
        this.user=res.data.data;
        this.controler=res.data.controler;
        this.userForm.setValue({
          userName:this.user.userName,
          gender:this.user.gender,
          age:this.user.age,
          mail:this.user.mail,
          bloodType:this.user.bloodType,
          phoneNumber:this.user.phoneNumber,
          address :this.user.address,
          firstName:this.user.firstName,
          lastName:this.user.lastName,
          nationalId:this.user.nationalId
          } )
      })
  }
  get userFname(){
    return this.userForm.controls['firstName']
  }
  get userLname(){
    return this.userForm.controls['lastName']
  }
  get userAddress(){
    return this.userForm.controls['address']
  }
  get usernid(){
    return this.userForm.controls['nationalId']
  }
  get userAge(){
    return this.userForm.controls['age']
  }
  get userUserName(){
    return this.userForm.controls['userName']
  } 
  get userGender(){
    return this.userForm.controls['gender']
  }  
  get userMail(){
    return this.userForm.controls['mail']
  } 
  get userPhone(){
    return this.userForm.controls['phoneNumber']
  }
  get userAdress(){
    return this.userForm.controls['address']
  }  
  get userBloodType() {
    return this.userForm.controls['bloodType'];
  } 
  update(){
    this.submitted=true
    if(this.userForm.valid){
      let user=this.user
      user={...user,...this.userForm.value}
      delete user.password
      this.service.update(`${this.controler}`,user).subscribe(
        (res:any)=>{
        this.close(res)
      },
      err=>{
        this.submitted=false
      })
    }
  }
  close(data=null){
    this.subscriber?.unsubscribe()
    this.sidemanagment.setControl({open:false,component:'',data:data})
  }
  validationntionalid(event:any){
    let id=event.target.value
    if(parseInt(id.substring(1,3))>22){
      if((parseInt(id.substring(3,5))<13)&&(parseInt(id.substring(3,5))>0)){
        if((parseInt(id.substring(5,7))<=31)&&(parseInt(id.substring(5,7))>0)){
          this.nationalidflag=true;
        }
        else{
          this.nationalidflag=false;
        }
      }
      else{ this.nationalidflag=false;}
    }
    else{ this.nationalidflag=false;}
  }


}
