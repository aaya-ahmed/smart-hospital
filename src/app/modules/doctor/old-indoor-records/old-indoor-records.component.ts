import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { firstValueFrom } from 'rxjs';
import { indoorPatientRecords } from 'src/app/models/patient';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-old-indoor-records',
  templateUrl: './old-indoor-records.component.html',
  styleUrls: ['./old-indoor-records.component.css']
})
export class OldIndoorRecordsComponent implements OnInit {
  @Input('patient')patient:any;
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
  record:any;
  patientReport:any
  patientLabIds:any[]=[];
  array:any[]=[]
  indoorRecordflag=false;
  loadingstatus:boolean=true
  constructor(private service:ServicesService) { }

  ngOnInit(): void {
     this.service.get("Patient/GetIndoorPatientRecordsByPatientId/"+this.patient.patientId).subscribe(
      (res:any)=>{
        this.indoorPatientRecords=res;
        if(this.indoorPatientRecords.length>0){
          this.indoorRecordflag=true;
        }
        this.loadingstatus=false;
      }
    )
  }
  showReport(index:number){
    let record=this.indoorPatientRecords[index];
    this.service.get('Patient/GetPatientReport/'+this.patient.patientId+'/'+record.discahrgeDate).subscribe(
    (res:any)=>{
      this.printReport(record,res);
    }
   );
   
  }
  private printReport(record:any,patientReport:any){
  let row:any[]=[]
  let length=160;
  let pdf = new jsPDF("p", "mm", "a4");
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
  let enterDate=new Date(record.enterDate).toLocaleString();
  pdf.setFontSize(12)
  pdf.text(enterDate,50,70);
  pdf.text('Age : ',100,50);
  pdf.setFontSize(12)
  pdf.text(this.patient.age.toString(),135,50);
 
  pdf.text('Exit Date : ',100,60);
  pdf.setFontSize(12)
  let date=new Date (record.discahrgeDate).toLocaleString();
  pdf.text(date,135,60);
  //line
  pdf.line(10,80,200,80); 
  // case of Admission
  pdf.setFontSize(17)
  pdf.setTextColor(19, 66, 121)
  pdf.text('Cause of Admission : ',10,90);
  pdf.setFontSize(14)
  pdf.setTextColor(0, 0, 0)
  var strArr1 = pdf.splitTextToSize(patientReport.result.causeOfAdmission, 170)
  pdf.text(strArr1,15,97);
 
  //line
  pdf.line(10,110,200,110); 
  // Recommendations
  pdf.setFontSize(17)
  pdf.setTextColor(19, 66, 121)
  pdf.text('Recommendations : ',10,120);
  pdf.setFontSize(14)
  pdf.setTextColor(0, 0, 0)
  var strArr = pdf.splitTextToSize(patientReport.result.recommendation,170)
  pdf.text(strArr,15,127);
  pdf.line(10,140,200,140);
  //Investigations
  pdf.setFontSize(17)
  pdf.setTextColor(19, 66, 121)
  pdf.text('Investigations : ',10,150);
  //tests Names
  let index=1;
  if((patientReport.result.testNames).length>0){
    
    pdf.setFontSize(15)
    pdf.setTextColor(19, 115, 115)
    pdf.text('Tests Names :  ',15,160);
    for(let i of patientReport.result.testNames){
    pdf.setFontSize(12)
    pdf.setTextColor(0, 0, 0)
    length=index*10+160
    pdf.text('- '+i,35,length);
    index=index+1;
    if(length==250){
      pdf.addPage();
    }
    }
  }
  //scans Names 
  let index1=1;
  if(patientReport.result.scanNames.length>0){
   
    pdf.setFontSize(15)
    pdf.setTextColor(19, 115, 115)
    pdf.text('Scans Names :  ',15,length+10);
    let x=length+10
    for(let i of patientReport.result.scanNames){
    pdf.setFontSize(12)
    pdf.setTextColor(0, 0, 0)
    length=index1*10+x;
    pdf.text('- '+i,35,length);
    
    index1=index1+1;
    if(length==250){
      pdf.addPage();
    }
    }
  }
 //Medications
 pdf.line(10,length+10,200,length+10);
  pdf.setFontSize(17)
  pdf.setTextColor(19, 66, 121)
  pdf.text('Medications : ',10,length+20);
 var col = ["M.Name","Type","Strength","Duration","Dose","Instructions"];
 row=[];


for(let i of patientReport.result.lastPrescription.prescription.prescriptionItems){
  
  
  pdf.setFontSize(40);
 
  var temp = [i.medicine_Name,i.medicineType,i.medicine_concentration,i.durarion,i.dose,i.instructions];
   
  row.push(temp);
}
if(patientReport.result.listOfMedicineNames.length>0){
  for(let i of patientReport.result.listOfMedicineNames){
  
  
    pdf.setFontSize(40);
   
    var temp = [i.medicine_Name,i.medicineType,i.medicine_concentration,i.durarion,i.dose,i.instructions];
     
    row.push(temp);
    
}}
  (pdf as any).autoTable(col, row,{  startX:-10, startY: length+30, pageBreak: 'avoid',
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
  showPrescriptions(index:number){
    this.indoorPatientRecords[index].prescriptions.forEach((item:any,i:number) => {
      this.service.get("Doctor/GetPrescription/"+item.prescriptionId).subscribe(
        res=>{
          this.array.push(res);
          console.log(this.array)
          if(i==this.indoorPatientRecords[index].prescriptions.length-1){
            this.printprescriptions()
          }
        }
      )
    });
  }
  private printprescriptions(){
    if(this.array.length>0){
      var pdf = new jsPDF("p", "mm", "a4");
      let row:any[]=[]
      this.array.forEach((item:any) => {
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
        pdf.text(item.doctorFullName,150,40);
        pdf.setFontSize(13)
        pdf.text('Departement:',100,50);
        pdf.setFontSize(12)
        pdf.text(item.department,150,50);
        pdf.setFontSize(13)
        pdf.text('Prescription Date : ',100,60);
        pdf.setFontSize(12)
        let date=new Date (item.prescription.prescription_Date).toLocaleString();
        pdf.text(date,150,60)
        //line
        pdf.line(10,70,200,70); 
        //prescription shape
        pdf.addImage('assets/prescriptionicon.png', 'png', 10, 75, 20, 20);
        // prescription Items
        var col = ["M.Name","Type","Strength","Duration","Dose","Instructions"];
        row=[];
        for(let i of item.prescription.prescriptionItems){
          pdf.setFontSize(40);
          var temp = [i.medicine_Name,i.medicineType,i.medicine_concentration,i.durarion,i.dose,i.instructions];
          row.push(temp);
          (pdf as any).autoTable(col, row,{startX:-10,
                                                  startY: 100,
                                                  pageBreak: 'avoid',
                                                  theme: 'grid',
                                                  styles: {
                                                    overflow: 'linebreak',
                                                    fontSize: 14,
                                                    halign: 'center', 
                                                    valign: 'middle',
                                                    margin: { right: 50}},
                                                    columnStyles: {
                                                          0: { fontStyle: 'bold',halign: 'center', columnWidth: 30},
                                                          1: { fontStyle: 'bold',halign: 'center', columnWidth: 30},
                                                          2: { fontStyle: 'bold',halign: 'center', columnWidth: 30},
                                                          3: { fontStyle: 'bold',halign: 'center', columnWidth: 30},
                                                          4: { fontStyle: 'bold',halign: 'center', columnWidth: 25},
                                                          5: {fontStyle:  'bold',halign: 'center', columnWidth: 40}
                                                    }
                                                }
          );
        }
        let length=item.prescription.prescriptionItems.length
        pdf.setFontSize(20);
        pdf.setTextColor(1, 50, 78);
        pdf.text('Diagnosis:',20,length*10+120);
        pdf.setFontSize(14);
        pdf.text(item.prescription.diagnosis,25,length*10+130);
      });
      window.open(pdf.output('bloburl'))
    }
  }
  showTest(index:number){
    this.array=[]
    this.indoorPatientRecords[index].patientTests.forEach((item:any,i:number) => {
      this.service.get("MedicalTest/getPatientTestById/"+item.patientTestId).subscribe(
        res=>{
          this.array.push(res);
          if(i==this.indoorPatientRecords[index].patientTests.length-1){
            this.printtest()
          }
        }
      )
    });
  }
  private printtest(){
    if(this.array.length>0){
      let row:any[]=[]
      var pdf = new jsPDF("p", "mm", "a4");
      this.array.forEach((item:any) => {
        pdf.addImage('assets/logo.png', 'png', 10, 5, 20, 20);
        pdf.setFontSize(10)
        pdf.text('Fayoum University Hospital',5,30) 
        //Patient Info 
        pdf.setFontSize(13)
        pdf.text('Patient Name : ',10,50);
        pdf.setFontSize(12)
        pdf.text(item.patientName,50,50);
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
        pdf.text(item.doctorName,135,50);
        pdf.text('Test Name : ',100,60);
        pdf.setFontSize(12)
        pdf.text(item.testName,135,60);
        pdf.text('Test Date : ',100,70);
        pdf.setFontSize(12)
        let date=new Date (item.testDate).toLocaleString();
        pdf.text(date,135,70);
        //line
        pdf.line(10,80,200,80); 
        var col = ["Paramter","Result","Unit","Reference Value"];
        for(let i of item.numericalDetails){
          pdf.setFontSize(40);
          var temp = [i.testParameterName,i.numericalValue,i.unit,i.min_Range+'-'+i.max_Range];
          row.push(temp);
        }
        for(let i of item.categoricalDetails){
          pdf.setFontSize(40);
          var temp = [i.testParameterName,i.measuredValue,i.unit,i.normalValue];
          row.push(temp); 
        }
        (pdf as any).autoTable(col,row,{ startY: 90,headStyles :{fillColor : [1, 50, 78]},alternateRowStyles: {fillColor : [255, 255, 255]}
          ,styles: {
            overflow: 'linebreak',
            fontSize: 14,
           
        } ,columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 60},
          1: { fontStyle: 'bold', cellWidth: 40},
          2: { fontStyle: 'bold', cellWidth: 40},
          3: { fontStyle: 'bold', cellWidth: 50},
         
        }
        } );
      });
      window.open(pdf.output('bloburl'))
    }
  }
  showscan(index:number){
    this.array=[]
    this.indoorPatientRecords[index].patientscans.forEach(async(item:any,i:number) => {
      this.service.get("MedicalScan/getPatientScanById/"+item.patientScanId).subscribe(
      res=>{
        this.array.push(res);
        if(i==this.indoorPatientRecords[index].patientscans.length-1){
          this.printscan()
        }
      }
    )
    });

  }
  private printscan(){
    if(this.array.length>0){
      let pdf=new jsPDF()
      this.array.forEach((item:any) => {
        for(let i of item.scanImages){
          pdf.addImage("data:image/png;base64,"+i,"png",10,10,190,275)
          pdf.addPage()
        }
        pdf.addImage('assets/logo.png', 'jpg', 15, 10, 20, 15);
          pdf.text('university hospital',40,20)
          //patient name
          pdf.text('patient name : ',10,40);
          pdf.text(item.patientName,50,40);
          //gender
          pdf.text('Gender : ',10,50);
          pdf.text(this.patient.gender,50,50);
          //age
          pdf.text('Age: ',10,60);
          pdf.text(this.patient.age.toString(),50,60);
          //doctor name
          pdf.text('doctor name : ',100,40);
          pdf.text(item.doctorName,150,40);
          //date
          pdf.text('Date : ',100,50);
          pdf.text(item.scanDate.substring(0,10),150,50);
          //ray name
          pdf.text('ray type : ',100,60);
          pdf.text(item.scanName,150,60);
          //line
          pdf.line(10,70,200,70);
          //report----
          var splitText = pdf.splitTextToSize(item.writtenReport, 150);
          var y=80;
          for(var i = 0; i < splitText.length; i++){
            if (y > 275){
                y = 20;
                pdf.addPage();
               }
              pdf.text( splitText[i],20, y);
              y = y + 10
          }
      });
      window.open(pdf.output('bloburl'))
    }
  }
}

