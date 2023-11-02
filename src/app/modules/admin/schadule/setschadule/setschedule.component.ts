import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { doctors_schedule, newDocschedule } from 'src/app/models/schadule';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

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
schedulemodified={
    id: 0,
    doctorId: 0,
    dayOfWork: 0,
    startTime: '',
    endTime: '',
    timePerPatient: ''
  
}
schedulemodified1={
  dayOfWork: 0,
  startTime: '',
  endTime: '',
  timePerPatient: ''

}
timeOfWork:{day:number,times:{st:string,et:string}[]}[]=[
  {day:0,times:[]},
  {day:1,times:[]}, 
  {day:2,times:[]}, 
  {day:3,times:[]},
  {day:4,times:[]},
  {day:5,times:[]},
  {day:6,times:[]}
];
allnewschedule:newDocschedule[]=[]
updateform:FormGroup=new FormGroup(
 { dayofwork:new FormControl('',[Validators.required]),
starttime:new FormControl('',[Validators.required]),
endtime:new FormControl('',[Validators.required]),
perpatienttime:new FormControl('',[Validators.required,Validators.pattern("^(00):([1-5]?[0-9]?)$")])
}
)
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
  errorflag:boolean=false
  constructor(private services:ServicesService,private sidemanager:SidemanagerService) { }
  ngOnInit(): void {
    this.sidemanager.control.subscribe(res=>{
      this.departments=res.data
    })
  }

  getschedules(departmentid:any){
    let id=parseInt(departmentid.target.value)
    this.tableflag=false
    this.services.get("Schedule/GetSchedulesByDepartment_Id"+"/"+id).subscribe(
      (res:any)=>{
        this.schedules=res
        if(this.schedules.length>0){
          this.doctorFlag=true;
          this.timeOfWork=[
            {day:0,times:[]},
            {day:1,times:[]}, 
            {day:2,times:[]}, 
            {day:3,times:[]},
            {day:4,times:[]},
            {day:5,times:[]},
            {day:6,times:[]}
          ];
          this.set_timeofwork();
        }
        else{
          this.doctorFlag=false
        }
        
     },
      (err:any)=>{
        this.errormessage='Not Found'
        this.doctorFlag=false;
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
    this.services.post("Schedule",this.allnewschedule).subscribe(
      (res:any)=>{
        
        this.successflag=true;
        setTimeout(() => {
          this.successflag=false;
          this.allnewschedule=[];
        this.scheduletableflag=false
        this.departmentflag=false
        }, 2000);
      },
      err=>{
        this.errorflag=true;
        setTimeout(() => {
          this.errorflag=false;
        }, 2000);
      }
    );
  }
  setschedulemodified(index:number){
    this.updateform.setValue({
      dayofwork:this.tempschedule.scheduleObjects[index].dayOfWork,
      starttime: this.tempschedule.scheduleObjects[index].startTime.substring(0,5),
      endtime:this.tempschedule.scheduleObjects[index].endTime.substring(0,5),
      perpatienttime:this.tempschedule.scheduleObjects[index].timePerPatient.substring(0,5)
    })
    this.schedulemodified.id= this.tempschedule.scheduleObjects[index].scheduleId
    this.schedulemodified.doctorId= this.tempschedule.doctorId;
    this.schedulemodified.dayOfWork=this.tempschedule.scheduleObjects[index].dayOfWork
    this.schedulemodified.startTime=this.tempschedule.scheduleObjects[index].startTime.substring(0,5)
    this.schedulemodified.endTime=this.tempschedule.scheduleObjects[index].endTime.substring(0,5)
    this.schedulemodified.timePerPatient=this.tempschedule.scheduleObjects[index].timePerPatient.substring(0,5)
    let indextemp=this.timeOfWork[this.schedulemodified.dayOfWork].times.findIndex(e=>e.st==this.schedulemodified.startTime)
    this.timeOfWork[this.schedulemodified.dayOfWork].times.splice(indextemp,1);
    this.addflag=false;
  }
  update(){
    this.submitted=true;
    this.checktime(this.updateform.controls['starttime'].value,this.updateform.controls['endtime'].value)
if(this.updateform.valid&&this.timeflag){
  this.schedulemodified.doctorId= this.tempschedule.doctorId;
  this.schedulemodified.dayOfWork=parseInt(this.updateform.controls['dayofwork'].value )
  this.schedulemodified.startTime=this.updateform.controls['starttime'].value
  this.schedulemodified.endTime=this.updateform.controls['endtime'].value
  this.schedulemodified.timePerPatient=this.updateform.controls['perpatienttime'].value
  this.checkschedule(this.schedulemodified)
  if(this.check){
    this.services.update("Schedule/UpdateSchedule",this.schedulemodified).subscribe(
         ( res:any)=>{
           let index=this.schedules.findIndex((e:any)=>e.doctorId==res.doctorId)
           let index2=this.schedules[index].scheduleObjects.findIndex(e=>e.scheduleId==res.id)
          this.schedules[index].scheduleObjects.splice(index2,1)

           this.schedules[index].scheduleObjects.push({
            dayOfWork: res.dayOfWork,
            scheduleId: res.id,
            endTime:res.endTime,
             startTime:res.startTime,
            timePerPatient:res.timePerPatient
            })
            this.successflag=true;
            setTimeout(() => {
              this.successflag=false;
              this.addflag=true;
              this.submitted=false
              this.timeflag=false
            }, 2000);
          
          },
          err=>{
            this.errorflag=true;
            setTimeout(() => {
              this.errorflag=false;
              
            }, 2000);
          }
        )
      }
  else{
    setTimeout(() => {
      this.check=true
    }, 2000);
  }
}
}    
 
  cancelupdate(){
    this.addflag=true;
  }
  set_timeofwork(){
    for(let i of this.schedules){
      for(let j of i.scheduleObjects){
        switch(j.dayOfWork){
          case 0:
            this.timeOfWork[0].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 1:
            this.timeOfWork[1].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 2:
            this.timeOfWork[2].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 3:
            this.timeOfWork[3].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 4:
            this.timeOfWork[4].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 5:
            this.timeOfWork[5].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 6:
            this.timeOfWork[6].times.push({'st':j.startTime,'et':j.endTime})
            break;
        }
      }
    }
  }
checkschedule(object:any){
    this.timeOfWork[object.dayOfWork].times =  this.timeOfWork[object.dayOfWork].times.sort((first, second) => 0 - (first.st > second.st ? -1 : 1));
    let len=this.timeOfWork[object.dayOfWork].times.length
    if(len>0){
        if(((object.startTime<=this.timeOfWork[object.dayOfWork].times[0].st)&&(object.endTime<=this.timeOfWork[object.dayOfWork].times[0].st))||
        ((object.startTime>=this.timeOfWork[object.dayOfWork].times[len-1].et)&&(object.endTime>=this.timeOfWork[object.dayOfWork].times[len-1].et)))
        {
          this.timeOfWork[object.dayOfWork].times.push({'st':object.startTime,'et':object.endTime})
          this.check=true;
        }
      else{
        this.check=false;
        for(let i=0;i<len-2;i++){
          if((object.startTime>=this.timeOfWork[object.dayOfWork].times[i].et)&&(object.endTime<=this.timeOfWork[object.dayOfWork].times[i+1].st)){
            this.timeOfWork[object.dayOfWork].times.push({'st':object.startTime,'et':object.endTime})    
            this.check= true;
                break;
            }
          }
      }
    }
  else{
    this.timeOfWork[object.dayOfWork].times.push({'st':object.startTime,'et':object.endTime})  
    this.check=true;
  }
  }
  deleteschedule(obj:newDocschedule){
    let timeIndex=this.timeOfWork[obj.dayOfWork].times.findIndex(e=>e.st==obj.startTime);
    this.timeOfWork[obj.dayOfWork].times.splice(timeIndex,1)
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
