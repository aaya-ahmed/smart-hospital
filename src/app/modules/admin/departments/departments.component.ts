import { Component, OnInit } from '@angular/core';
import { all_department_info } from 'src/app/models/department';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['../../styles/datatable.css','../../styles/searching.css']
})
export class DepartmentsComponent implements OnInit {
  department:all_department_info[]=[]
  flag=false;
  p: number = 1;
  totallength:any;
  constructor(private service:ServicesService,private sidehostmanager:SidemanagerService) { }
  ngOnInit(): void {
    this.service.get("Departments/getAll").subscribe(
      (res:any)=>{
        this.department=res;
        this.totallength=this.department.length
        this.flag=true
      }
    )
  }
  openAddDepartmentSide(){
    this.sidehostmanager.setControl({open:true,component:"addDepartment",data:{}})
  }
  openUpdateDepartmentSide(dept:any){
    if(dept.image)dept.Image=`https://smarthospital.somee.com/${dept.image}`;
    this.sidehostmanager.setControl({open:true,component:"updateDepartment",data:dept})
  }
}
