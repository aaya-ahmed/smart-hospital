import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { doctors_schedule, newDocschedule } from 'src/app/models/schadule';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';
let timeOfWork:{day:number,times:{st:string,et:string}[]}[]=[
{day:0,times:[]},
{day:1,times:[]}, 
{day:2,times:[]}, 
{day:3,times:[]},
{day:4,times:[]},
{day:5,times:[]},
{day:6,times:[]}
];
@Component({
  selector: 'app-setschedule',
  templateUrl: './setschedule.component.html',
  styleUrls: ['./setschedule.component.css']
})
export class SetScheduleComponent implements OnInit {
  @Input('departments')departments:any[]=[];
  schedules:doctors_schedule[]=[]
  tempschedule:doctors_schedule={
    doctorId: 0,
    doctorName: '',
    scheduleObjects: []
  }
  newschedule:newDocschedule={
    doctorId:0,
    dayOfWork:0,
    startTime:'',
    endTime:'',
    timePerPatient:''
}
allnewschedule:newDocschedule[]=[]
  errormessage:String='No Items'
  doctorFlag:boolean=false
  tableflag:boolean=false
  timeflag=false
  scheduletableflag:boolean=false;
  addNewscheduleFlag:boolean=false;
  submitted:boolean=false;
  doctorlist:string[]=[]
  addflag:boolean=true;
  departmentflag:boolean=false
  check:boolean=true
  successflag:boolean=false;
  errorflag:boolean=false;
  submitFlag:boolean=false;
  constructor(private services:ServicesService,private sidemanager:SidemanagerService) { }
  ngOnInit(): void {
    this.sidemanager.control.subscribe(res=>{
      this.departments=res.data
    })
  }

  getschedules(departmentid:any){
    let id=parseInt(departmentid.target.value)
    this.tableflag=false;
    timeOfWork=[
      {day:0,times:[]},
      {day:1,times:[]}, 
      {day:2,times:[]}, 
      {day:3,times:[]},
      {day:4,times:[]},
      {day:5,times:[]},
      {day:6,times:[]}
    ];
    this.services.get("Schedule/GetSchedulesByDepartment_Id"+"/"+id).subscribe(
      (res:any)=>{
        this.schedules=res
        if(this.schedules.length>0){
          this.set_timeofwork();
        }
     },
      (err:any)=>{
        this.errormessage='Not Found'
      }
    );
  }
  getdoctorschedule(index:any){
    let indexDoctor=parseInt(index.target.value)
    this.tempschedule={
      doctorId: 0,
      doctorName: '',
      scheduleObjects: []
    }
    this.tempschedule=this.schedules[indexDoctor]
      this.tableflag=true
  }
  addnew(){
    this.addNewscheduleFlag=true;
  }
  add_to_new_schedule_list(scheduleform:any){
    this.submitted=true
    this.timeflag=false
    this.checktime(scheduleform.value.starttime,scheduleform.value.endtime)
    if(scheduleform.valid&&this.timeflag){
      this.departmentflag=true
      let id=this.tempschedule.doctorId
    let newschedule={
      doctorId:id,
      dayOfWork:parseInt(scheduleform.value.workday),
      startTime:scheduleform.value.starttime,
      endTime:scheduleform.value.endtime,
      timePerPatient:scheduleform.value.perpatient
  };
  this.checkschedule(newschedule);
  if(this.check){
    this.allnewschedule.push(newschedule);
    this.doctorlist.push(this.tempschedule.doctorName)
    scheduleform.reset()
    this.submitted=false
    this.scheduletableflag=true
  }
  else{
setTimeout(() => {
  this.check=true
}, 1000);
    this.submitted=true
  }

}
  }
  submitallschedule(){
    this.submitFlag=true;
    this.services.post("Schedule",this.allnewschedule).subscribe(
      (res:any)=>{
        
        this.successflag=true;
        setTimeout(() => {
          this.successflag=false;
          this.submitFlag=false;
          this.allnewschedule=[];
        this.scheduletableflag=false
        this.departmentflag=false
        }, 2000);
      },
      err=>{
        this.errorflag=true;
        setTimeout(() => {
          this.errorflag=false;
          this.submitFlag=false;
        }, 2000);
      }
    );
  }

 
  cancelupdate(){
    this.addflag=true;
  }
  set_timeofwork(){
    for(let i of this.schedules){
      for(let j of i.scheduleObjects){
        switch(j.dayOfWork){
          case 0:
            timeOfWork[0].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 1:
            timeOfWork[1].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 2:
            timeOfWork[2].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 3:
            timeOfWork[3].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 4:
            timeOfWork[4].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 5:
            timeOfWork[5].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 6:
            timeOfWork[6].times.push({'st':j.startTime,'et':j.endTime})
            break;
        }
      }
    }
  }
checkschedule(object:any){
  console.log(object)
    timeOfWork[object.dayOfWork].times =  timeOfWork[object.dayOfWork].times.sort((first, second) => 0 - (first.st > second.st ? -1 : 1));
    let len=timeOfWork[object.dayOfWork].times.length
    if(len>0){
        if(((object.startTime<=timeOfWork[object.dayOfWork].times[0].st)&&(object.endTime<=timeOfWork[object.dayOfWork].times[0].st))||
        ((object.startTime>=timeOfWork[object.dayOfWork].times[len-1].et)&&(object.endTime>=timeOfWork[object.dayOfWork].times[len-1].et)))
        {
          timeOfWork[object.dayOfWork].times.push({'st':object.startTime,'et':object.endTime})
          this.check=true;
        }
      else{
        this.check=false;
        for(let i=0;i<len-2;i++){
          if((object.startTime>=timeOfWork[object.dayOfWork].times[i].et)&&(object.endTime<=timeOfWork[object.dayOfWork].times[i+1].st)){
            timeOfWork[object.dayOfWork].times.push({'st':object.startTime,'et':object.endTime})    
            this.check= true;
                break;
            }
          }
      }
    }
  else{
    timeOfWork[object.dayOfWork].times.push({'st':object.startTime,'et':object.endTime})  
    this.check=true;
  }
  }
  deleteschedule(obj:newDocschedule){
    let timeIndex=timeOfWork[obj.dayOfWork].times.findIndex(e=>e.st==obj.startTime);
    timeOfWork[obj.dayOfWork].times.splice(timeIndex,1)
    let index=this.allnewschedule.findIndex(e=>e.startTime==obj.startTime)
    this.doctorlist.splice(index,1)
    this.allnewschedule.splice(index,1);
    if(this.allnewschedule.length==0){
      this.scheduletableflag=false
      this.departmentflag=false
    }
  }
  checktime(start:any,end:any){
    if(start>end){
      this.timeflag=false
    }
    else{
      this.timeflag=true
    }
  }
  resetchecktime(start:any,end:any){
    if(start.value!=''&&end.value!=''&&end.value>start.value){
      this.timeflag=false
    }
  }

}
