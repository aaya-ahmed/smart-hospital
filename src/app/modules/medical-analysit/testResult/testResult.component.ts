import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { firstValueFrom } from 'rxjs';
import { CategoricalParamter, NumericalParamter, NumericalDetail, CategoricalDetail, resultData, getAllLabRequsts } from 'src/app/models/lab';
import { ServicesService } from 'src/app/services/services.service';
import { ShardserviceService } from 'src/app/services/shardservice.service';

@Component({
  selector: 'app-testResult',
  templateUrl: './testResult.component.html',
  styleUrls: ['./testResult.component.css']
})
export class TestResultComponent implements OnInit {
  showform:boolean=false;
  isrequest:boolean=false;
  test :FormGroup=new FormGroup({
    testDate:new FormControl(new Date().toISOString().substring(0,10)),
    testname:new FormControl('',[Validators.required]),
    docname:new FormControl('',[Validators.required]),
    patientname:new FormControl('',[Validators.required]),
    age:new FormControl(10,[Validators.required]),
    gender:new FormControl('',[Validators.required]),
    categoricalDetails:new FormControl([]),
    numericalDetails:new FormControl([])
  });
  testslist:any[]=[]
  issubmitted:boolean=false
  constructor(private shared:ShardserviceService,private service:ServicesService,private router:Router) { }
  get numericalDetails(){
    return this.test.controls['numericalDetails'].value as Array<any>
  }
  get categoricalDetails(){
    return this.test.controls['categoricalDetails'].value as Array<any>
  }
  ngOnInit(): void { 
    console.log(this.shared.testrequest)
    if(this.shared.testrequest.id==-1){
      this.isrequest=true
      this.service.get('MedicalTest/getAll').subscribe(
        (res:any)=>{
          this.testslist=res;
        }
      );
    }
    else{
      this.setpatientfields(this.shared.testrequest.patientId)
      this.settestfields(this.shared.testrequest.testId);
    }
  }
async setpatientfields(patientId:number){
  await firstValueFrom (this.service.get("Patient/"+patientId)).then(
    (res:any)=>{
      this.test.patchValue({
        patientname:this.shared.testrequest.patientName,
        age:res.age,
        gender:res.gender
      })
    });
}
async settestfields(testid:number){
     await firstValueFrom(this.service.get("MedicalTest/getById/"+testid)).then(
      (res:any)=>{
        this.test.patchValue({
          testname:res.name,
          docname:this.shared.testrequest.doctorName
        })
        this.categoricalfields(res.categoricalParamters)
        this.numericalfields(res.numericalParamters)
        this.showform=true;
  });
}
private numericalfields(fields:any[]){
  this.test.patchValue({
    numericalDetails:[]
  })
  for(let item of fields)
  {
    this.test.controls['numericalDetails'].value.push(
      {
        id:item.id,
        parameterName:item.testParameterName,
        result:new FormControl('',[Validators.required,Validators.pattern(item.inputPattern)]),
        unit:item.unit,
        max_Range:item.max_Range,
        min_Range:item.min_Range
      }
    )       
  }
}
private categoricalfields(fields:any[]){
  this.test.patchValue({
    categoricalDetails:[]
  })
  for(let item of fields)
  {
    this.test.controls['categoricalDetails'].value.push(
      {
        id:item.id,
        parameterName:item.testParameterName,
        result:new FormControl(item.result,[Validators.required,Validators.pattern('[a-zA-z]*')]),
        unit:item.unit,
        normalRange:item.normalvalue
      }
    )   
  }
}
settest(id:any){
  this.showform=false;
  let test=this.testslist.find(p=>p.id==id.target.value)
  this.test.patchValue({
    testname:test.name
  })
  this.categoricalfields(test.categoricalParamters)
  this.numericalfields(test.numericalParamters)
  this.showform=true
}
paramtersvalue(){
  this.issubmitted=true;
  if(this.test.valid){
    if(this.isrequest){
      this.printlab(this.test.value)
    }
    else{
      let testresult={
        labRequestId: this.shared.testrequest.id,
        testDate: this.test.value.testDate,
        indoorPatientRecordId: this.shared.testrequest.indoorPatientRecordId,
        categoricalDetails:[{}],
        numericalDetails: [{}]
      }
      testresult.numericalDetails.pop()
      this.test.value.numericalDetails.forEach((item:any) => {
        testresult.numericalDetails.push(
          {
            testParameterId: item.id,
            testParameterName: item.parameterName,
            unit: item.unit,
            numericalValue: item.result.value,
            min_Range: item.min_Range,
            max_Range: item.max_Range
          }
        )
      });
      testresult.categoricalDetails.pop()
      this.test.value.categoricalDetails.forEach((item:any) => {
        testresult.categoricalDetails.push(
          {
            "testParameterId": item.id,
            "testParameterName": item.parameterName,
            "unit": item.unit,
            "measuredValue": item.result.value,
            "normalValue": item.normalRange
          }
        )
      });
      this.service.post("MedicalTest/addPatientTest",testresult).subscribe(
        res=>{
          this.close()
        },
        err=>{}
        );
    }
  }
}
printlab(test:any){
    var pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage('assets/logo.png', 'png', 10, 5, 20, 20);
    pdf.setFontSize(10)
    pdf.text('Fayoum University Hospital',5,30)
    //patient Info 
    pdf.setFontSize(13)
    pdf.text('Patient Name : ',10,50);
    pdf.setFontSize(12)
    pdf.text(test.patientname,50,50);
    pdf.setFontSize(13)
    pdf.text('Gender : ',10,60)
    pdf.setFontSize(12);
    pdf.text(test.gender,50,60);
    pdf.setFontSize(13)
    pdf.text('Age : ',10,70);
    pdf.setFontSize(12)
    pdf.text(test.age.toString(),50,70);
    pdf.setFontSize(13)
    pdf.text('Doctor Name : ',100,50);
    pdf.setFontSize(12)
    pdf.text(test.docname,135,50);
    pdf.text('Test Name : ',100,60);
    pdf.setFontSize(12)
    pdf.text(test.testname,135,60);
    pdf.text('Test Date : ',100,70);
    pdf.setFontSize(12)
    pdf.text(test.testDate,135,70);
    //line
    pdf.line(10,80,200,80); 
   // test Items
    let col = ["Paramter","Result","Unit","Reference Value"];
    let rows=[]
    for(let i of test.numericalDetails){
      pdf.setFontSize(50);
      var temp = [i.parameterName,i.result.value,i.unit,i.min_Range+'-'+i.max_Range];
      rows.push(temp);
    }
    for(let i of test.categoricalDetails){
      pdf.setFontSize(50);
      var temp = [i.parameterName,i.result.value,i.unit,i.normalValue];
      rows.push(temp);
    }
    (pdf as any).autoTable(col,rows,
      { startY: 90,
        headStyles :{fillColor : [1, 50, 78]},
        alternateRowStyles: {fillColor : [255, 255, 255]},
        styles: {
        overflow: 'linebreak',
        fontSize: 14
        } 
        ,columnStyles: {
          0: { fontStyle: 'bold', columnWidth: 60},
          1: { fontStyle: 'bold', columnWidth: 40},
          2: { fontStyle: 'bold', columnWidth: 40},
          3: { fontStyle: 'bold', columnWidth: 50},
        }  
      });
    window.open(pdf.output('bloburl'))
  
}
close(){
  this.router.navigate(['lab doctor/profile'])
}
}
