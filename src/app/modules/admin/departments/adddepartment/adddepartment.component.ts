import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit,Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { imageclass } from 'src/app/image/imageclass';
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
    Image:null
  };
  private image:any=null
  submitted:boolean=false;
  errormessage:string=''
  private imageservice:imageclass=new imageclass()
  constructor(private service:ServicesService,private sidemanagerservice:SidemanagerService) { }

  ngOnInit(): void {
  }
  postdepartment(form:NgForm){
    if(form.valid){
      this.submitted=true;
      let dept={ 
        departmentName: form.value.departmentName,
        departmentLocation: form.value.location,
        isActive: form.value.isActive||false,
        isClinical: form.value.isClinical||false,
        Image:this.image
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
        id: this.data.departmentId,
        department_Name:form.value.departmentName,
        location: form.value.location,
        image: this.image,
        isActive:form.value.isActive,
        clinicalDepartment: form.value.isClinical
      }
      this.service.update("Departments/Update",dept).subscribe(
        res=>{
          this.close();
          },
          err=>{
            this.submitted=false;
            this.errormessage=err.error.text
          });
    }
  }
  submit(form:NgForm){
    console.log(this.data)
    if(this.data.departmentId!=0){
      this.update(form)
    }
    else{
      this.postdepartment(form)
    }
  }
  changephoto(image:string){
    this.image=image;
    // if(file.target.value[0])
    // this.imageservice.getbase64(file.target.files[0]).then(
    //   (res:any)=>{
    //     this.image=res.split(',').pop()
    //   }
    // )
  }
  close(){
    this.sidemanagerservice.setControl({open:false,component:'',data:{}})
  }

}
