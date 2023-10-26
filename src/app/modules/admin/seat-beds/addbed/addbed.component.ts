import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { all_department_info, department } from 'src/app/models/department';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-addbed',
  templateUrl: './addbed.component.html',
  styleUrls: ['../../../styles/addingform.css']
})
export class AddbedComponent implements OnInit {
  errormessage:string='';
  departementsList:all_department_info[]=[];
  submitted:boolean=false;
  constructor(private services:ServicesService,private sidemanager:SidemanagerService) { }
  ngOnInit(): void {
    this.services.getdepartments().subscribe((res:any)=>{
      this.departementsList=res; 
    });
  }
  addNewRoom(form:NgForm){
    if(form.valid){
       this.services.post("Admin/AddRoom",form.value).subscribe(
         (res:any)=>{
          this.close();
         },
         err=>{
           this.errormessage=err.error.text;
         });
   }
  }
  close(){
    this.sidemanager.setControl({open:false,component:'',data:{}})
  }

}
