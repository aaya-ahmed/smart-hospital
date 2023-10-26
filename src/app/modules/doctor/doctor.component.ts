import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInAndOutService } from 'src/app/services/log-in-and-out.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['../styles/mainstyle.css']
})
export class DoctorComponent implements OnInit {
  sideState:boolean=true;
  linksList:{link:string,icon:string,title:string}[]=[
    {link:'profile',icon:'fa-house',title:'Profile'},
    {link:'appointments',icon:'fa-calendar',title:'Appointments'},
    {link:'in-patientlist',icon:'fa-people-arrows',title:'In Patients'}
    ]
  constructor() { }
  ngOnInit(): void {
  }
  changeToggleSideBar(event:any){
    this.sideState=event;
  }
}
