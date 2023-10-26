import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../styles/mainstyle.css']
})
export class AdminComponent implements OnInit {
  sideState:boolean=true;
  linksList:{link:string,title:string,icon:string}[]=[
    {link:'profile',title:'Profile',icon:'fa-house'},
    {link:'doctors',title:'Doctors',icon:'fa-user-doctor'},
    {link:'nursies',title:'Nursies',icon:'fa-user-nurse'},
    {link:'employees',title:'Employees',icon:'fa-user'},
    {link:'schedule',title:'Schedule',icon:'fa-calendar-days'},
    {link:'departments',title:'Departments',icon:'fa-building-user'},
    {link:'setbed',title:'Beds',icon:'fa-bed'}
  ]
  constructor() { }
  ngOnInit(): void {
  }
  changeToggleSideBar(event:any){
    this.sideState=event;
  }
}
