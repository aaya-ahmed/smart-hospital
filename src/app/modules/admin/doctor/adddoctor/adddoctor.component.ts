import {Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { imageclass } from 'src/app/image/imageclass';
import { list_department } from 'src/app/models/department';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';
@Component({
  selector: 'app-adddoctor',
  templateUrl: './adddoctor.component.html',
  styleUrls: ['../../../styles/addingform.css']
})
export class AdddoctorComponent implements OnInit ,OnDestroy{
  departments:list_department[]=[];
  doctorInfo:FormGroup;
  user:string='';
  errorMessage:string='';
  responceFlag:boolean=false;
  submitted:boolean = false;
  today=new Date().toISOString()
  imagedoctor:string=''
  imageclass=new imageclass();
  sideHostSubscriber:Subscription|undefined
  constructor(private fb:FormBuilder,private services:ServicesService ,private sidemanagerservice:SidemanagerService) {
    this.doctorInfo=this.fb.group({
      firstName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(15) ]),
      lastName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(20) ]),
      userName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9'-'\s]*")]),
      nationalId:new FormControl('',[Validators.required,Validators.pattern("^(2|3)[0-9]{6}(230)[0-9]{4}$"),Validators.minLength(14), Validators.maxLength(14)]),
      gender:new FormControl('',[Validators.required]),
      age:new FormControl(20,[Validators.min(20),Validators.max(90)]),
      mail:new FormControl('',[Validators.email]),
      bloodType:new FormControl(''),
      phoneNumber:new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$") ,Validators.maxLength(11) ,Validators.minLength(11)]),
      address :new FormControl(''),
      departmentName :new FormControl('',[Validators.required]),
      docDegree :new FormControl('',[Validators.required]),
      docSpecialization :new FormControl('',[Validators.required]),
      createdDtm:new FormControl('',[Validators.required]),
      clinicalDoctor:new FormControl(false,[Validators.required]),
      isActive:new FormControl('')
    });
  }
  ngOnInit(): void {
    this.setFormGroup();
     let departmentSubscriber=this.services.getdepartments().subscribe(
      res=>{
        this.departments=res;
        departmentSubscriber.unsubscribe()
      });
  }
  setFormGroup(){ 
    this.sideHostSubscriber=this.sidemanagerservice.control.subscribe({
      next:responce=>{
        if(responce.data.id){
          this.user=responce.data.id;
          this.doctorInfo.patchValue({...responce.data,createdDtm:responce.data.createdDtm.substring(0,10)});
        }
        else{
          this.doctorInfo.addControl('image',new FormControl(''))
          this.doctorInfo.addControl('password',new FormControl('',[Validators.required,Validators.minLength(8)]));
        }
      }
     });

  }
  get doctorfname(){
    return this.doctorInfo.controls['firstName']
  }
  get doctorlname(){
      return this.doctorInfo.controls['lastName']
  }
  get doctorAge(){
    return this.doctorInfo.controls['age']
  }
  get doctorUserName(){
    return this.doctorInfo.controls['userName']
  }
  get doctorNid(){
    return this.doctorInfo.controls['nationalId']
  }
  get doctorGender(){
    return this.doctorInfo.controls['gender']
  }
  get doctorSpecalization(){
    return this.doctorInfo.controls['docSpecialization']
  }   
  get doctorMail(){
    return this.doctorInfo.controls['mail']
  } 
  get doctorPassword(){
    return this.doctorInfo.controls['password']
  }
  get doctorPhone(){
    return this.doctorInfo.controls['phoneNumber']
  }
  get doctorAdress(){
    return this.doctorInfo.controls['address']
  }  
  get doctorDep(){
    return this.doctorInfo.controls['departmentName']
  }
  get doctorBloodType() {
    return this.doctorInfo.controls['bloodType'];
  } 
  get doctorDeg(){
    return this.doctorInfo.controls['docDegree']
  }
  get Hdate(){
    return this.doctorInfo.controls['createdDtm']
  }
  get doctoractive(){
    return this.doctorInfo.controls['isActive']
  }
  setdoctorimage(file:any){
    if(file.target.files.length>0)
    this.imageclass.getbase64(file.target.files[0]).then((res:any)=>{
        this.imagedoctor=res.split(',').pop()
    });
  }
  adddoctor(){
    let doctor={
      ...this.doctorInfo.value,
      role:"Doctor",
      image:this.imagedoctor,
      departmentId:this.departments.find(p=>p.departmentName==this.doctorDep.value)?.departmentId
    }
    this.services.post("Doctor",doctor).subscribe({
      next:res=>{
        this.responceFlag=false;
        this.errorMessage="wrong data"
      },
      error:(err:any)=>{
        if(err.status==200){
          this.close(err);
        }
        else{
          this.responceFlag=false;
          this.errorMessage=err.error.text
          }
        }
    })
  }
  updatedoctor(){
    let doctor:any={
      ...this.doctorInfo.value,
      id:this.user,
      role:"Doctor",
      departmentId:this.departments.find(p=>p.departmentName==this.doctorDep.value)?.departmentId
    };
    this.services.update("Doctor/update",doctor).subscribe(
      (res)=>{
        this.responceFlag=true;
        this.close(res);
      },
      err=>{
        this.responceFlag=false;
        this.errorMessage=err.error.text;
      }
    );
  }
  submit(){
    this.submitted=true
    if(this.doctorInfo.valid){
      if(this.user!=''){
        this.updatedoctor()
      }
      else{
       this.adddoctor()
      }
    }
  }
  close(data?:any){
    this.sidemanagerservice.setControl({open:false,component:'',data:data});
  }
  ngOnDestroy(): void {
    console.log("D")
    this.sideHostSubscriber?.unsubscribe()
  }
}
