import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { ShardserviceService } from 'src/app/services/shardservice.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-add-vital-sign',
  templateUrl: './add-vital-sign.component.html',
  styleUrls: ['../../../styles/addingform.css'],

})
export class AddVitalSignComponent implements OnInit ,OnDestroy {
  today:any=new Date();
  ecg:any=null
  submitted:boolean=false
  successflag:boolean=false
  errorflag:boolean=false
  vitalform:FormGroup=new FormGroup(
    {pressure:new FormControl('',[Validators.required,Validators.maxLength(8),Validators.pattern('^([0-9]{3})([/ -])([0-9]{2})$')]),
     pulserate:new FormControl('',[Validators.required,Validators.maxLength(3)]),
     temperature:new FormControl('',[Validators.required,Validators.maxLength(2)]),
     ecg:new FormControl(''),
     respirationrate:new FormControl('',[Validators.required,Validators.maxLength(3)]),
     titlenote:new FormControl(''),
     exnote:new FormControl('')
  }
  )
  constructor(private services:ServicesService,private sidemanagerservice:SidemanagerService,private route:Router) { }
  ngOnDestroy(): void {
    this.sideHostSubscriber?.unsubscribe()
  }
 user:any={
  patientid:0,
  patientname:'',
  nurseid:0,
  nursename:'',
  patientage:0,
  indoorPatientId:0
}
sideHostSubscriber:any;
  ngOnInit(): void {
    // this.user=this.shared.userinfo;
    this.sideHostSubscriber=this.sidemanagerservice.control.subscribe({
      next:res=>{
        this.user=res.data
        if(this.user.indoorPatientId==0){
          this.route.navigate(['../nurse/in-patient'])
        }
      }
    })
  }
  get vitalpressure() {
    return this.vitalform.controls['pressure'];
  }
  get vitalpulserate() {
    return this.vitalform.controls['pulserate'];
  }
  get vitaltemperature() {
    return this.vitalform.controls['temperature'];
  }
  get vitalrespirationrate() {
    return this.vitalform.controls['respirationrate'];
  }
  add_vital(){
    this.submitted=true
    if(this.vitalform.valid){
      this.today=this.today.toISOString()
    let vital={
      pressure: this.vitalform.controls['pressure'].value ,
      pulseRate:parseInt(this.vitalform.controls['pulserate'].value),
      temperature:parseInt(this.vitalform.controls['temperature'].value),
      ecg: null,
      respirationRate:parseInt(this.vitalform.controls['respirationrate'].value),
      vitals_date: this.today,
      nurseId:this.user.nurseid,
      noteDto: {
        subject: this.vitalform.controls['titlenote'].value,
        createdDate: this.today,
        body:  this.vitalform.controls['exnote'].value,
        nurseId: this.user.nurseid,
        indoorPatientRecordId:this.user.indoorPatientId
      },
      patientId:this.user.patientid
    };
    this.services.post('VitalSigns/AddVitalSignes',vital).subscribe(
      res=>{
        this.successflag=true;
        setTimeout(() => {
          this.successflag=false;
          this.submitted=false
          this.vitalform.reset()
        }, 1000);

      },
      err=>{
        this.errorflag=true;
        setTimeout(() => {
          this.errorflag=false;
          this.submitted=false
        }, 1000);

      }
    )  
      }
    

  }
  uploadfile(file:any){
    this.getBase64(file).then(
      data => {
        this.ecg=data;
        this.ecg=this.ecg.split(",").pop();
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
  close(data?:any){
    this.sidemanagerservice.setControl({open:false,component:'',data:data});
  }
}
