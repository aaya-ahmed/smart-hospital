import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { imageclass } from 'src/app/image/imageclass';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['../../../styles/addingform.css']
})
export class AddemployeeComponent implements OnInit {
  @Input()data:any;
  receptionistInfo:FormGroup;
  submitted:boolean=false;
  today:string=new Date().toISOString();
  image:string='';
  message:string='';
  imageclass=new imageclass()
  get receptionistfname(){
    return this.receptionistInfo.controls['firstName']
  }
  get receptionistlname(){
    return this.receptionistInfo.controls['lastName']
  }
  get receptionistAge(){
    return this.receptionistInfo.controls['age']
  }
  get receptionistUserName(){
    return this.receptionistInfo.controls['userName']
  }
  get receptionistNid(){
    return this.receptionistInfo.controls['nationalId']
  }
  get receptionistGender(){
    return this.receptionistInfo.controls['gender']
  }
  get receptionistMail(){
    return this.receptionistInfo.controls['mail']
  }
  get receptionistPassword(){
    return this.receptionistInfo.controls['password']
  }
  get receptionistPhone(){
    return this.receptionistInfo.controls['phoneNumber']
  }
  get receptionistAdress(){
    return this.receptionistInfo.controls['address']
  }
  get receptionistBloodType() {
    return this.receptionistInfo.controls['bloodType'];
  }
  get Hdate(){
    return this.receptionistInfo.controls['createdDtm']
  }
  get receptionistactive(){
    return this.receptionistInfo.controls['isActive']
  }
  constructor(private services:ServicesService,private fb:FormBuilder,private sidemanager:SidemanagerService) { 
    this.receptionistInfo=this.fb.group({
      firstName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(10) ]),
      lastName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(10) ]),
      userName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9'-'\s]*")]),
      nationalId:new FormControl('',[Validators.required,Validators.pattern("^(2|3)[0-9]{6}(230)[0-9]{4}$"),Validators.minLength(14), Validators.maxLength(14)]),
      gender:new FormControl('',[Validators.required]),
      age:new FormControl(20,[Validators.min(20),Validators.max(90)]),
      mail:new FormControl('',[Validators.email]),
      bloodType:new FormControl(''),
      phoneNumber:new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$") ,Validators.maxLength(11) ,Validators.minLength(11)]),
      address :new FormControl(''),
      createdDtm:new FormControl('',[Validators.required]),
      isActive:new FormControl('')
    });
  }
  ngOnInit(): void {
    if(!this.data?.id){
      this.receptionistInfo.addControl('image',new FormControl(''));
      this.receptionistInfo.addControl('password',new FormControl('',[Validators.required,Validators.minLength(8)]));
    }
    else{
      this.setreceptionist()
    }

  }
  uploadfile($event:any){
    if($event.target.files.length>0)
    this.imageclass.getbase64($event.target.files[0]).then((res:any)=>{
        this.image=res.split(',').pop()
    });
  }
  updateReceptionist(){
    let receptionist={
      ...this.receptionistInfo.value,
      id:this.data.id}
    this.services.update("Admin/updateReceptionist",receptionist).subscribe(
      (res)=>{
        this.close()
      },
      err=>{
        this.submitted=false;
        this.message=err.error.text
      });
  }
  addReceptionist(){
    let receptionist={
      ...this.receptionistInfo.value,
      role:"Receptionist",
      image:this.image
    }
    this.services.post("Admin/receptionist",receptionist).subscribe(
      (res:any)=>{
        this.submitted=false;
        this.message="wrong data";
      },
      (err:any)=>{
        if(err.error.text!="Username already taken."){
          this.close()
        }
        else{
          this.submitted=false;
          this.message="Username already taken.";
        }
      }
    )
  }
  submit(){
    this.submitted=true
    if(this.receptionistInfo.valid){
      if(this.data?.id){
        this.updateReceptionist()
      }
      else{
        this.addReceptionist()
    }
  }
  }
  setreceptionist(){
    this.receptionistInfo.patchValue({
      ...this.data,
      createdDtm:this.data.createdDtm.substring(0,10),
    });
  }
  close(){
    this.sidemanager.setControl({open:false,component:'',data:{}})
  }
}
