import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-scans',
  templateUrl: './scans.component.html',
  styleUrls: ['../../styles/datatable.css','./scans.component.css']
})
export class ScansComponent implements OnInit {
  patient:any;
  loadflag=true;
  scanList:any[]=[];
  p:number=1
  constructor(private service:ServicesService) { }
  ngOnInit(): void {
    if(localStorage.getItem('userInfo')){
      this.patient=localStorage.getItem('userInfo')
      this.patient=JSON.parse(this.patient)
     }
     this.service.get('MedicalScan/getPatientScansByPatientId/'+this.patient.id).subscribe(
      (res:any)=>{ 
        this.scanList=res;
        this.loadflag=false
       }
    );
    
  }
  openpdf(id:number){
     let scan=this.scanList.find(n=>n.patientScanId==id)
     let pdf=new jsPDF()
     for(let i of scan.scanImages){
       pdf.addImage("data:image/png;base64,"+i,"png",10,10,190,275)
       pdf.addPage()
     }
     pdf.addImage('assets/logo.png', 'jpg', 15, 10, 20, 15);
       pdf.text('university hospital',40,20)
       //patient name
       pdf.text('patient name : ',10,40);
       pdf.text(scan.patientName,50,40);
       //gender
       pdf.text('Gender : ',10,50);
       pdf.text(this.patient.gender,50,50);
       //age
       pdf.text('Age: ',10,60);
       pdf.text(String(this.patient.age),50,60);
       //doctor name
       pdf.text('doctor name : ',100,40);
       pdf.text(scan.doctorName,150,40);
       //date
       pdf.text('Date : ',100,50);
       pdf.text(scan.scanDate.substring(0,10),150,50);
       //ray name
       pdf.text('ray type : ',100,60);
       pdf.text(scan.scanName,150,60);
       //line
       pdf.line(10,70,200,70);
       //report----
       var splitText = pdf.splitTextToSize(scan.writtenReport, 150);
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
