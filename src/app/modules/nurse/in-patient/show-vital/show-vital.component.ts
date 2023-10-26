import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { showvitalnurse } from 'src/app/models/vital-sign';
import { ServicesService } from 'src/app/services/services.service';
import { ShardserviceService } from 'src/app/services/shardservice.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-show-vital',
  templateUrl: './show-vital.component.html',
  styleUrls: ['../../../styles/showdata.css']
})
export class ShowVitalComponent implements OnInit ,OnDestroy{
  data:any={
    patientid:0,
    patientname:"",
    nurseid:0,
    patientage:0,
    nursename:"",
    indoorPatientId:0
  }
  startflag:boolean=false
  endflag:boolean=false
  toggle:boolean=false
  st_end_flag:boolean=false
  p: number = 1;
  totallength:any;
  vital:showvitalnurse[]=[]
  today:any=new Date()
  sideHostSubscriber:any
  constructor(private sidemanagerservice:SidemanagerService,private service:ServicesService,private router:Router) { }
  ngOnDestroy(): void {
    this.sideHostSubscriber?.unsubscribe()
  }

  ngOnInit(): void {
    this.sideHostSubscriber=this.sidemanagerservice.control.subscribe({
      next:res=>{
        this.data=res.data
        if(this.data.indoorPatientId==0){
          this.router.navigate(['../nurse/in-patient'])
        }
        else{
          this.today=this.today.toISOString().substring(0,8)+this.today.getDate()
        }
      }
    })


  }
  getvitals(start:string,end:string){
    if(start==''){
      this.startflag=true
    }
    else{
      this.startflag=false
    }
    if(end==''){
      this.endflag=true
    }
    else{
      this.endflag=false
    }
    if(start<=end){
      if(end==this.today){
        const tomorrow = new Date(this.today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        end=tomorrow.toISOString().substring(0,8)+tomorrow.getDate()
      }
      this.service.get("VitalSigns/GetVitalSignesByRangeOfDateTime/"+this.data.patientid+"/"+start+"/"+end).subscribe(
        (res:any)=>{
          this.vital=res
          this.toggle=true
          this.st_end_flag=false
          this.totallength=this.vital.length
        }
      )
    }
    else{
      this.st_end_flag=true
    }
  }

onchange(){
  this.startflag=false
  this.endflag=false
}
close(data?:any){
  this.sidemanagerservice.setControl({open:false,component:'',data:data});
}
}
