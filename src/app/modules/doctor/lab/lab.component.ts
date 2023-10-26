import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { addlabRequst,  labsList, patienttestlist, resultData } from 'src/app/models/lab';
import {jsPDF} from 'jspdf'
import 'jspdf-autotable'
import { ServicesService } from 'src/app/services/services.service';
@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {
  @Input("patient")patient:any={age: 0,causeOfAdmission: "",gender: "", indoorPatientId: 0,oralMedicalHistory: "",patientId: 0,patientName: ""}
  @Input("outpatientflag")outpatientflag:number=0
  indoorPatientRecordId:any;
  doctor:any;
  rows2:any[]=[];
  testsList:labsList[]=[];
  patientTests:patienttestlist[]=[];
  searchedTestsList:patienttestlist[]=[];
  date=new Date().toISOString();
  constructor(private service:ServicesService) { }

  ngOnInit(): void {
    if(localStorage.getItem('userInfo')){
      this.doctor=localStorage.getItem('userInfo')
      this.doctor=JSON.parse(this.doctor)
     }
    this.service.get('MedicalTest/getPatientTestsByPatientId/'+parseInt(this.patient.patientId)).subscribe
    ((res:any)=>
      {this.patientTests=res; });
       this.service.getTestNames().subscribe(
      res=>
      {
        this.testsList=res
      },
      err=>{}
      )
  }
  search_lab(form:NgForm){
    let testname=form.value.lab
    this.searchedTestsList=[]
    for(let i of this.patientTests){
      if(testname==i.testName){
       this.searchedTestsList.push(i);
      }
    }
  }
  showlab(id:number){
   
 
      var pdf = new jsPDF("p", "mm", "a4");
      let tests:any[]=this.searchedTestsList;
      let test=tests.find(n=>n.patientTestId==id)     
      pdf.addImage('assets/logo.png', 'png', 10, 5, 20, 20);
      pdf.setFontSize(10)
      pdf.text('Fayoum University Hospital',5,30)
      
     
     
    //Patient Info 
    pdf.setFontSize(13)
    pdf.text('Patient Name : ',10,50);
    pdf.setFontSize(12)
    pdf.text(test.patientName,50,50);
    pdf.setFontSize(13)
    pdf.text('Gender : ',10,60)
    pdf.setFontSize(12);
    pdf.text(this.patient.gender,50,60);
    pdf.setFontSize(13)
    pdf.text('Age : ',10,70);
    pdf.setFontSize(12)
    pdf.text(this.patient.age,50,70);
    
    
    //test Info 
    
    
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
    
    
    var col = ["Paramter","Result","Unit","Reference Value"];
    this.rows2=[];
    for(let i of test.numericalDetails){
      
      
      pdf.setFontSize(40);
     
      var temp = [i.testParameterName,i.numericalValue,i.unit,i.min_Range+'-'+i.max_Range];
       
      this.rows2.push(temp);
      
    }
    for(let i of test.categoricalDetails){
      
      
      pdf.setFontSize(40);
     
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
   
  
}
