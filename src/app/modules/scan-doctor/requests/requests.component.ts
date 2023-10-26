import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { requestscan } from 'src/app/models/scan';
import { ServicesService } from 'src/app/services/services.service';
import { ShardserviceService } from 'src/app/services/shardservice.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requestList:requestscan[]=[]
  inpatientrequests:requestscan[]=[]
  outpatientrequests:requestscan[]=[]
  dataflag=false;
  deletflag:boolean=false
  in_number=0
  out_number=0
  mess:string='No There Requests'
  today=new Date();
  constructor(private services:ServicesService,private route:Router,private shared:ShardserviceService) { }

  ngOnInit(): void {
    this.services.get("MedicalScan/getAllScanRequest").subscribe(
      (res:any)=>{
        this.requestList=res
        if(this.requestList.length==0){
          this.in_number=0
        this.out_number=0
          this.dataflag=false
        }
        else{
          this.dataflag=true
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
      }
    }
     );
    
  }
  gotoaddscan(request:requestscan ){
    this.shared.request=request
    this.route.navigateByUrl('scan doctor/addscan')
  }
  gotodelscan(request:requestscan){
    let reqdate=new Date(request.createdDtm);
    let Difference_In_Time = this.today.getTime() - reqdate.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if((Difference_In_Days)>10){
      let del_id=request.id
    this.services.delete("MedicalScan/deleteScanRequest/"+del_id).subscribe(
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
      this.dataflag=false;
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
