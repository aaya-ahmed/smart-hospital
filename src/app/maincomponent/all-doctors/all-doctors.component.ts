import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-all-doctors',
  templateUrl: './all-doctors.component.html',
  styleUrls: ['./all-doctors.component.css']
})
export class AllDoctorsComponent implements OnInit {

  loading:boolean=true;
  loadingdoctors:boolean=true;
  p: number = 1;
  totallength:number=0;
  departments:any[]=[];
  doctors:any[]=[];
  activeitem:any;
  depname:string=''
  constructor(private services:ServicesService,private router:ActivatedRoute) { 
  }
  ngOnInit(): void {
    this.depname=this.router.snapshot.paramMap.get('departmentname')||''
    if(this.depname!=''){
      this.services.get("Doctor/GetDoctorsByDepartment?departmentName="+this.depname).subscribe(
        (res:any)=>{
          this.doctors=res
          console.log(this.doctors)
          this.doctors= this.doctors.map(p=>{if(p.imageName)return {...p,imageName:`https://localhost:7163/${p.imageName}`}; else return {...p,imageName:'../../../assets/profile.png'}})
          this.totallength=this.doctors.length
          this.loading=false;
          this.loadingdoctors=false;
       }
      );
    }
    else{
      this.services.get("Departments/getAll").subscribe(
        (res:any)=>{
          this.departments=res;
          this.loading=false;
          this.getDoctors(res[0])
          this.totallength=this.departments.length
        }
      )
    }
  }
  getDoctors(department:any){
    this.loadingdoctors=true
    this.doctors=[]
    if(Number.isInteger(department.target?.value)){
      this.activeitem=this.departments[department.target.value];
    }
    else{
      this.activeitem=department
    }
    this.services.get("Doctor/GetDoctorsByDepartment_Id"+"/"+this.activeitem.departmentId).subscribe(
      (res:any)=>{
        this.doctors=res
        console.log(this.doctors)
        this.doctors= this.doctors.map(p=>{if(p.imageName)return {...p,imageName:`https://localhost:7163/${p.imageName}`}; else return {...p,imageName:'../../../assets/profile.png'}})
        this.totallength=this.doctors.length
        this.loadingdoctors=false;
     }
    );
  }

}
