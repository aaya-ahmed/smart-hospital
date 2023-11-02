import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { DoctorDto } from 'src/app/models/doctors';
import { partinfopatient, patient } from 'src/app/models/patient';
import { patientscanlist } from 'src/app/models/scan';
import { ServicesService } from 'src/app/services/services.service';
@Component({
  selector: 'app-showscan',
  templateUrl: './showscan.component.html',
  styleUrls: ['../../styles/datatable.css','./showscan.component.css']
})
export class ShowscanComponent implements OnInit {
  option:string='patient'
  patientlist:partinfopatient[]=[];
  Doctorlist:DoctorDto[]=[]
  listscan:patientscanlist[]=[]
  info:partinfopatient={
    id: 0,
    firstName: '',
    lastName: '',
    age: 0,
    gender: ''
  }
  scan={
      scanName: '',
      patientName: '',
      doctorName: '',
      scanImages: [ ],
      writtenReport:'',
      scanDate: '',
  }
  id:number=0
  scanflag:boolean=false
  p: number = 1;
  totallength:any;
  loading=false
  constructor(private service:ServicesService,private services:ServicesService) { }
  ngOnInit(): void {
    this.service.get('Patient/getAllPatients').subscribe(
      (res:any)=>{
        this.patientlist=res
      }
    );
    this.services.get("Doctor/getAllDoctors").subscribe(
      (res:any)=>{
        this.Doctorlist=res
      }
    )
  }
  search(form:any){
    if(form.valid){
      this.loading=true;
      this.scanflag=false;
    if(form.value.date!=''){
        this.id=parseInt(form.value.id);
        let date=form.value.date
        this.services.get("MedicalScan/GetPatientPatientScansByDate/"+this.id+"/"+date).subscribe(
          (res:any)=>{
            this.listscan=res;
              this.scanflag=true
              this.loading=false

          }
         )
      }
      else{
        this.id=parseInt(form.value.id);
        this.services.get("MedicalScan/getPatientScansByPatientId/"+this.id).subscribe(
          (res:any)=>{
            this.listscan=res;
            this.scanflag=true
            this.loading=false
          }
         )
      }
    }
  }
  searchbydoctor(searchform:any){
    if(searchform.valid){
      this.scanflag=false;
      this.loading=true
      if(searchform.value.date!=''){
       let id=parseInt(searchform.value.iddoctor)
       let PatientScanDate=searchform.value.date
        this.services.get("MedicalScan/GetDoctorPatientScansByDate/"+id+"/"+PatientScanDate).subscribe(
          (res:any)=>{
            this.listscan=res;
            this.scanflag=true;
            this.loading=false
          }
        )
      }
      else{
        let id=parseInt(searchform.value.iddoctor)
         this.services.get("MedicalScan/getPatientScansByDoctorId/"+id).subscribe(
           (res:any)=>{
             this.listscan=res;
             this.scanflag=true;
             this.loading=false
           }
         )
      }
    }
  }
  show(choosenScan:any){
    this.scan={
      scanName: choosenScan.scanName,
      patientName: choosenScan.patientName,
      doctorName: choosenScan.doctorName,
      scanImages:choosenScan.scanImages,
      writtenReport:choosenScan.writtenReport,
      scanDate: choosenScan.scanDate,
  }
  let pdf =new jsPDF()
  for(let i of this.scan.scanImages){
    pdf.addImage("data:image/png;base64,"+i,"png",10,10,190,275)
    pdf.addPage()
  }
  pdf.addImage('assets/logo.png', 'jpg', 15, 10, 20, 15);
  pdf.text('university hospital',40,20)
  //patient name
  pdf.text('patient name : ',10,40);
  pdf.text(this.scan.patientName,50,40);
  //doctor name
  pdf.text('doctor name : ',10,50);
  pdf.text(this.scan.doctorName,50,50);
  //date
  pdf.text('Date : ',10,60);
  pdf.text(this.scan.scanDate.substring(0,10),50,60);
  //ray name
  pdf.text('ray type : ',10,70);
  pdf.text(this.scan.scanName,50,70);
  //line
  pdf.line(10,80,200,80);
  //report----
  var splitText = pdf.splitTextToSize(this.scan.writtenReport, 150);
  var y=90;
  for(var i = 0; i < splitText.length; i++){
    if (y > 275){
        y = 20;
        pdf.addPage();
       }
      pdf.text( splitText[i],20, y);
      y = y + 10
     }
     window.open(pdf.output('bloburl'))
}
  changesection(option:string){
    this.option=option
  }
}

