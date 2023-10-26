import { Component, OnInit,inject, Output, Input } from '@angular/core';
import { getPrescriptionInfo } from 'src/app/models/prescription';
import {jsPDF} from 'jspdf'
import 'jspdf-autotable'
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-show-prescription',
  templateUrl: './show-prescription.component.html',
  styleUrls: ['./show-prescription.component.css']
})
export class ShowPrescriptionComponent implements OnInit {
   @Input('patient')patient:any;
   rows2:any[]=[];
   doctor:any;
   showAllPrepflag:boolean=false;
  showdocPrepflag:boolean=false;
  
  allPatientPrescriptionsList:getPrescriptionInfo[]=[];
  patientDoctorPrescriptionsList:getPrescriptionInfo[]=[];
  constructor(private prescriptionService:ServicesService) { }

  ngOnInit(): void {
    if(localStorage.getItem('userInfo')){
      this.doctor=localStorage.getItem('userInfo')
      this.doctor=JSON.parse(this.doctor)
     }
    this.prescriptionService.get('Doctor/GetDoctorPrescriptionsForPatient/'+this.patient.patientId).subscribe(
      (res:any)=>{ 
        this.allPatientPrescriptionsList=res;
       }

    );
    this.prescriptionService.get('Doctor/ GetDoctorPrescriptionsForPatient/'+this.patient.patientId+'/'+this.doctor.id).subscribe(
      (res:any)=>{
         this.patientDoctorPrescriptionsList=res;
      }
    )
  }
 /* show_all_patient_prescriptions_in_pdf(){
    let data:any=document.getElementById('allPrescrptions')
    html2canvas(data).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      window.open(PDF.output('bloburl'))
  });
}*/
show_all_patient_prescriptions_in_pdf(id:number){
 
  var pdf = new jsPDF("p", "mm", "a4");
  let prescriptions:any[]=this.allPatientPrescriptionsList;
  let prescription=prescriptions.find(n=>n.prescription.prescriptionId==id) 
  pdf.addImage('assets/logo.png', 'png', 10, 5, 20, 20);
  pdf.setFontSize(10)
  pdf.text('Fayoum University Hospital',5,30)
//prescription Info 
pdf.setFontSize(13)
pdf.text('Patient Name : ',10,50);
pdf.setFontSize(12)
pdf.text(this.patient.patientName,50,50);
pdf.setFontSize(13)
pdf.text('Gender : ',10,60)
pdf.setFontSize(12);
pdf.text(this.patient.gender,50,60);
pdf.setFontSize(13)
pdf.text('Age : ',10,70);
pdf.setFontSize(12)
pdf.text(this.patient.age,50,70);


//prescription Info 


pdf.setFontSize(13)
pdf.text('Doctor Name : ',100,40);
pdf.setFontSize(12)
pdf.text(prescription.doctorFullName,150,40);
pdf.setFontSize(13)
pdf.text('Departement:',100,50);
pdf.setFontSize(12)
pdf.text(prescription.department,150,50);
pdf.setFontSize(13)
pdf.text('Prescription Date : ',100,60);
pdf.setFontSize(12)
let date=new Date (prescription.prescription.prescription_Date).toLocaleString();
pdf.text(date,150,60)
pdf.setFontSize(13);
pdf.text('Re-Appoinment Date: ',100,70);
pdf.setFontSize(12);
let re_date=new Date (prescription.prescription.re_appointement_date).toLocaleString();
if(re_date=="1/1/1970, 2:00:00 AM"){
  re_date=" "
}
pdf.text(re_date,150,70);
//line
pdf.line(10,80,200,80); 
 //prescription shape
 pdf.addImage('assets/prescriptionicon.png', 'png', 10, 85, 20, 20);
 // prescription Items

 var col = ["M.Name","Type","Strength","Dose","Duration","Instructions"];
 this.rows2=[];
for(let i of prescription.prescription.prescriptionItems){  
  pdf.setFontSize(40);
  var temp = [i.medicine_Name,i.medicineType,i.medicine_concentration,i.durarion,i.dose,i.instructions];
  this.rows2.push(temp);
  (pdf as any).autoTable(col, this.rows2,{  startX:-10, startY: 105, pageBreak: 'avoid',
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
let length=prescription.prescription.prescriptionItems.length
    pdf.setFontSize(20);
    pdf.setTextColor(1, 50, 78);
    pdf.text('Diagnosis:',20,length*10+130);
    pdf.setFontSize(15);
    pdf.setTextColor(0 ,0, 0);
    pdf.text(prescription.prescription.diagnosis,25,length*10+140);
   pdf.autoPrint();
   window.open(pdf.output('bloburl'))
}
show_patient_and_doctor_prescriptions_in_pdf(id:number){
 
   var pdf = new jsPDF("p", "mm", "a4");
    let prescriptions:any[]=this.patientDoctorPrescriptionsList;
    let prescription=prescriptions.find(n=>n.prescription.prescriptionId==id)   
    pdf.addImage('assets/logo.png', 'png', 10, 5, 20, 20);
    pdf.setFontSize(10)
    pdf.text('Fayoum University Hospital',5,30)
  //prescription Info 
  pdf.setFontSize(13)
  pdf.text('Patient Name : ',10,50);
  pdf.setFontSize(12)
  pdf.text(this.patient.patientName,50,50);
  pdf.setFontSize(13)
  pdf.text('Gender : ',10,60)
  pdf.setFontSize(12);
  pdf.text(this.patient.gender,50,60);
  pdf.setFontSize(13)
  pdf.text('Age : ',10,70);
  pdf.setFontSize(12)
  pdf.text(this.patient.age,50,70);
  
  
  //prescription Info 
  
  
  pdf.setFontSize(13)
  pdf.text('Doctor Name : ',100,40);
  pdf.setFontSize(12)
  pdf.text(prescription.doctorFullName,150,40);
  pdf.setFontSize(13)
  pdf.text('Departement:',100,50);
  pdf.setFontSize(12)
  pdf.text(prescription.department,150,50);
  pdf.setFontSize(13)
  pdf.text('Prescription Date : ',100,60);
  pdf.setFontSize(12)
  let date=new Date (prescription.prescription.prescription_Date).toLocaleString();
  pdf.text(date,150,60)
  pdf.setFontSize(13);
  pdf.text('Re-Appoinment Date: ',100,70);
  pdf.setFontSize(12);
  let re_date=new Date (prescription.prescription.re_appointement_date).toLocaleString();
  pdf.text(re_date,150,70);
  //line
  pdf.line(10,80,200,80); 
   //prescription shape
   pdf.addImage('assets/prescriptionicon.png', 'png', 10, 85, 20, 20);
 // prescription Items
   var col = ["M.Name","Type","Strength","Dose","Duration","Instructions"];
   this.rows2=[];
  for(let i of prescription.prescription.prescriptionItems){
    pdf.setFontSize(40);
    var temp = [i.medicine_Name,i.medicineType,i.medicine_concentration,i.dose,i.durarion,i.instructions];
    this.rows2.push(temp);
    (pdf as any).autoTable(col, this.rows2,{  startX:-10, startY: 105, pageBreak: 'avoid',
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
  let length=prescription.prescription.prescriptionItems.length
    pdf.setFontSize(20);
    pdf.setTextColor(1, 50, 78);
    pdf.text('Diagnosis:',20,length*10+130);
    pdf.setFontSize(15);
    pdf.setTextColor(0 ,0, 0);
    pdf.text(prescription.prescription.diagnosis,25,length*10+140);
     pdf.autoPrint();
     window.open(pdf.output('bloburl'))

}
set_show_all_prep_flag(){
  this.showAllPrepflag=!this.showAllPrepflag
}
set_show_doc_prep_flag(){
  this.showdocPrepflag=!this.showdocPrepflag
}
}
