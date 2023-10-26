import { Component, OnInit } from '@angular/core';
import { scanList } from 'src/app/models/scan';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-scans',
  templateUrl: './scans.component.html',
  styleUrls: ['../../styles/datatable.css']
})
export class ScansComponent implements OnInit {
  scanlist:scanList[]=[]
  temp:scanList={
    id: 0,
    scanName: '',
    scanCharge: 0
  };
  loadflag:boolean=true;
  p: number = 1;
  totallength:any;
  constructor(private scanService:ServicesService,private sidehost:SidemanagerService) { }

  ngOnInit(): void {
    this.scanService.get('MedicalScan/getAll').subscribe(
      {
        next:(res:any)=>{
          this.scanlist=res;
          this.totallength=this.scanlist.length
          this.loadflag=false
        },
        error:err=>{
          this.loadflag=false
        }
      }
    )
  }
  openAddscanSide(){
    this.sidehost.setControl({open:true,component:'addscan',data:null})
    this.addscan()
  }
  openupdatescanside(scan:any,index:number){
    this.sidehost.setControl({open:true,component:'updatescan',data:{scan:scan}})
    this.updatescan(index);
  }
  private updatescan(index:number){
    let subscriber=this.sidehost.control.subscribe({
      next:res=>{
        if(res.open==false&&res.data){
          this.scanlist[index]=res.data
        }
        if(res.open==false){
          subscriber.unsubscribe()
        }
      }
    })
  }
  private addscan(){
    let subscriber=this.sidehost.control.subscribe({
      next:res=>{
        if(res.open==false&&res.data){
          this.scanlist.push(res.data)
          this.totallength=this.scanlist.length
        }
        if(res.open==false){
          subscriber.unsubscribe()
        }
      }
    })
  }
}
