import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan-doctor',
  templateUrl: './scan-doctor.component.html',
  styleUrls: ['../styles/mainstyle.css']
})
export class ScanDoctorComponent implements OnInit {
  sideState:boolean=true;
  linksList:{link:string,icon:string,title:string}[]=[
    {link:'profile',icon:'fa-house',title:'Profile'},
    {link:'scans',icon:'fa-x-ray',title:'Scans'},
    {link:'addscan',icon:'fa-file-circle-plus',title:'Add Scan'},
    {link:'showscan',icon:'fa-x-ray',title:'Show Scan'}
    ]
  constructor() { }
  ngOnInit(): void {
  }
  changeToggleSideBar(event:any){
    this.sideState=event;
  }
}
