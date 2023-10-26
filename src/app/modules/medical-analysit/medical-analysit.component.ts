import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medical-analysit',
  templateUrl: './medical-analysit.component.html',
  styleUrls: ['../styles/mainstyle.css']
})
export class MedicalAnalysitComponent implements OnInit {
  sideState:boolean=true;
  linksList:{link:string,icon:string,title:string}[]=[
    {link:'profile',icon:'fa-house',title:'Profile'},
    {link:'newtest',icon:'fa-flask-vial',title:'Tests'},
    {link:'testresult',icon:'fa-vials',title:'Patient Test'},
    {link:'showtest',icon:'fa-file',title:'Patient Reports'}
    ]
    
  constructor() { }
  ngOnInit(): void {
  }
  changeToggleSideBar(event:any){
    this.sideState=event;
  }
}
