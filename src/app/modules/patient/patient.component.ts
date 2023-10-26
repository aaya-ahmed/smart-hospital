import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInAndOutService } from 'src/app/services/log-in-and-out.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['../styles/mainstyle.css']
})
export class PatientComponent implements OnInit {
  sideState:boolean=true;
  linksList:{link:string,icon:string,title:string}[]=[
    {link:'profile',icon:'fa-house',title:'Profile'},
    {link:'prescriptions',icon:'fa-prescription',title:'Prescriptions'},
    {link:'tests',icon:'fa-flask',title:'Tests'},
    {link:'scans',icon:'fa-x-ray',title:'Scans'},
    {link:'indoor-records',icon:'fa-file',title:'History'},
    {link:'make-appointment',icon:'fa-calendar-check',title:'Appoint'},
    ]
  constructor() { }
  ngOnInit(): void {
  }
  changeToggleSideBar(event:any){
    this.sideState=event;
  }
}
