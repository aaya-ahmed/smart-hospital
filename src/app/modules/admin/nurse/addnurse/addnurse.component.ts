import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { imageclass } from 'src/app/image/imageclass';
import { nurseData } from 'src/app/models/nurse';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-addnurse',
  templateUrl: './addnurse.component.html',
  styleUrls: ['../../../styles/addingform.css']
})
export class AddnurseComponent implements OnInit {
  departementsList:any[]=[];
  submitted:boolean=false;
  NurseInfo:FormGroup;
  id:string='';
  imagesource:imageclass=new imageclass();
  imageNurse:string='';
  errormessage:string=''
  constructor(private service:ServicesService,private fp:FormBuilder,private sidehost:SidemanagerService) { 
    this.NurseInfo=this.fp.group({
      firstName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(25) ]),
      lastName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(25) ]),
      userName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9_\s]*"),Validators.minLength(5)]),
      nationalId:new FormControl('',[Validators.required,Validators.pattern("^(2|3)[0-9]{6}(230)[0-9]{4}$"),Validators.minLength(14), Validators.maxLength(14)]),
      gender:new FormControl('',[Validators.required]),
      age:new FormControl(20,[Validators.required,Validators.pattern("^[2-9]|[0-9]{2}$"),Validators.min(18),Validators.max(60)]),
      mail:new FormControl('',[Validators.email]),
      phoneNumber:new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$") ,Validators.maxLength(11) ,Validators.minLength(11)]),
      address :new FormControl(''),
      bloodType:new FormControl(''),
      departmentName :new FormControl('',[Validators.required]),
      nurseDegree :new FormControl('',[Validators.required]),
      createdDtm:new FormControl('',[Validators.required]),
      isActive:new FormControl('')
    });
  }
  get nursefname(){
    return this.NurseInfo.controls['firstName']
  }
  get nurselname(){
      return this.NurseInfo.controls['lastName']
  }
  get nurseAge(){
    return this.NurseInfo.controls['age']
  }
  get nurseUserName(){
    return this.NurseInfo.controls['userName']
  } 
  get nurseNid(){
    return this.NurseInfo.controls['nationalId']
  } 
  get nurseGender(){
    return this.NurseInfo.controls['gender']
  }  
  get nurseMail(){
    return this.NurseInfo.controls['mail']
  }
  get nursePassword(){
    return this.NurseInfo.controls['password']
  }
  get nursePhone(){
    return this.NurseInfo.controls['phoneNumber']
  }
  get nurseAdress(){
    return this.NurseInfo.controls['address']
  }  
  get nurseImage(){
    return this.NurseInfo.controls['image']
  }
  get nurseDep(){
    return this.NurseInfo.controls['departmentName']
  }
  get nurseBloodType() {
    return this.NurseInfo.controls['bloodType'];
  }
  get nurseDeg(){
    return this.NurseInfo.controls['nurseDegree']
  }
  get Hdate(){
    return this.NurseInfo.controls['createdDtm']
  }
  get nurseactive(){
    return this.NurseInfo.controls['isActive']
  } 

  ngOnInit(): void {
    this.service.getdepartments().subscribe(
      res=>{
        this.departementsList=res
      }
    );
    this.sidehost.control.subscribe({
      next:res=>{
        if(res.data.id){
          this.id=res.data.id
          this.setnurse(res.data)
        }
        else{
          this.NurseInfo.addControl('image',new FormControl(''));
          this.NurseInfo.addControl('password',new FormControl('',[Validators.required,Validators.minLength(8)]))
        }
      }
    })
  }
  setnurse(nurse:any){
    let index=this.departementsList.findIndex(e=>e.departmentId==nurse.departmentId)
    this.NurseInfo.patchValue({
      ...nurse,
      createdDtm:nurse.createdDtm.substring(0,10)
    });
    console.log(this.NurseInfo.value)
  }
  addnurse(){
    let nurse:nurseData=
    {
      ...this.NurseInfo.value,
      nurseSpecialization:"",
      role:"Nurse",
      isActive:true,
      nurseNotes:'',
      image:this.imageNurse,
      departmentId:this.departementsList.find(p=>p.departmentName==this.nurseDep.value).departmentId
    }
    this.service.post("Nurse",nurse).subscribe(
      res=>{
        this.submitted=false;
        this.errormessage="wrong data"
      },
      err=>{
        if(err.status==200){
          this.close()
        }
      }
    )
  }
  upadatenurse(){
    let nurse={
      ...this.NurseInfo.value,
    nurseSpecialization:'',
    id:this.id,
    departmentId:this.departementsList.find(p=>p.departmentName==this.nurseDep.value).departmentId,
  }
    this.service.update("Nurse/update",nurse).subscribe(
      res=>{
          this.close()
      },
      err=>{
        this.submitted=false;
        this.errormessage="wrong data"
      }
        );
  }
  submitnurseData(){
    this.submitted=true
    if(this.NurseInfo.valid){
      if(this.id){
        this.upadatenurse()
      }
      else{
        this.addnurse()
      }
    }
  }
  setimage($event:any){
    if($event.target.files.length>0)
    this.imagesource.getbase64($event.target.files[0]).then(
      (res:any)=>{
        this.imageNurse=res.split(',').pop()
      }
  )
  }
  close(){
    this.sidehost.setControl({open:false,component:'',data:{}})
  }
}
