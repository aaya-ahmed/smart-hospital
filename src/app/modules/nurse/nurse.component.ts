import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInAndOutService } from 'src/app/services/log-in-and-out.service';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['../styles/mainstyle.css']
})
export class NurseComponent implements OnInit {
  linksList:{link:string,icon:string,title:string}[]=[
    {link:'profile',icon:'fa-house',title:'Profile'},
    {link:'in-patient',icon:'fa-user',title:'In Patient'},
    {link:'patient-rereverstion',icon:'fa-person-circle-plus',title:'Reservation'}
    ]
  sideState:boolean=true;
  constructor() { }
  ngOnInit(): void {
  }
  changeToggleSideBar(event:any){
    this.sideState=event;
  }
}
