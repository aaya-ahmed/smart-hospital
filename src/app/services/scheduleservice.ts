import { HttpClient } from "@angular/common/http";
import { Injectable, Input } from "@angular/core";
import { doctors_schedule, newDocschedule } from "../models/schadule";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ServicesService } from "./services.service";
import { Subject } from "rxjs";
@Injectable()
export class schedule{
    schedules:Subject<doctors_schedule[]>=new Subject()
    newSchedules:Subject<newDocschedule[]>=new Subject()
    private schedulemodified={
        id: 0,
        doctorId: 0,
        dayOfWork: 0,
        startTime: '',
        endTime: '',
        timePerPatient: ''
    }
    private timeOfWork:{day:number,times:{st:string,et:string}[]}[]=[{day:0,times:[]},{day:1,times:[]},{day:2,times:[]},{day:3,times:[]},{day:4,times:[]},{day:5,times:[]},{day:6,times:[]}];
    constructor(private services:ServicesService) { }
    getschedules(departmentid:number){
        this.services.get("Schedule/GetSchedulesByDepartment_Id"+"/"+departmentid).subscribe(
            (res:any)=>{
                if(res.length>0){
                  this.schedules.next(res);
                    this.timeOfWork=[{day:0,times:[]},{day:1,times:[]},{day:2,times:[]},{day:3,times:[]},{day:4,times:[]},{day:5,times:[]},{day:6,times:[]}];
                    this.set_timeofwork();
                }
            },
            (err:any)=>{}
        );
    }
    private set_timeofwork(){
      let subscriber=this.schedules.subscribe(
        res=>{
          for(let i of res){
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
          subscriber.unsubscribe()
        }
      )

    }
    add_to_new_schedule_list(newSchedule:newDocschedule){
      if(this.checktime(newSchedule.startTime,newSchedule.endTime)){
        if(this.checkschedule(newSchedule)){
            this.newSchedules.push(newSchedule);
        }
      }
    }
    private checktime(start:string,end:string){
        let starttemp=start.split(':')
        let endtemp=end.split(':')
        if(+starttemp[0]<+endtemp[0]){
            return true;
        }
        else if(+starttemp[0]==+endtemp[0]&&+starttemp[1]<+endtemp[1]){
            return true;
        }
        else{
            return false;
        }
    }
    private checkschedule(object:newDocschedule):boolean{
        this.timeOfWork[object.dayOfWork].times =  this.timeOfWork[object.dayOfWork].times.sort((first, second) => 0 - (first.st > second.st ? -1 : 1));
        let len=this.timeOfWork[object.dayOfWork].times.length
        if(len>0){
            if((this.checktime(object.startTime,this.timeOfWork[object.dayOfWork].times[0].st)&&this.checktime(object.endTime,this.timeOfWork[object.dayOfWork].times[0].st))
                ||
                (!this.checktime(object.startTime,this.timeOfWork[object.dayOfWork].times[len-1].et)&&!this.checktime(object.endTime,this.timeOfWork[object.dayOfWork].times[len-1].et))){
                this.timeOfWork[object.dayOfWork].times.push({'st':object.startTime,'et':object.endTime})
                return true
            }else{
            for(let i=0;i<len-2;i++){
              if(!this.checktime(object.startTime,this.timeOfWork[object.dayOfWork].times[i].et)&&this.checktime(object.endTime,this.timeOfWork[object.dayOfWork].times[i+1].st)){
                this.timeOfWork[object.dayOfWork].times.push({'st':object.startTime,'et':object.endTime})    
                    return true;
                }
              }
              return false;
          }
        }
      else{
        this.timeOfWork[object.dayOfWork].times.push({'st':object.startTime,'et':object.endTime})  
        return true;
      }
    }
    submitallschedule(){
        if(this.newSchedules.length>0)
            return this.services.post("Schedule",this.newSchedules)
        else
            return null
    }
    update(schedule:newDocschedule){
      let indextemp=this.timeOfWork[this.schedulemodified.dayOfWork].times.findIndex(e=>e.st==this.schedulemodified.startTime)
      this.timeOfWork[this.schedulemodified.dayOfWork].times.splice(indextemp,1);
      if(this.checktime(schedule.startTime,schedule.endTime)){
        if(this.checkschedule(this.schedulemodified)){
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
             
             },
             err=>{
             }
           )
        }
      }
    }
    deleteschedule(obj:newDocschedule){
      let timeIndex=this.timeOfWork[obj.dayOfWork].times.findIndex(e=>e.st==obj.startTime);
      this.timeOfWork[obj.dayOfWork].times.splice(timeIndex,1)
      let index=this.newSchedules.findIndex(e=>e.startTime==obj.startTime)
      this.newSchedules.splice(index,1);
    }
}