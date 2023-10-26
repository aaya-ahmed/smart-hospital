import { Component, Input, OnInit } from '@angular/core';
import { requestscanByIds, scanList } from 'src/app/models/scan';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-req-scan',
  templateUrl: './req-scan.component.html',
  styleUrls: ['./req-scan.component.css']
})
export class ReqScanComponent implements OnInit {

  @Input("patient")patient:any
  mess:string=""
  scanlist:scanList[]=[] 
  request:requestscanByIds={
    scanName: '',
    createdDtm: '',
    patientId: 0,
    doctorId: 0,
    indoorPatientRecordId: null
  }
  successflag:boolean=false
  errorflag:boolean=false
  requestscanlist:requestscanByIds[]=[];
  choosenscan:number[]=[];
  submitscanflag:boolean=false;
  doctor:any;
  constructor(private scanservice:ServicesService) { }
  ngOnInit(): void {
    if(localStorage.getItem('userInfo')){
      this.doctor=localStorage.getItem('userInfo')
      this.doctor=JSON.parse(this.doctor)
     }
    this.scanservice.get("MedicalScan/getAll").subscribe(
      (res:any)=>{
        this.scanlist=res;
      }
    )}

  add_to_scan_list(event:any){
    let index=event.target.value;
    let flag=true;
    this.submitscanflag=false;
    for(let i of this.choosenscan){
      if(index==i){
        flag=false;
        break
      }
    }
    if(flag){
      let temp:any={
        scanName:this.scanlist[index].scanName,
        createdDtm: new Date().toISOString().substring(0,10),
        patientId:parseInt(this.patient.patientId),
        doctorId: this.doctor.id,
        indoorPatientRecordId:null
      }
        if(parseInt(this.patient.indoorPatientRecordId)!=-1){
          temp.indoorPatientRecordId=parseInt(this.patient.indoorPatientRecordId)
        }

      this.requestscanlist.push(temp);
      this.choosenscan.push(index)
    }
    
  }
  remove_from_scan_list(event:any){
    this.choosenscan.splice(event,1)
    this.requestscanlist.splice(event,1)
  }
  send_scan_request(){
    if(this.requestscanlist.length>0){
      this.scanservice.post("MedicalScan/addScanRequests",this.requestscanlist).subscribe(
        (res:any)=>{
          this.successflag=true
          this.choosenscan=[]
          this.requestscanlist=[]
          setTimeout(() => {
            this.successflag=false
          }, 500);
        },
        err=>{
          this.errorflag=true
          setTimeout(() => {
            this.errorflag=false
          }, 500);
        }
      )
    }
    else{
      this.submitscanflag=true;
      
    }
  }

    }
