import { Component, OnInit } from '@angular/core';
import { addNewRoom, allRooms } from 'src/app/models/room';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';


@Component({
  selector: 'app-seat-beds',
  templateUrl: './seat-beds.component.html',
  styleUrls: ['../../styles/datatable.css','../../styles/searching.css']
})
export class SeatBedsComponent implements OnInit {
 
  allRooms:allRooms[]=[{ roomType: '',numberOf_freeBeds: 0,numberOf_allBeds: 0,floorNumber: 0,roomNumber: 0}];
  rooms:allRooms[]=[]
  roomtypes:string[]=[]
  searchingFlag=true;
  loadflag:boolean=true
  pageflag:boolean=true
  allflag:boolean=true
  tableflag:boolean=true
  p: number = 1;
  totallength:any;
  subscriber:any;
    constructor(private services:ServicesService,private sidemanager:SidemanagerService) { }
    ngOnInit(): void {
      this.services.get("Admin/GetAllRooms").subscribe(
        (res:any)=>
        {this.allRooms=res;
        this.rooms=this.allRooms;
        this.roomtypes=[...new Set(this.allRooms.map(p=>p.roomType))]
        this.loadflag=false;
      },
      err=>{
        this.loadflag=false;
        this.pageflag=false
      }
      )

    }
    // when admin press on add room button    
 
    //when submit data of adding room

  
    search(roomInf:any){
      if(this.searchingFlag){
        this.rooms=this.allRooms
        this.allRooms=[]
        this.searchingFlag=false;
        this.allflag=false
      }
      this.allRooms=[]
      for(let i of this.rooms){
        if(i.roomNumber==roomInf.roomnum||i.roomType==roomInf.roomType||i.floorNumber==roomInf.floornum){
          this.allRooms.push(i);
        }
       
      }
    }
    allrooms(){
      this.searchingFlag=true
      this.allflag=true
      this.services.get("Admin/GetAllRooms").subscribe(
       ( res:any)=>
        {this.allRooms=res}
      )
  }
  openAddBedSide(){
    this.sidemanager.setControl({open:true,component:'addBed',data:{}})
    this.subscriber=this.sidemanager.control.subscribe({
      next:res=>{
        if(res.open==false){
          this.allrooms()
          this.subscriber.unsubscribe()
        }
      }
    })
  }

}
