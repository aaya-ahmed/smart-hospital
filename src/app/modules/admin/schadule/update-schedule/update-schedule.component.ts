import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { schedules } from 'src/app/models/schadule';

@Component({
  selector: 'app-update-schedule',
  templateUrl: './update-schedule.component.html',
  styleUrls: ['./update-schedule.component.css']
})
export class UpdateScheduleComponent implements OnInit {
  updateform:FormGroup=new FormGroup({
    dayofwork:new FormControl('',[Validators.required]),
    starttime:new FormControl('',[Validators.required]),
    endtime:new FormControl('',[Validators.required]),
    perpatienttime:new FormControl('',[Validators.required,Validators.pattern("^(00):([1-5]?[0-9]?)$")])
  });
  private doctorId:number=0
  submitted:boolean=false
  timeflag:boolean=false
  tempschedule={
    doctorName:''
  }
  constructor() { }

  ngOnInit(): void {
  }
  update(){}
}
