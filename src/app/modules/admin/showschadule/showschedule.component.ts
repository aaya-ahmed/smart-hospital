import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { doctors_schedule } from 'src/app/models/schadule';
import { ServicesService } from 'src/app/services/services.service';

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
  loading:boolean=true;
  @Input('departments')departments:any[]=[];
  show:boolean=false
  id:number=0
  index1:number=0
  index2:number=0
  constructor(private services:ServicesService) { 
  }
  ngOnInit(): void {
    this.getschedules(this.departments[0].id)
  }
  getschedules(departmentid:any){
    console.log(typeof departmentid)
    console.log(Number.isNaN(+departmentid))
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
          this.totallength=this.schedules.length
      }
     }
    );
  }
  delet(index1:number,index2:number){
    this.show=true
    this.id=this.schedules[index1].scheduleObjects[index2].scheduleId
    this.index1=index1
    this.index2=index2

  }
  deleteschadle(){
    this.services.delete('Schedule/DeleteSchedule/'+this.id).subscribe(
      res=>{
      },
      err=>{
        if(err.status==200){
          this.schedules[this.index1].scheduleObjects.splice(this.index2,1)
          this.show=false
        }
      }
    )
  }
  close(){
    this.show=false
  }
}
