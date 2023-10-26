import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { ShardserviceService } from 'src/app/services/shardservice.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-show-medicine',
  templateUrl: './show-medicine.component.html',
  styleUrls: ['../../../styles/showdata.css']
})
export class ShowMedicineComponent implements OnInit,OnDestroy {
  data:any
  medicineList:any
  sideHostSubscriber:any
  constructor(private sidemanagerservice:SidemanagerService,private service:ServicesService,private router:Router) { }  
  ngOnDestroy(): void {
    this.sideHostSubscriber.unsubscribe()
  }
  ngOnInit(): void {
    this.sideHostSubscriber=this.sidemanagerservice.control.subscribe({
      next:res=>{
        this.data=res.data
        if(this.data.indoorPatientId==0){
          this.router.navigate(['../nurse/in-patient'])
        }
        else{
          this.service.get("Patient/GetLastPrescriptionByInDoorId/"+this.data.indoorPatientId).subscribe(
            (res:any)=>{
              this.medicineList=res
              console.log(this.medicineList)
            })
          }
      }
    })

    }
    close(data?:any){
      this.sidemanagerservice.setControl({open:false,component:'',data:data});
    }
  }


