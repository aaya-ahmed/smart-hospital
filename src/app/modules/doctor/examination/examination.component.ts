import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {
  patient:any;
  options:boolean=true;
  section:string='options'
  outpatientflag:number=0
  constructor(private router:ActivatedRoute) { }
  ngOnInit(): void {
    this.router.queryParams.subscribe(
      (param:any)=>{
        this.patient=param
      }
    )
  }
  changesection(sectioname:string){
    this.section=sectioname
    this.options=false
  }
  setoptions(){
    this.options=!this.options
    if(this.options==true)this.section='options'
  }

}
