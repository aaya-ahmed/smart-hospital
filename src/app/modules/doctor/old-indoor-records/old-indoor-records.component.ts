import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { indoorPatientRecords } from 'src/app/models/patient';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-old-indoor-records',
  templateUrl: './old-indoor-records.component.html',
  styleUrls: ['./old-indoor-records.component.css']
})
export class OldIndoorRecordsComponent implements OnInit {
  @Input('patient')patient:any;
  record:any;
  patientReport:any
  patientLabIds:any[]=[];
  prescriptions:any[]=[];
  tests:any[]=[];
  scans:any[]=[];
  prescriptionInfo:any;
  testInfo:any;
  scanInfo:any;
  rows2:any[]=[]
  indoorPatientRecords:indoorPatientRecords[]=[ 
    {patientRecordId: 0,
    discahrgeDate: '',
    enterDate: '',
    patientscans: [],
    patientTests: [],
    prescriptions: [],
    roomNumber: 0,
    roomType: '',
    floorNumber: 0,
    bedNumber: 0,}]
    length:number=0
  showPrescriptionsflag=false;
  showTestsFlag=false;
  showScansFlag=false;
  indoorRecordflag=false;
  flag=false;
  noreportflag=false;
  constructor(private service:ServicesService) { }

  ngOnInit(): void {
     this.service.get("Patient/GetIndoorPatientRecordsByPatientId/"+this.patient.patientId).subscribe(
      (res:any)=>{
        this.indoorPatientRecords=res;
        if(this.indoorPatientRecords.length>0){
          this.indoorRecordflag=true;
          this.flag=false
        }
      }
    )
  }
  getreportInfo(index:number){
    this.patientReport=[]
    this.record=this.indoorPatientRecords[index];
    this.service.get('Patient/GetPatientReport/'+this.patient.patientId+'/'+this.record.discahrgeDate).subscribe(
    res=>{
      this.patientReport=res;
           this.showReport();
    }
   );
   
  }
  showReport(){
    var pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage('assets/logo.png', 'png', 10, 5, 20, 20);
    pdf.setFontSize(10)
    pdf.text('Fayoum University Hospital',5,30)
    
  //patient Info 
  pdf.setFontSize(13)
  pdf.text('Patient Name : ',10,50);
  pdf.setFontSize(12)
  pdf.text(this.patient.patientName,50,50);
  pdf.setFontSize(13)
  pdf.text('Gender : ',10,60)
  pdf.setFontSize(12);
  pdf.text(this.patient.gender,50,60);
  pdf.setFontSize(13)
  pdf.text('Date of Admission : ',10,70);
  let enterDate=new Date(this.record.enterDate).toLocaleString();
  pdf.setFontSize(12)
  pdf.text(enterDate,50,70);
  pdf.text('Age : ',100,50);
  pdf.setFontSize(12)
  pdf.text(this.patient.age.toString(),135,50);
 
  pdf.text('Exit Date : ',100,60);
  pdf.setFontSize(12)
  let date=new Date (this.record.discahrgeDate).toLocaleString();
  pdf.text(date,135,60);
  //line
  pdf.line(10,80,200,80); 
  // case of Admission
  pdf.setFontSize(17)
  pdf.setTextColor(19, 66, 121)
  pdf.text('Cause of Admission : ',10,90);
  pdf.setFontSize(14)
  pdf.setTextColor(0, 0, 0)
  var strArr1 = pdf.splitTextToSize(this.patientReport.result.causeOfAdmission, 170)
  pdf.text(strArr1,15,97);
 
  //line
  pdf.line(10,110,200,110); 
  // Recommendations
  pdf.setFontSize(17)
  pdf.setTextColor(19, 66, 121)
  pdf.text('Recommendations : ',10,120);
  pdf.setFontSize(14)
  pdf.setTextColor(0, 0, 0)
  var strArr = pdf.splitTextToSize(this.patientReport.result.recommendation,170)
  pdf.text(strArr,15,127);
  pdf.line(10,140,200,140);
  //Investigations
  pdf.setFontSize(17)
  pdf.setTextColor(19, 66, 121)
  pdf.text('Investigations : ',10,150);
  this.length=160;
  //tests Names
  let index=1;
  if((this.patientReport.result.testNames).length>0){
    
    pdf.setFontSize(15)
    pdf.setTextColor(19, 115, 115)
    pdf.text('Tests Names :  ',15,160);
    for(let i of this.patientReport.result.testNames){
    pdf.setFontSize(12)
    pdf.setTextColor(0, 0, 0)
    this.length=index*10+160
    pdf.text('- '+i,35,this.length);
    index=index+1;
    if(this.length==250){
      pdf.addPage();
    }
    }
  }
  //scans Names 
  let index1=1;
  if(this.patientReport.result.scanNames.length>0){
   
    pdf.setFontSize(15)
    pdf.setTextColor(19, 115, 115)
    pdf.text('Scans Names :  ',15,this.length+10);
    let x=this.length+10
    for(let i of this.patientReport.result.scanNames){
    pdf.setFontSize(12)
    pdf.setTextColor(0, 0, 0)
    this.length=index1*10+x;
    pdf.text('- '+i,35,this.length);
    
    index1=index1+1;
    if(this.length==250){
      pdf.addPage();
    }
    }
  }
 //Medications
 pdf.line(10,this.length+10,200,this.length+10);
  pdf.setFontSize(17)
  pdf.setTextColor(19, 66, 121)
  pdf.text('Medications : ',10,this.length+20);
 var col = ["M.Name","Type","Strength","Duration","Dose","Instructions"];
 this.rows2=[];


for(let i of this.patientReport.result.lastPrescription.prescription.prescriptionItems){
  
  
  pdf.setFontSize(40);
 
  var temp = [i.medicine_Name,i.medicineType,i.medicine_concentration,i.durarion,i.dose,i.instructions];
   
  this.rows2.push(temp);
}
if(this.patientReport.result.listOfMedicineNames.length>0){
  for(let i of this.patientReport.result.listOfMedicineNames){
  
  
    pdf.setFontSize(40);
   
    var temp = [i.medicine_Name,i.medicineType,i.medicine_concentration,i.durarion,i.dose,i.instructions];
     
    this.rows2.push(temp);
    
}}
  (pdf as any).autoTable(col, this.rows2,{  startX:-10, startY: this.length+30, pageBreak: 'avoid',
  theme: 'grid',styles: {
    overflow: 'linebreak',
    fontSize: 14,
    halign: 'center', 
    valign: 'middle',
    margin: { right: 50}
} ,columnStyles: {
  0: { fontStyle: 'bold',halign: 'center', columnWidth: 30},
  1: { fontStyle: 'bold',halign: 'center', columnWidth: 30},
  2: { fontStyle: 'bold',halign: 'center', columnWidth: 30},
  3: { fontStyle: 'bold',halign: 'center', columnWidth: 30},
  4: { fontStyle: 'bold',halign: 'center', columnWidth: 25},
  5: {fontStyle:  'bold',halign: 'center', columnWidth: 35},
  
  }});
 
  window.open(pdf.output('bloburl'));
  }
  getPrescriptionsInfo(index:number){
    this.patientReport=[];
    this.prescriptions=[];
    this.record=this.indoorPatientRecords[index];
    this.prescriptions=this.record.prescriptions;    
    this.showPrescriptionsflag=true;
    this.showTestsFlag=false;
    this.showScansFlag=false;
   
  }
  getPrescriptionByPrescriptionId(prescriptionId:number){
    this.service.get("Doctor/GetPrescription/"+prescriptionId).subscribe(
      res=>{
        this.prescriptionInfo=res;
        this.showPrescription()
      }
    )
  }
  showPrescription(){
    var pdf = new jsPDF("p", "mm", "a4");
   
   
    pdf.addImage('assets/logo.png', 'png', 10, 5, 20, 20);
    pdf.setFontSize(10)
    pdf.text('Fayoum University Hospital',5,30)
    
   
   
  //prescription Info 
  pdf.setFontSize(13)
  pdf.text('Patient Name : ',10,40);
  pdf.setFontSize(12)
  pdf.text(this.patient.patientName,40,40);
  pdf.setFontSize(13)
  pdf.text('Gender : ',10,50)
  pdf.setFontSize(12);
  pdf.text(this.patient.gender,40,50);
  pdf.setFontSize(13)
  pdf.text('Age : ',10,60);
  pdf.setFontSize(12)
  pdf.text(this.patient.age.toString(),40,60);
  
  
  //prescription Info 
  
  
  pdf.setFontSize(13)
  pdf.text('Doctor Name : ',100,40);
  pdf.setFontSize(12)
  pdf.text(this.prescriptionInfo.doctorFullName,150,40);
  pdf.setFontSize(13)
  pdf.text('Departement:',100,50);
  pdf.setFontSize(12)
  pdf.text(this.prescriptionInfo.department,150,50);
  pdf.setFontSize(13)
  pdf.text('Prescription Date : ',100,60);
  pdf.setFontSize(12)
  let date=new Date (this.prescriptionInfo.prescription.prescription_Date).toLocaleString();
  pdf.text(date,150,60)
 
  
  //line
  pdf.line(10,70,200,70); 
   //prescription shape
   pdf.addImage('assets/prescriptionicon.png', 'png', 10, 75, 20, 20);
 // prescription Items

   var col = ["M.Name","Type","Strength","Duration","Dose","Instructions"];
   this.rows2=[];
  for(let i of this.prescriptionInfo.prescription.prescriptionItems){
    pdf.setFontSize(40);
    var temp = [i.medicine_Name,i.medicineType,i.medicine_concentration,i.durarion,i.dose,i.instructions];
    this.rows2.push(temp);
    (pdf as any).autoTable(col, this.rows2,{  startX:-10, startY: 100, pageBreak: 'avoid',
    theme: 'grid',styles: {
      overflow: 'linebreak',
      fontSize: 14,
      halign: 'center', 
      valign: 'middle',
      margin: { right: 50}
  } ,columnStyles: {
    0: { fontStyle: 'bold',halign: 'center', columnWidth: 30},
    1: { fontStyle: 'bold',halign: 'center', columnWidth: 30},
    2: { fontStyle: 'bold',halign: 'center', columnWidth: 30},
    3: { fontStyle: 'bold',halign: 'center', columnWidth: 30},
    4: { fontStyle: 'bold',halign: 'center', columnWidth: 25},
    5: {fontStyle:  'bold',halign: 'center', columnWidth: 40}
  }});
   
  }
  let length=this.prescriptionInfo.prescription.prescriptionItems.length
pdf.setFontSize(20);
pdf.setTextColor(1, 50, 78);
pdf.text('Diagnosis:',20,length*10+120);
pdf.setFontSize(14);
pdf.text(this.prescriptionInfo.prescription.diagnosis,25,length*10+130);
     pdf.autoPrint();
     window.open(pdf.output('bloburl'))

  }
  getTestsInfo(index:number){
    this.patientReport=[]
    this.record=this.indoorPatientRecords[index];
    this.tests=this.record.patientTests;
    this.showPrescriptionsflag=false;
    this.showTestsFlag=true;
    this.showScansFlag=false;
  }
  getscanInfo(index:number){
    this.patientReport=[]
    this.record=this.indoorPatientRecords[index];
    this.scans=this.record.patientscans;
    this.showPrescriptionsflag=false;
    this.showTestsFlag=false;
    this.showScansFlag=true;
  }
  getTestId(patientTestId:number){
    this.service.get("MedicalTest/getPatientTestById/"+patientTestId).subscribe(
      res=>{
        this.testInfo=res;
        this.showTest();
      }
    )
  }
  getScanId(patientTestId:number){
    this.service.get("MedicalScan/getPatientScanById/"+patientTestId).subscribe(
      res=>{
        this.scanInfo=res;
        this.showscan();
      }
    )
  }
  showTest(){
    var pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage('assets/logo.png', 'png', 10, 5, 20, 20);
    pdf.setFontSize(10)
    pdf.text('Fayoum University Hospital',5,30) 
  //Patient Info 
  pdf.setFontSize(13)
  pdf.text('Patient Name : ',10,50);
  pdf.setFontSize(12)
  pdf.text(this.testInfo.patientName,50,50);
  pdf.setFontSize(13)
  pdf.text('Gender : ',10,60)
  pdf.setFontSize(12);
  pdf.text(this.patient.gender,50,60);
  pdf.setFontSize(13)
  pdf.text('Age : ',10,70);
  pdf.setFontSize(12)
  pdf.text(this.patient.age.toString(),50,70);
  //test Info 
  pdf.setFontSize(13)
  pdf.text('Doctor Name : ',100,50);
  pdf.setFontSize(12)
  pdf.text(this.testInfo.doctorName,135,50);
  pdf.text('Test Name : ',100,60);
  pdf.setFontSize(12)
  pdf.text(this.testInfo.testName,135,60);
  pdf.text('Test Date : ',100,70);
  pdf.setFontSize(12)
  let date=new Date (this.testInfo.testDate).toLocaleString();
  pdf.text(date,135,70);
  //line
  pdf.line(10,80,200,80); 
  
  
  var col = ["Paramter","Result","Unit","Reference Value"];
  this.rows2=[];
  for(let i of this.testInfo.numericalDetails){
    
    
    pdf.setFontSize(40);
   
    var temp = [i.testParameterName,i.numericalValue,i.unit,i.min_Range+'-'+i.max_Range];
     
    this.rows2.push(temp);
    
  }
  for(let i of this.testInfo.categoricalDetails){
    
    
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
  showscan(){
    let pdf=new jsPDF()
    for(let i of this.scanInfo.scanImages){
      pdf.addImage("data:image/png;base64,"+i,"png",10,10,190,275)
      pdf.addPage()
    }
    pdf.addImage('assets/logo.png', 'jpg', 15, 10, 20, 15);
      pdf.text('university hospital',40,20)
      //patient name
      pdf.text('patient name : ',10,40);
      pdf.text(this.scanInfo.patientName,50,40);
      //gender
      pdf.text('Gender : ',10,50);
      pdf.text(this.patient.gender,50,50);
      //age
      pdf.text('Age: ',10,60);
      pdf.text(this.patient.age.toString(),50,60);
      //doctor name
      pdf.text('doctor name : ',100,40);
      pdf.text(this.scanInfo.doctorName,150,40);
      //date
      pdf.text('Date : ',100,50);
      pdf.text(this.scanInfo.scanDate.substring(0,10),150,50);
      //ray name
      pdf.text('ray type : ',100,60);
      pdf.text(this.scanInfo.scanName,150,60);
      //line
      pdf.line(10,70,200,70);
      //report----
      var splitText = pdf.splitTextToSize(this.scanInfo.writtenReport, 150);
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

