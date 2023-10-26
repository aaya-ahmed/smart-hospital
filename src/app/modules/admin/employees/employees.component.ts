import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['../../styles/datatable.css','../../styles/searching.css']
})
export class EmployeesComponent implements OnInit {
  receptionistlist:any[]=[];
  templist:any[]=[];
  //to show loading icon untill get data from backend make loadflag
  loadflag:boolean=true;
  /* to save original receptionistlist when srarching ,we will make flag to save original receptionistlist in temp list
  in first time search*/
  receptionistflag:boolean=false;
  //to show table or loading icon when search we will make table flag
  tableflag:boolean=true;
  //to show updatemodal
  pageflag=false;
  p: number = 1;
  totallength:any;
  temp:any;
  constructor(private services:ServicesService,private sidemanagerservice:SidemanagerService ) { }
  ngOnInit(): void {
    //call receptionist service to get all receptionists 
    this.getallresptionist()
  }
  getallresptionist(){
    let subscriber=this.services.get("Admin/getAllReceptionists").subscribe(
      (res:any)=>{
        this.receptionistlist=res;
        this.totallength=this.receptionistlist.length
        this.loadflag=false
        this.pageflag=true
        subscriber.unsubscribe()
      },
      (err)=>{
        this.loadflag=false
        this.pageflag=false
        subscriber.unsubscribe()
      }
      );
  }
  search(docInf:any,allbtn:any){
  this.tableflag=false;
  let department=docInf.value.docdepartment;
  let state=docInf.value.docstate;
  let specialization=docInf.value.docspecialization;
  if(!this.receptionistflag){
    this.templist=this.receptionistlist;
    this.receptionistlist=[];
    this.receptionistflag=true;
    allbtn.disabled=false
  }
  this.receptionistlist=[];
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
  this.totallength=this.receptionistlist.length
  }
  searchby_state_and_department(state:string,department:string){
    for(let i of this.templist){
      if(String(i.isActive)==state&&department==i.departmentName){
        this.receptionistlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_spec_and_department(department:string,specialization:string){
    for(let i of this.templist){
      if(i.docSpecialization==specialization&&department==i.departmentName){
        this.receptionistlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_department(department:string){
    for(let i of this.templist){
      if(department==i.departmentName){
        this.receptionistlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_state_spec(state:string,specialization:string){
    for(let i of this.templist){
      if(String(i.isActive)==state&&specialization==i.docSpecialization){
        this.receptionistlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_state(state:string){
    for(let i of this.templist){
      if(String(i.isActive)==state){
        this.receptionistlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_spec(specialization:string){
    for(let i of this.templist){
      if(i.docSpecialization==specialization){
        this.receptionistlist.push(i)
      }
    }
    this.tableflag=true;
  }
  search_by_all(department:string,state:string,specialization:string){
    for(let i of this.templist){
      if(String(i.isActive)==state&&department==i.departmentName&&specialization==i.docSpecialization){
        this.receptionistlist.push(i)
      }
    }
    this.tableflag=true;
  }
  allreceptionist(){
    this.receptionistlist=this.templist;
    this.receptionistflag=false
    this.totallength=this.receptionistlist.length
  }
  openAddEmployeeSide(){
    this.sidemanagerservice.setControl({open:true,component:"addEmployee",data:{}})
    this.getupdateddata()
  }
  openUpdateEmployeeSide(employee:any){
    this.sidemanagerservice.setControl({open:true,component:"updateEmployee",data:employee})
    this.getupdateddata()
  }
  getupdateddata(){
    let subscriber=this.sidemanagerservice.control.subscribe({
      next:res=>{
        if(res.open==false){
          this.getallresptionist()
          subscriber.unsubscribe()
        }
        
      }
    })
  }
}
  