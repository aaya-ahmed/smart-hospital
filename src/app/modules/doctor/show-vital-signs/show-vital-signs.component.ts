import {  Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { showvitalnurse } from 'src/app/models/vital-sign';
import { ServicesService } from 'src/app/services/services.service';


@Component({
  selector: 'app-show-vital-signs',
  templateUrl: './show-vital-signs.component.html',
  styleUrls: ['./show-vital-signs.component.css']
})
export class ShowVitalSignsComponent implements OnInit {
/*patient id with name */
@Input("patient")patient:any
vital:showvitalnurse[]=[]
toggle:boolean=false;
p: number = 1;
totallength:any;
startflag:boolean=false
endflag:boolean=false
st_end_flag:boolean=false
today:any=new Date()

  constructor(private services:ServicesService,private router:ActivatedRoute) { }
  ngOnInit(): void {
    this.today=this.today.toISOString().substring(0,8)+this.today.getDate()
  }
  getvitals(start:string,end:string){
    if(start==''){
      this.startflag=true
    }
    else{
      this.startflag=false
    }
    if(end==''){
      this.endflag=true
    }
    else{
      this.endflag=false
    }
    if(start<=end){
      if(end==this.today){
        const tomorrow = new Date(this.today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        end=tomorrow.toISOString().substring(0,8)+tomorrow.getDate()
      }
      this.services.get("VitalSigns/GetVitalSignesByRangeOfDateTime/"+this.patient.patientId+"/"+start+"/"+end).subscribe(
        (res:any)=>{
          this.vital=res
          this.toggle=true
          this.st_end_flag=false
          this.totallength=this.vital.length
        }
      )
    }
    else{
      this.st_end_flag=true
    }
  }
  onchange(){
    this.startflag=false
    this.endflag=false
  }
}
