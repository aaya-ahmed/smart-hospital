import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInAndOutService } from 'src/app/services/log-in-and-out.service';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['../styles/mainstyle.css']
})
export class ReceptionistComponent implements OnInit {
  sideState:boolean=true;
  linksList:{link:string,icon:string,title:string}[]=[
    {link:'profile',icon:'fa-house',title:'Profile'},
    {link:'patient',icon:'fa-bed-puls',title:'Patients'},
    {link:'patient-appointment',icon:'fa-calendar',title:'Rereverstion'},
    {link:'make-appointment',icon:'fa-calendar-check',title:'Appoint'},
    {link:'bill',icon:'fa-money-bills',title:'Bill'}
    ]
    
  constructor() { }
  ngOnInit(): void {
  }
  changeToggleSideBar(event:any){
    this.sideState=event;
  }
}
