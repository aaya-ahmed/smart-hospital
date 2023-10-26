import { Component, OnInit } from '@angular/core';
import { scanList } from 'src/app/models/scan';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-scanform',
  templateUrl: './scanform.component.html',
  styleUrls: ['../../../styles/addingform.css']
})
export class ScanFormComponent implements OnInit {
  scan:scanList={
    id: 0,
    scanName: '',
    scanCharge: 0
  };
  submitted:boolean=false;
  updateflag:boolean=false;
  subscriber:any
  constructor(private scanService:ServicesService,private sidehost:SidemanagerService) { }
  ngOnInit(): void {
    this.subscriber=this.sidehost.control.subscribe({
      next:res=>{
        if(res.data?.scan){
          this.scan=res.data?.scan;
          this.updateflag=true;
        }
      }
    })
  }
  save(form:any){
    if(form.valid){
      this.submitted=true
      if(this.updateflag){
        this.update()
      }
      else{
        this.add()
      }
    }
  }
  private add(){
    this.scanService.post('MedicalScan/add',this.scan).subscribe(
      {
        next:(res:any)=>{
          this.close(res)
        },
        error:err=>{
          this.submitted=false
        }
      }
    )
  }
  private update(){
    this.scanService.update('MedicalScan/update',this.scan).subscribe(
      {
        next:(res:any)=>{
          this.close(res)
        },
        error:err=>{
          this.submitted=false;
        }
      }
    )
  }
  close(data=null){
    this.subscriber?.unsubscribe()
    this.sidehost.setControl({open:false,component:'',data:data})
  }
}

