import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {  list_department } from 'src/app/models/department';
import {  doctorsList } from 'src/app/models/doctors';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['../../styles/datatable.css','../../styles/searching.css']
})
export class DoctorComponent implements OnInit ,OnDestroy{
  doctorlist:any[]=[];
  templist:doctorsList[]=[];
  departments:list_department[]=[]
  //to show loading icon untill get data from backend make loadflag
  loadflag:boolean=true;
  /* to save original doctorlist when srarching ,we will make flag to save original doctorlist in temp list
  in first time search*/
  doctorflag:boolean=false;
  //to show table or loading icon when search we will make table flag
  tableflag:boolean=true;
  //to show updatemodal
  pageflag=false;
  p: number = 1;
  totallength:any;
  clinical:any=false
  clinicalflag=false
  index:string=""
  temp:any;
  subscriber:Subscription | undefined
  constructor(private services:ServicesService,private sidehostmanager:SidemanagerService ) { }
  ngOnInit(): void {
    //call doctor service to get all doctors 
    this.getdoctors();
    //call department service to get all departments
     this.services.getdepartments().subscribe(res=>{this.departments=res;});
  }
  getdoctors(){
    let docSubscriber=this.services.get("Doctor/GetAllDoctors").subscribe(
      (res:any)=>{
        this.doctorlist=res;
        this.totallength=this.doctorlist.length
        this.loadflag=false
        this.pageflag=true
        docSubscriber.unsubscribe()
      },
      (err)=>{
        this.loadflag=false
        this.pageflag=false
        docSubscriber.unsubscribe()
      }
      );
  }
  search(docInf:any,allbtn:any){
  this.tableflag=false;
  let department=docInf.value.docdepartment;
  let state=docInf.value.docstate;
  let specialization=docInf.value.docspecialization;
  if(!this.doctorflag){
    this.templist=this.doctorlist;
    this.doctorlist=[];
    this.doctorflag=true;
    allbtn.disabled=false
  }
  this.doctorlist=[];
  if(department&&state&&specialization){
    this.search_by_all(department,state,specialization)
  }
  else if(department){
    if(state){
      this.searchby_state_and_department(state,department)
    }
    else if(specialization){
      this.searchby_spec_and_department(department,specialization)
    }
    else{
      this.searchby_department(department)
    }
  }
  else if(state){
    if(specialization){
      this.searchby_state_spec(state,specialization)
    }
    else{
      this.searchby_state(state)
    }
  }
  else if(specialization){
    this.searchby_spec(specialization)
  }
  this.totallength=this.doctorlist.length
  }
  searchby_state_and_department(state:string,department:string){
    for(let i of this.templist){
      if(String(i.isActive)==state&&department==i.departmentName){
        this.doctorlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_spec_and_department(department:string,specialization:string){
    for(let i of this.templist){
      if(i.docSpecialization==specialization&&department==i.departmentName){
        this.doctorlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_department(department:string){
    for(let i of this.templist){
      if(department==i.departmentName){
        this.doctorlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_state_spec(state:string,specialization:string){
    for(let i of this.templist){
      if(String(i.isActive)==state&&specialization==i.docSpecialization){
        this.doctorlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_state(state:string){
    for(let i of this.templist){
      if(String(i.isActive)==state){
        this.doctorlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_spec(specialization:string){
    for(let i of this.templist){
      if(i.docSpecialization==specialization){
        this.doctorlist.push(i)
      }
    }
    this.tableflag=true;
  }
  search_by_all(department:string,state:string,specialization:string){
    for(let i of this.templist){
      if(String(i.isActive)==state&&department==i.departmentName&&specialization==i.docSpecialization){
        this.doctorlist.push(i)
      }
    }
    this.tableflag=true;
  }
  alldoctor(){
    this.doctorlist=this.templist;
    this.doctorflag=false
    this.totallength=this.doctorlist.length
  }
  openAddDoctorSide(){
    this.sidehostmanager.setControl({open:true,component:"addDoctor",data:{}})
    this.subscriber=this.sidehostmanager.control.subscribe({
      next:res=>{
        if(res.open==false){
          this.getdoctors()
          this.subscriber?.unsubscribe()
        }
      }
    })
  }
  openUpdateDoctorSide(doctor:any){
    this.sidehostmanager.setControl({open:true,component:"updateDoctor",data:doctor})
    this.subscriber=this.sidehostmanager.control.subscribe({
      next:res=>{
        if(res.open==false){
          this.getdoctors()
          this.subscriber?.unsubscribe()
        }
      }
    })
  }
  openShowDoctorSide(doctor:any){
    this.sidehostmanager.setControl({open:true,component:"showDoctor",data:doctor})
  }
  ngOnDestroy(): void {
    if(this.subscriber)this.subscriber.unsubscribe()
  }
}
