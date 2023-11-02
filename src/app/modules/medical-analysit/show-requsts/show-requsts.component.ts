import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAllLabRequsts } from 'src/app/models/lab';
import { ServicesService } from 'src/app/services/services.service';
import { ShardserviceService } from 'src/app/services/shardservice.service';

@Component({
  selector: 'app-show-requsts',
  templateUrl: './show-requsts.component.html',
  styleUrls: ['./show-requsts.component.css']
})
export class ShowRequstsComponent implements OnInit {
  requestList:getAllLabRequsts[]=[]
  inpatientrequests:getAllLabRequsts[]=[]
  outpatientrequests:getAllLabRequsts[]=[]
  pagestatus:number=100;
  in_number=0
  out_number=0
  mess:string='There is No Requests'
  today=new Date();
  deletflag:boolean=false
  constructor(private services:ServicesService,private route:Router,private shared:ShardserviceService) { }

  ngOnInit(): void {
    this.services.get("MedicalTest/getAllLabRequest").subscribe(
      (res:any)=>{
        this.requestList=res
        if(this.requestList.length==0){
          this.in_number=0
          this.out_number=0
          this.pagestatus=400
        }
        else{
        for(let i of this.requestList){
          if(i.indoorPatientRecordId==null){
            this.outpatientrequests.push(i)
          }
          else{
            this.inpatientrequests.push(i)
          }
        }
        this.in_number=this.inpatientrequests.length
        this.out_number=this.outpatientrequests.length
        this.pagestatus=200
      }
    },
    err=>{
      this.pagestatus=400
    }

     );
    
  }
  gotoaddtest(request:getAllLabRequsts){
    this.shared.testrequest=request
    this.route.navigateByUrl('lab doctor/test')
  }
  gotodeltest(request:getAllLabRequsts){
    let reqdate=new Date(request.createdDtm);
    let Difference_In_Time = this.today.getTime() - reqdate.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if((Difference_In_Days)>10){
      let del_id=request.id
    this.services.delete("MedicalTest/deleteLabRequest/"+del_id).subscribe(
      res=>{
        if(request.indoorPatientRecordId==null){
          let index=this.outpatientrequests.findIndex(n=>n.id==del_id)
        this.outpatientrequests.splice(index,1)
        this.out_number=this.out_number-1
        }
        else{
          let index=this.inpatientrequests.findIndex(n=>n.id==del_id)
        this.inpatientrequests.splice(index,1)
        this.in_number=this.in_number-1
        }
      }
    )
    if(this.requestList.length==0){
      this.pagestatus=400
    }
    }
    else{
      this.deletflag=true
      setTimeout(() => {
        this.deletflag=false
      }, 1000);
    }
  }
  gotoaddscan(request:getAllLabRequsts ){
    this.shared.testrequest=request
    this.route.navigateByUrl('lab doctor/testresult')
  }
  gotodelscan(request:getAllLabRequsts){
    let reqdate=new Date(request.createdDtm);
    let Difference_In_Time = this.today.getTime() - reqdate.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if((Difference_In_Days)>10){
      let del_id=request.id
    this.services.delete("MedicalTest​/deleteLabRequest​/"+del_id).subscribe(
      res=>{
        if(request.indoorPatientRecordId==null){
          let index=this.outpatientrequests.findIndex(n=>n.id==del_id)
        this.outpatientrequests.splice(index,1)
        this.out_number=this.out_number-1
        }
        else{
          let index=this.inpatientrequests.findIndex(n=>n.id==del_id)
        this.inpatientrequests.splice(index,1)
        this.in_number=this.in_number-1
        }
      }
    )
    if(this.requestList.length==0){
      this.pagestatus=400
    }
    }
    else{
      this.deletflag=true
      setTimeout(() => {
        this.deletflag=false
      }, 1000);
    }
  }
}
  
