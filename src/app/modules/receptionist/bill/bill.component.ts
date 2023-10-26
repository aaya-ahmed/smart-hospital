import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { bill } from 'src/app/models/patient';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  today=new Date().toISOString().substring(0,10);
  totalPrice:number=0;
  patient:any={address: '',age: 0,bloodType: "",createdDtm: "",departmentId: 0,departmentName: "",firstName: ""
  ,gender: "",id: 0,image: null,imageName: null,isActive: true,lastName: "",mail: ""
  ,nationalId: "",password: null,phoneNumber: "",role: null,userName: ""}
 billpatient:bill={
    id: 0,
    roomCharges: 300,
    prescriptionCharges: 0,
    indoorPatientRecordID: 0,
    appointmentsCharges: 0,
    testCharges: 0,
    scansCharges: 0
  }
  billflag:boolean=false
  constructor(private service:ServicesService) { }
  ngOnInit(): void {
   
  }
  getpatient(form:NgForm){
    let id=form.value.nationalId
    this.service.get('Patient/GetPatientByNationalId/'+id).subscribe(
      res=>{
        this.patient=res;
        this.service.get("Patient/getPatientBill/"+this.patient.id).subscribe(
          (res:any)=>{
            this.billpatient=res;
            this.billpatient.roomCharges=300;
            this.totalPrice=this.billpatient.roomCharges+this.billpatient.scansCharges+this.billpatient.testCharges
            this.billflag=true

          },
          (err:any)=>{
            this.billflag=false
          }
        )
      }
    )
   
   
    
  }
print(){
  window.print()
}
}
