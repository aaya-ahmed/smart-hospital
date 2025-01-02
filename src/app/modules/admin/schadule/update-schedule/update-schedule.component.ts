import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {schedule} from 'src/app/models/schadule';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';
let timeOfWork: { day: number; times: { st: string; et: string }[] }[] = [
  { day: 0, times: [] },
  { day: 1, times: [] },
  { day: 2, times: [] },
  { day: 3, times: [] },
  { day: 4, times: [] },
  { day: 5, times: [] },
  { day: 6, times: [] },
];
@Component({
  selector: 'app-update-schedule',
  templateUrl: './update-schedule.component.html',
  styleUrls: ['./update-schedule.component.css'],
})
export class UpdateScheduleComponent implements OnInit {
  @Input() data: { id: number; name: string; schedule: number } = {
    id: 0,
    name: '',
    schedule: 0,
  };
  updateform: FormGroup = new FormGroup({
    id:new FormControl(0,[Validators.required]),
    dayOfWork: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    timePerPatient: new FormControl('', [
      Validators.required,
      Validators.pattern('^(00):([1-5]?[0-9]?)$'),
    ]),
  });

  submitted: boolean = false;
  timeflag: boolean = false;
  tempschedule :{
    doctorId: number,
    doctorName: string,
    scheduleObjects: schedule[],
  }= {
    doctorId: 0,
    doctorName: '',
    scheduleObjects: [],
  };
  errorflag: boolean =false;
  check: boolean = true;

  constructor(private services: ServicesService,private sideManager:SidemanagerService) {}

  ngOnInit(): void {
    this.getschedules();
  }
  getschedules() {
    timeOfWork = [
      { day: 0, times: [] },
      { day: 1, times: [] },
      { day: 2, times: [] },
      { day: 3, times: [] },
      { day: 4, times: [] },
      { day: 5, times: [] },
      { day: 6, times: [] },
    ];
    this.services
      .get('Schedule/GetSchedulesByDoctor_Id' + '/' + this.data.id)
      .subscribe(
        (res: schedule[]) => {
          this.tempschedule = {
            doctorId: this.data.id,
            doctorName: this.data.name,
            scheduleObjects: res,
          };
          let index = res.findIndex(
            (p) => p.id == this.data.schedule
          );
          this.setschedulemodified(index);
        },
        (err: any) => {
        }
      );
  }
  setschedulemodified(index: number) {
    this.updateform.setValue({
      id:(this.tempschedule.scheduleObjects[index]).id,
      dayOfWork: this.tempschedule.scheduleObjects[index].dayOfWork,
      startTime: this.tempschedule.scheduleObjects[index].startTime.substring(
        0,
        5
      ),
      endTime: this.tempschedule.scheduleObjects[index].endTime.substring(0, 5),
      timePerPatient: this.tempschedule.scheduleObjects[
        index
      ].timePerPatient.substring(0, 5),
    });
    this.set_timeofwork()
  }
  set_timeofwork(){
    for(let j of this.tempschedule.scheduleObjects){
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
  update() {
    this.submitted = true;
    this.checktime(
      this.updateform.controls['startTime'].value,
      this.updateform.controls['endTime'].value
    );
    if (this.updateform.valid && this.timeflag) {
      this.checkschedule(this.updateform.value);
      if (this.check) {
        this.submitted=true;
        this.services
          .update('Schedule/UpdateSchedule', {...this.updateform.value,doctorId:this.data.id,dayOfWork:+this.updateform.value.dayOfWork})
          .subscribe(
            (res: any) => {
              this.submitted=false;
            
            },
            (err) => {
              this.submitted=false
              this.errorflag = true;
            }
          );
      }
    }
  }
  checkschedule(object: any) {
    timeOfWork[object.dayOfWork].times = timeOfWork[
      object.dayOfWork
    ].times.sort((first, second) => 0 - (first.st > second.st ? -1 : 1));
    let len = timeOfWork[object.dayOfWork].times.length;
    if (len > 0) {
      if (
        (object.startTime <= timeOfWork[object.dayOfWork].times[0].st &&
          object.endTime <= timeOfWork[object.dayOfWork].times[0].st) ||
        (object.startTime >= timeOfWork[object.dayOfWork].times[len - 1].et &&
          object.endTime >= timeOfWork[object.dayOfWork].times[len - 1].et)
      ) {
        timeOfWork[object.dayOfWork].times.push({
          st: object.startTime,
          et: object.endTime,
        });
        this.check = true;
      } else {
        this.check = false;
        for (let i = 0; i < len - 2; i++) {
          if (
            object.startTime >= timeOfWork[object.dayOfWork].times[i].et &&
            object.endTime <= timeOfWork[object.dayOfWork].times[i + 1].st
          ) {
            timeOfWork[object.dayOfWork].times.push({
              st: object.startTime,
              et: object.endTime,
            });
            this.check = true;
            break;
          }
        }
      }
    } else {
      timeOfWork[object.dayOfWork].times.push({
        st: object.startTime,
        et: object.endTime,
      });
      this.check = true;
    }
  }

  checktime(start: any, end: any) {
    if (start > end) {
      this.timeflag = false;
    } else {
      this.timeflag = true;
    }
  }
}
