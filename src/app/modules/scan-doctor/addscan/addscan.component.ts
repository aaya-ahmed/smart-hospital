import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { image, patientscan, requestscan } from 'src/app/models/scan';
import { ServicesService } from 'src/app/services/services.service';
import { ShardserviceService } from 'src/app/services/shardservice.service';


@Component({
  selector: 'app-addscan',
  templateUrl: './addscan.component.html',
  styleUrls: ['./addscan.component.css']
})
export class AddscanComponent implements OnInit {
   imagebase64:any;
   image:any;
   imagelist:image[]=[{content:'./assets/upload.svg'}];
   imageflag=0;
   dateray=new Date().toISOString();
   scanform:FormGroup
   patientscan:patientscan=
   {
     scanRequestId: 0,
     scanImages: [],
     writtenReport: '',
     scanDate: '',
     indoorPatientRecordId: null
   };
   request:requestscan={
     id: -1,
     scanName: '',
     patientName: '',
     doctorName: '',
     indoorPatientRecordId: null,
     scanId: 0,
     createdDtm: '',
     patientId: 0,
     doctorId: 0
   }
  submitted:boolean=false;
  constructor(private shared:ShardserviceService,private fb:FormBuilder,private router:Router,private service:ServicesService) {
    this.scanform=this.fb.group({
        doctorName:new FormControl('',Validators.required),
        patientName:new FormControl('',Validators.required),
        date:new FormControl('',Validators.required),
        scanName:new FormControl('',Validators.required),
        report:new FormControl('',Validators.required)
    })
  }
  ngOnInit(): void {
    console.log(this.shared.request)
    if(this.shared.request.id!=-1){
      this.request=this.shared.request
      this.scanform.patchValue({
        doctorName:this.shared.request.doctorName,
        patientName:this.shared.request.patientName,
        date:new Date().toISOString().substring(0,10),
        scanName:this.shared.request.scanName
      });
      this.scanform.controls['doctorName'].disable()
      this.scanform.controls['patientName'].disable()
      this.scanform.controls['scanName'].disable()
    }
  }
  uploadfile(file:any){
    if(file.target.files.length>0)
    this.getBase64(file).then(
      data => {
        this.imagebase64=data;
        this.imagelist.push({content:this.imagebase64});
      }
    );
  }
  getBase64(file:any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = () =>{ 
        if(this.imageflag==0){
        this.imagelist.pop();
        this.imageflag=1;
      }
       resolve(reader.result)};
      reader.onerror = error => reject(error);
    });
  }
  cancelimage(index:number){
    this.imagelist.splice(index,1);
    if(this.imagelist.length==0){
      this.imagelist.push({content:'./assets/upload.svg'})
      this.imageflag=0
    }
  }
  submit(){
    if(this.request.id==-1){
      this.print()
    }
    else{
      this.addscan()
    }
  }
  print(){
    var pdf = new jsPDF();
    for (let i of this.imagelist){
      pdf.addImage(i.content,'png',20,10,180,265);
      pdf.addPage()
    }
    pdf.addImage('assets/logo.png', 'png', 10, 5, 15, 15);
    pdf.text('university hospital',25,15)
    //patient name
    pdf.text('patient name : ',10,30);
    pdf.text(this.scanform.value.patientName,50,30);
    //doctor name
    pdf.text('doctor name : ',10,40);
    pdf.text(this.scanform.value.doctorName,50,40);
    //date
    pdf.text('Date : ',100,30);
    pdf.text(this.dateray.substring(0,10),150,30);
    //ray name
    pdf.text('ray name : ',100,40);
    pdf.text(this.scanform.value.scanName,150,40);
    //line
    pdf.line(10,60,200,60);
    //report----
    var splitText = pdf.splitTextToSize(this.scanform.value.report, 150);
    var y=70;
    for(var i = 0; i < splitText.length; i++){
      if (y > 275){
        y = 20;
        pdf.addPage();
      }
      pdf.text( splitText[i],20, y);
      y = y + 10
    }
    window.open(pdf.output('bloburl'))?.print()
  }
  cancel(){
    this.router.navigateByUrl('scan doctor/profile')
  }
  addscan(){
    if(this.scanform.valid&&this.imagelist.length>0){
      this.submitted=true
      let patientscan:patientscan=
      {
        scanRequestId:  this.request.id,
        scanImages: [],
        writtenReport: this.scanform.value.report,
        scanDate: this.scanform.value.date,
        indoorPatientRecordId: this.request.indoorPatientRecordId
      };
      this.imagelist.forEach((item)=>{
        patientscan.scanImages.push({content:item.content.split(",").pop()})
      })
      console.log(patientscan)
      this.service.post("MedicalScan/addPatientScan",patientscan).subscribe(
        res=>{
          this.cancel()
        },
        err=>{
          this.cancel()
        }
      )  
    }
  }
}
