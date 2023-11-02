import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit,Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { all_department_info } from 'src/app/models/department';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-adddepartment',
  templateUrl: './adddepartment.component.html',
  styleUrls: ['../../../styles/addingform.css']
})
export class AdddepartmentComponent implements OnInit {
  @Input()data:all_department_info={
    departmentId: 0,
    departmentName: '',
    departmentLocation: '',
    isActive: true,
    isClinical: true,
    departmentImage:''
  };
  submitted:boolean=false;
  errormessage:string=''
  constructor(private http:HttpClient,private service:ServicesService,private sidemanagerservice:SidemanagerService) { }

  ngOnInit(): void {

  }
  postdepartment(form:NgForm){
    if(form.valid){
      this.submitted=true;
      let dept={ 
        departmentName: form.value.departmentName,
        departmentLocation: form.value.location,
        isActive: form.value.isActive||false,
        isClinical: form.value.isClinical||false
      }
      this.service.post("Departments/add",dept).subscribe(
        (res:any)=>{
        },
        (err)=>{
          if(err.status='succesfully.')
          this.close()
          else
          this.errormessage=err.error.text
        }
      );
    }
  }
//update department information 
  update(form:NgForm){
    if(form.valid){
      this.submitted=true;
      let dept={ 
        departmentName: form.value.department_Name,
        departmentLocation: form.value.location,
        isActive: form.value.isActive,
        isClinical: form.value.isClinical
      }
      this.service.update("Departments/Update",dept).subscribe(
        res=>{
          this.close();
          },
          err=>{

          });
    }
  }
  submit(form:NgForm){
    if(this.data.departmentId!=0){
      this.postdepartment(form)
    }
    else{
      this.update(form)
    }
  }
  changephoto(file:any){
    
  }
  close(){
    this.sidemanagerservice.setControl({open:false,component:'',data:{}})
  }

}
