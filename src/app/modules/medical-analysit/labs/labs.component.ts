import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';
@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['../../styles/datatable.css']
})
export class LabsComponent implements OnInit {
  alltests:any;
  totallength=0;
  loadflag:boolean=true;
  p: number = 1;
  constructor(private service:ServicesService,private _router:Router,private sidehost:SidemanagerService) { }
  ngOnInit(): void {
    this.service.getTestNames().subscribe(
      (res:any)=>{
        this.alltests=res;
        this.totallength=this.alltests.length
        this.loadflag=false
      });
  }

  // deleteTest(testId:number){
  //   this.deletTestId=testId
  //   this.deleteMess=true;
  // } 
  openAddtestSide(){
    this.sidehost.setControl({open:true,component:'addtest',data:null})
    this.addtest()
  }
  openupdatetestside(test:any,index:number){
    this.sidehost.setControl({open:true,component:'updatetest',data:{test:test}})
    this.updatetest(index);
  }
  private updatetest(index:number){
    let subscriber=this.sidehost.control.subscribe({
      next:res=>{
        if(res.open==false&&res.data){
          this.alltests[index]=res.data
        }
        if(res.open==false){
          subscriber.unsubscribe()
        }
      }
    })
  }
  private addtest(){
    let subscriber=this.sidehost.control.subscribe({
      next:res=>{
        if(res.open==false&&res.data){
          this.alltests.push(res.data)
          this.totallength=this.alltests.length
        }
        if(res.open==false){
          subscriber.unsubscribe()
        }
      }
    })
  }
}
