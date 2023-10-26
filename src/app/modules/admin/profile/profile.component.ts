import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css','../../styles/profilestyle2.css']
})
export class ProfileComponent implements OnInit {
  statistical={
    numberOfDoctors:0, 
    numberOfNurses:0,
    numberOfReceptionist:0,
    numberOfInPatients:0,
    numberOfOutPatients:0,
    numberOfTodayAppointments:0,
    numberOfAllAppointments:0 
  }
  departments:any[]=[]
  doctors:any[]=[]
  nurses:any[]=[]
  nursieschart:any;
  admin:any;
  @ViewChild('doctorchart',{static: true}) doctorchartElementRef: ElementRef|undefined;
  @ViewChild('nursechart',{static: true}) nursechartElementRef: ElementRef|undefined;
  constructor(private service:ServicesService) { }
  ngOnInit(): void {
      let today=new Date().toISOString().substring(0,10)
      this.service.get("Admin/GetNumbers/"+today).subscribe(
        (res:any)=>{
          this.statistical=res;
        }
      );
      this.service.get("Departments/getAll").subscribe(
        (res:any)=>{
          this.departments=res;
          let dept=this.departments.map(p=>p.departmentName);
          this.getdoctors(dept);
          this.getnursies(dept);
        }
      )
  }
  getdoctors(department:string[]){
    let docSubscriber=this.service.get("Doctor/GetAllDoctors").subscribe(
      (res:any)=>{
        for(let i=0;i<department.length;i++){
          this.doctors.push(
            {
              label:department[i],
              number:res.filter((p:any)=>p.departmentName==department[i]).length,
              color:`#${Math.random().toString().slice(2,8)}`
            })
        }
          this.setbarchart('doctor',this.doctors)
          docSubscriber.unsubscribe()
        }
    )
  }
  getnursies(department:string[]){
    let nurseSubscriber=this.service.get("Nurse/getAllNurses").subscribe(
      (res:any)=>{
        for(let i=0;i<department.length;i++){
          this.nurses.push({
            label:department[i],
            number:res.filter((p:any)=>p.departmentName==department[i]).length,
            color:`#${Math.random().toString().slice(2,8)}`
          })
          }
          this.setbarchart('nurse',this.nurses)
          nurseSubscriber.unsubscribe()
        }
    )
  }
  setbarchart(usertype:string,data:{label:string,number:number,color:string}[]){
    new Chart(usertype=='doctor'?this.doctorchartElementRef?.nativeElement:this.nursechartElementRef?.nativeElement,{
      type:'bar',
      data:{
        labels:data.map(p=>p.label),
        datasets:[{
          label:`${usertype} chart`,
          data:data.map(p=>p.number),
          backgroundColor:data.map(p=>p.color),
          borderColor:data.map(p=>p.color)
        }]

      },
      options:{
        scales:{
          y:{
            beginAtZero:true
          }
        }
      }

    })
  }
}

