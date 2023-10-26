import { Component, OnInit } from '@angular/core';
import { doctors_schedule } from 'src/app/models/schadule';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class scheduleComponent implements OnInit {
  loading:boolean=true;
  p: number = 1;
  totallength:any;
  schedules:doctors_schedule[]=[]
  scheduleflag:boolean=false;
  departments:any[]=[];
  activeitem:any;
  constructor(private services:ServicesService) { 
  }
  ngOnInit(): void {
        this.services.get("Departments/getAll").subscribe(
          (res:any)=>{
            this.departments=res;
            this.getschedules(res[0])
            this.activeitem=res[0]
            this.totallength=this.departments.length
          }
        )
  }
  getschedules(department:any){
    this.scheduleflag=false;
    if(Number.isInteger(department.target?.value)){
      this.activeitem=this.departments[department.target.value];
    }
    else{
      this.activeitem=department
    }
    this.services.get("Schedule/GetSchedulesByDepartment_Id"+"/"+this.activeitem.departmentId).subscribe(
      (res:any)=>{
        this.schedules=res
        this.totallength=this.schedules.length
        this.scheduleflag=true;
        this.loading=false;
     }
    );
  }
}
