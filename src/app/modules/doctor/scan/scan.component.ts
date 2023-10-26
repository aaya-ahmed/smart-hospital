import { Component, Input, NgModule, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { patientscanlist,  } from 'src/app/models/scan';
import { ServicesService } from 'src/app/services/services.service';
declare var pdfMake: any;
@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
  @Input("patient")patient:any
  scanlist:{Name:string}[]=[]
  //patientscan
  scanflag:boolean=false
  patientscan:patientscanlist[]=[]
  temppatientscan:patientscanlist[]=[]
  showscanflag:boolean=false;
  submitscanflag:boolean=false;
  showscans:boolean=false
  doctor:any;
  flag:number=0
  constructor(private scanservice:ServicesService) { }
  ngOnInit(): void {
    if(localStorage.getItem('userInfo')){
      this.doctor=localStorage.getItem('userInfo')
      this.doctor=JSON.parse(this.doctor)
     }
     this.scanservice.get("MedicalScan/getPatientScansByPatientId/"+parseInt(this.patient.patientId)).subscribe(
       (res:any)=>{
         this.patientscan=res;  
         for(let i of this.patientscan){
          let temp=this.scanlist.find(e=>e.Name==i.scanName)
          if(!temp){
            this.scanlist.push({Name:i.scanName})
          }

         }  
       }
     )
    }
  search_scan(scan:any){
    let scanname=scan.value.scan
    if(this.flag==0){
      this.temppatientscan=this.patientscan
      this.patientscan=[]
      this.flag=1
    }
    this.patientscan=[]
    if(scan.valid){
      this.showscans=true
      for(let i of this.temppatientscan){
        if(i.scanName==scanname){
          this.patientscan.push(i)
        }
      }
    }

  }
  showscan(index:any){
    let pdf=new jsPDF()
    for(let i of this.patientscan[index].scanImages){
      pdf.addImage("data:image/png;base64,"+i,"png",10,10,190,275)
      pdf.addPage()
    }
    pdf.addImage('assets/logo.png', 'jpg', 15, 10, 20, 15);
      pdf.text('university hospital',40,20)
      //patient name
      pdf.text('patient name : ',10,40);
      pdf.text(this.patient.patientName,50,40);
      //gender
      pdf.text('Gender : ',10,50);
      pdf.text(this.patient.gender,50,50);
      //age
      pdf.text('Age: ',10,60);
      pdf.text(this.patient.age.toString(),50,60);
      //doctor name
      pdf.text('doctor name : ',100,40);
      pdf.text(this.patientscan[index].doctorName.toString(),150,40);
      //date
      pdf.text('Date : ',100,50);
      pdf.text(this.patientscan[index].scanDate.substring(0,10),150,50);
      //ray name
      pdf.text('ray type : ',100,60);
      pdf.text(this.patientscan[index].scanName,150,60);
      //line
      pdf.line(10,70,200,70);
      //report----
      var splitText = pdf.splitTextToSize(this.temppatientscan[index].writtenReport, 150);
      var y=80;
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
}    

     
    
