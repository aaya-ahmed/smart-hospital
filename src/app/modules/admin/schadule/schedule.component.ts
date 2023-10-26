import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['../../styles/datatable.css','./schedule.component.css']
})
export class scheduleComponent implements OnInit {
  department:any[]=[];
  color_btn:boolean=false;
  flag:boolean=false;
  constructor(private service:ServicesService,private sidemanager:SidemanagerService) { }
  ngOnInit(): void {
    this.service.get("Departments/GetAllClinicalDept").subscribe(
      (res:any)=>{
        this.department=res
        this.flag=true
      }
      )}
  toggle:boolean=false;
  gotoaddschedule(){
    this.toggle=true;
    this.color_btn=true
  }
  gotoshowschedule(){
    this.toggle=false
    this.color_btn=false
  }
  openaddschedulepage(){
    this.sidemanager.setControl({open:true,component:'addSchedule',data:{}})
  }
  
}
