import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import {jsPDF} from 'jspdf'
import 'jspdf-autotable' 

import { getPrescriptionInfo } from 'src/app/models/prescription';
@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['../../styles/datatable.css','./prescriptions.component.css']
})
export class PrescriptionsComponent implements OnInit {
patient:any;
rows2:any[]=[];
loadflag:boolean=true;
allPatientPrescriptionsList:getPrescriptionInfo[]=[];
p=1
  constructor(private service:ServicesService) { }
  ngOnInit(): void {
    if(localStorage.getItem('userInfo')){
      this.patient=localStorage.getItem('userInfo')
      this.patient=JSON.parse(this.patient)
     }
     this.service.get("Doctor/GetDoctorPrescriptionsForPatient/"+this.patient.id).subscribe(
      (res:any)=>{ 
        this.allPatientPrescriptionsList=res;
        this.loadflag=false
       }
    );
    
  }
 
 
 

  

show_all_patient_prescriptions_in_pdf(id:number){
 
  var pdf = new jsPDF("p", "mm", "a4");
  let prescriptions:any[]=this.allPatientPrescriptionsList;
  let prescription=prescriptions.find(n=>n.prescription.prescriptionId==id)
  console.log(prescription)
 
  pdf.addImage('assets/logo.png', 'png', 10, 5, 20, 20);
  pdf.setFontSize(10)
  pdf.text('Fayoum University Hospital',5,30)
  
 
 
//prescription Info 
pdf.setFontSize(13)
pdf.text('Patient Name : ',10,50);
pdf.setFontSize(12)
pdf.text(this.patient.firstName+' '+this.patient.lastName,50,50);
pdf.setFontSize(13)
pdf.text('Gender : ',10,60)
pdf.setFontSize(12);
pdf.text(this.patient.gender,50,60);
pdf.setFontSize(13)
pdf.text('Age : ',10,70);
pdf.setFontSize(12)
pdf.text(this.patient.age.toString(),50,70);


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

   var col = ["M.Name","Type","Strength","Duration","Dose","Instructions"];
   this.rows2=[];
  
   console.log(prescription.prescription.prescriptionItems)
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
    pdf.text('Diagnosis:',20,length*10+120);
    pdf.setFontSize(15);
    pdf.setTextColor(0 ,0, 0);
    pdf.text(prescription.prescription.diagnosis,25,length*10+130);
     pdf.autoPrint();
     window.open(pdf.output('bloburl'))

}



}
