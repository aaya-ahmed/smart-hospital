import { Component, OnInit } from '@angular/core';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-showdoctor',
  templateUrl: './showdoctor.component.html',
  styleUrls: ['../../../styles/showdata.css']
})
export class ShowdoctorComponent implements OnInit {
  doctorinfo!: any;
  constructor(private sidemanagerservice:SidemanagerService) { }
  ngOnInit(): void {
    this.sidemanagerservice.control.subscribe({
      next:Response=>{

        this.doctorinfo=Response.data;
        console.log(Response)
        console.log(this.doctorinfo)
      }
    })
  }
  close(){
    this.sidemanagerservice.setControl({open:false,component:'',data:{}});
  }
}
