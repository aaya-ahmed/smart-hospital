import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  departments:any[]=[]
  counter:number=0;
  p:number=1;
  length:number=0
  loading:boolean=true
  constructor(private service:ServicesService) { }

  ngOnInit(): void {
    this.service.get("Departments/getAll").subscribe(
      (res:any)=>{
        this.departments=res
        this.length=res.length
        this.loading=false
      }
    )
  }
}
