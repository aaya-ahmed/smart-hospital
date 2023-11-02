import { Component, OnInit } from '@angular/core';
import { partinfopatient } from 'src/app/models/patient';
import { ServicesService } from 'src/app/services/services.service';
import {jsPDF} from 'jspdf'
import 'jspdf-autotable' 
import { DoctorDto } from 'src/app/models/doctors';
/*import * as pdfMake from "pdfmake/build/pdfmake";  
import * as pdfFonts from "pdfmake/build/vfs_fonts";  
declare var require: any;
const htmlToPdfmake = require("html-To-Pdfmake");
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;*/
@Component({
  selector: 'app-showtest',
  templateUrl: './showtest.component.html',
  styleUrls: ['../../styles/datatable.css','./showtest.component.css']
})
export class ShowtestComponent implements OnInit {
  option:string='doctor'
  patientlist:partinfopatient[]=[];
  Doctorlist:DoctorDto[]=[]
  rows2:any[]=[];
  lablist:any[]=[]
  patientinfo:any;
  p: number = 1;
  totallength:any;
  loading=false;
  testflag=false;
  constructor(private service:ServicesService) { }
  ngOnInit(): void {
    this.service.get("Patient/getAllPatients").subscribe(
      (res:any)=>{
        this.patientlist=res
      }
    );
    this.service.get("Doctor/getAllDoctors").subscribe(
      (res:any)=>{
        this.Doctorlist=res
      }
    )
  }
  search(form:any){
    if(form.valid){
      this.loading=true;
      this.testflag=false;
    if(form.value.date!=''){
        let id=parseInt(form.value.id);
        let date=form.value.date
        this.service.get("MedicalTest/GetPatientPatientTestsByDate/"+id+"/"+date).subscribe(
          (res:any)=>{
            this.lablist=res;
            this.loading=false;
            this.testflag=true;
          }
         )
      }
      else{
        let id=parseInt(form.value.id);
        this.service.get("MedicalTest/getPatientTestsByPatientId/"+id).subscribe(
          (res:any)=>{
            this.lablist=res;
            this.loading=false;
            this.testflag=true;
          }
         )
      }
    }  
  }
  searchbydoctor(searchform:any){
    if(searchform.valid){
      this.loading=true;
      this.testflag=false;
      if(searchform.value.date!=''){
       let id=parseInt(searchform.value.iddoctor)
       let PatientTestDate=searchform.value.date
        this.service.get("MedicalTest/GetDoctorPatientTestsByDate/"+id+"/"+PatientTestDate).subscribe(
          (res:any)=>{
            this.lablist=res;
            this.loading=false;
            this.testflag=true;
          }
        )
      }
      else{
        let id=parseInt(searchform.value.iddoctor)
         this.service.get('MedicalTest/getPatientTestsByDoctorId/'+id).subscribe(
           (res:any)=>{
             this.lablist=res;
             this.loading=false;
             this.testflag=true;
           }
         )
      }
    }
  }
  getTest(patientId:number,patientTestId:number){
    this.service.get('Patient/'+patientId).subscribe(
      res=>{
        this.patientinfo=res;
        this.openpdf(patientTestId);
      }
    )
  }
  openpdf(id:number){
    var pdf = new jsPDF("p", "mm", "a4");
    let tests:any[]=this.lablist;
    let test=tests.find(n=>n.patientTestId==id)
    pdf.addImage('assets/logo.png', 'png', 10, 5, 20, 20);
    pdf.setFontSize(10)
    pdf.text('Fayoum University Hospital',5,30)
  //patient Info 
  pdf.setFontSize(13)
  pdf.text('Patient Name : ',10,50);
  pdf.setFontSize(12)
  pdf.text(test.patientName,50,50);
  pdf.setFontSize(13)
  pdf.text('Gender : ',10,60)
  pdf.setFontSize(12);
  pdf.text(this.patientinfo.gender,50,60);
  pdf.setFontSize(13)
  pdf.text('Age : ',10,70);
  pdf.setFontSize(12)
  pdf.text(this.patientinfo.age.toString(),50,70);
  pdf.setFontSize(13)
  pdf.text('Doctor Name : ',100,50);
  pdf.setFontSize(12)
  pdf.text(test.doctorName,135,50);
  pdf.text('Test Name : ',100,60);
  pdf.setFontSize(12)
  pdf.text(test.testName,135,60);
  pdf.text('Test Date : ',100,70);
  pdf.setFontSize(12)
  let date=new Date (test.testDate).toLocaleString();
  pdf.text(date,135,70);
  //line
  pdf.line(10,80,200,80); 
   // test Items
  
   var col = ["Paramter","Result","Unit","Reference Value"];
  this.rows2=[];
  for(let i of test.numericalDetails){
    
    
    pdf.setFontSize(50);
   
    var temp = [i.testParameterName,i.numericalValue,i.unit,i.min_Range+'-'+i.max_Range];
     
    this.rows2.push(temp);
    
  }
  for(let i of test.categoricalDetails){
    
    
    pdf.setFontSize(50);
   
    var temp = [i.testParameterName,i.measuredValue,i.unit,i.normalValue];
     
    this.rows2.push(temp);
    
  }
  (pdf as any).autoTable(col, this.rows2,{ startY: 90,headStyles :{fillColor : [1, 50, 78]},alternateRowStyles: {fillColor : [255, 255, 255]}
    ,styles: {
      overflow: 'linebreak',
      fontSize: 14,
     
  } ,columnStyles: {
    0: { fontStyle: 'bold', columnWidth: 60},
    1: { fontStyle: 'bold', columnWidth: 40},
    2: { fontStyle: 'bold', columnWidth: 40},
    3: { fontStyle: 'bold', columnWidth: 50},
   
  }
  } );
    pdf.autoPrint();
    window.open(pdf.output('bloburl'))
  }
  changesection(option:string){
    if(this.option!=option){
      this.option=option
    }
  }
}
