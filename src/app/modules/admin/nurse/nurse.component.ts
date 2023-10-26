import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['../../styles/datatable.css','../../styles/searching.css']
})

export class NurseComponent implements OnInit {
  nursesList:any[]=[]
  nursesTempList:any[]=[]
  departementsList:any[]=[]
  loadflag=true;
  pageflag=false;
  tableflag:boolean=true;
  searchflag:boolean=true;
  temp:any;
  allflag:boolean=true;
  p=1;
  totallength=0
  constructor(private service:ServicesService,private sidehostservice:SidemanagerService) { }
  ngOnInit() {
    let subscriber=this.service.getdepartments().subscribe(
      res=>{
        this.departementsList=res
        subscriber.unsubscribe()
      });
    this.getallnursies()
  }
  getallnursies(){
    let subscriber=this.service.get("Nurse/getAllNurses").subscribe({
      next:(res:any)=>{
        this.nursesList=res;
        this.totallength=this.nursesList.length
        this.loadflag=false;
        this.pageflag=true
        subscriber.unsubscribe()
      },
      error:(err:any)=>{
        this.loadflag=false;
        this.pageflag=false
      }});
  }
  allnurses(){
    this.searchflag=true;
    this.nursesList=this.nursesTempList
    this.allflag=true
  }
  search(searchinfo:any){
    if(this.searchflag){
      this.nursesTempList=this.nursesList
      this.searchflag=false
      this.allflag=false
      this.nursesList=[]
    }
    if(searchinfo.nursedepartment!=""&&searchinfo.nursestate!=""){
      this.nursesList=[]
      for(let i of this.nursesTempList ){
          if(i.departmentName==searchinfo.nursedepartment&&String(i.isActive)==searchinfo.nursestate){
            this.nursesList.push(i)
          }
      }
    }
    else if(searchinfo.nursedepartment!=""){
      this.nursesList=[]
      for(let i of this.nursesTempList ){
        if(i.departmentName==searchinfo.nursedepartment){
          this.nursesList.push(i)
        }
      }
    }
    else if(searchinfo.nursestate!=""){
      this.nursesList=[]
      for(let i of this.nursesTempList ){
        if(String(i.isActive)==searchinfo.nursestate){
          this.nursesList.push(i)
        }
      }
    }
  }
  openAddNurseSide(){
    this.sidehostservice.setControl({open:true,component:'addNurse',data:{}})
    this.getdataupdated()
  }
  openUpdateNurseSide(nurse:any){
    this.sidehostservice.setControl({open:true,component:'updateNurse',data:nurse})
    this.getdataupdated()
  }
  openShowNurseSide(nurse:any){
    this.sidehostservice.setControl({open:true,component:'showNurse',data:nurse})
  }
  getdataupdated(){
    let subscriber=this.sidehostservice.control.subscribe({
      next:res=>{
        if(res.open==false){
          this.getallnursies()
          subscriber.unsubscribe()
        }
        
      }
    })
  }
}