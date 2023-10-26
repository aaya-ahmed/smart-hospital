import { Component, Input, OnInit } from '@angular/core';
import { labsList, patienttestlist, addlabRequst } from 'src/app/models/lab';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-req-lab',
  templateUrl: './req-lab.component.html',
  styleUrls: ['./req-lab.component.css']
})
export class ReqLabComponent implements OnInit {
  @Input("patient")patient:any
  @Input("outpatientflag")outpatientflag:number=0
  indoorPatientRecordId:any;
  doctor:any;
  testsList:labsList[]=[];
  testRuquestNames:labsList[]=[];
  RequstList:addlabRequst[]=[]
  searchedTestsList:patienttestlist[]=[];
  choosenlab:number[]=[]
  labindex:number=0;
  date=new Date().toISOString();
  submitlabflag:boolean=false
  successflag:boolean=false
  errorflag:boolean=false
  constructor(private service:ServicesService) { }
  ngOnInit(): void {
    if(localStorage.getItem('userInfo')){
      this.doctor=localStorage.getItem('userInfo')
      this.doctor=JSON.parse(this.doctor)
     }
    this.service.getTestNames().subscribe(
      res=>
      {
        this.testsList=res
      }
      )
  }
  add_lab_to_list(index:any)
  {
    let flag=true
    let labindex=index.target.value;
    for(let i of this.choosenlab){
      if(labindex==i){
        flag=false
        break;
      }
    }
    if(flag){
      if(this.outpatientflag){
      this.indoorPatientRecordId=null
    }
    else{
      this.indoorPatientRecordId=parseInt(this.patient.indoorPatientRecordId)
    }
   let requstData={
     labName:this.testsList[labindex].name,
     createdDtm:this.date,
     patientId:parseInt(this.patient.patientId),
     doctorId:this.doctor.id,
     indoorPatientRecordId:this.indoorPatientRecordId
   }
   this.choosenlab.push(labindex);
   this.RequstList.push(requstData);

    }




  }
  remove_from_lab_list(index:number){
    this.choosenlab.splice(index,1);
    this.RequstList.splice(index,1)
  }
  send_lab_request(){
    if(this.RequstList.length>=1){
         this.service.post('MedicalTest/addLabRequests',this.RequstList).subscribe(
          (res:any)=>{
            this.RequstList=[]
            this.successflag=true
            setTimeout(() => {
              this.successflag=false
            }, 500);
          });
        
    }
    else{
      this.submitlabflag=true
      this.errorflag=true
            setTimeout(() => {
              this.errorflag=false
            }, 500);
    }
  
  }
}
