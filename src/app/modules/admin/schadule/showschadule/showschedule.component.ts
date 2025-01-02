import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { doctors_schedule, list_schedule } from 'src/app/models/schadule';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-showschedule',
  templateUrl: './showschedule.component.html',
  styleUrls: ['./showschedule.component.css']
})
export class ShowScheduleComponent implements OnInit{
  toggle:boolean=false;
  p: number = 1;
  totallength:any
  schedules:doctors_schedule[]=[]
  loading:boolean=false;
  @Input('departments')departments:any[]=[];
  show:boolean=false
  id:number=0
  index1:number=0
  index2:number=0
  constructor(private services:ServicesService,private sideManager:SidemanagerService) { 
  }
  ngOnInit(): void {
    this.departments?.length>0&&this.getschedules(this.departments[0].id)
  }
  getschedules(departmentid:any){
    this.loading=true
    this.schedules=[]
    let id=-1
    if(Number.isInteger(departmentid)){
      id=departmentid
    }
    else{
      id=parseInt(departmentid.target.value)
    }
    this.services.get("Schedule/GetSchedulesByDepartment_Id"+"/"+id).subscribe(
      (res:any)=>{
        this.loading=false;
        if(res.length>0){
          this.schedules=res
          console.log(res)
          this.totallength=this.schedules.length
      }
     }
    );
  }
  delet(index1:number,index2:number){
    this.show=true
    this.id=(this.schedules[index1].scheduleObjects[index2] as list_schedule).scheduleId
    this.index1=index1
    this.index2=index2

  }
  deleteschadle(){
    this.services.delete('Schedule/DeleteSchedule/'+this.id).subscribe(
      res=>{
        this.schedules[this.index1].scheduleObjects.splice(this.index2,1)
        this.show=false
      },
      err=>{
      }
    )
  }
  updateSchedule(schedule:{id:number, name: string, schedule:number }){
    this.sideManager.setControl({open:true,component:'updateSchedule',data:schedule})
  }
  close(){
    this.show=false
  }
}
