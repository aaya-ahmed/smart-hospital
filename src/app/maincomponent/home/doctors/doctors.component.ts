import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit,AfterViewChecked,DoCheck{
  doctors:any[]=[]
  @ViewChild('doctoritems',{static:true})doctoritems!:ElementRef;
  list:{index:number,order:number}[]=[];
  finish:boolean=false;
  slider:any;
  constructor(private service:ServicesService) { }
  ngDoCheck(): void {

  }
  ngOnInit(): void {
    let docSubscriber=this.service.get("Doctor/GetAllDoctors").subscribe(
      (res:any)=>{
        this.doctors=res.slice(0,10);
        this.doctors= this.doctors.map(p=>{if(p.imageName)return {...p,imageName:`https://localhost:7163/${p.imageName}`}; else return {...p,imageName:'../../../assets/profile.png'}})
        this.finish=true
        docSubscriber.unsubscribe()

      },
      (err)=>{
        docSubscriber.unsubscribe()
      }
      );
  }
  ngAfterViewChecked(): void {
    if(this.doctors.length>0&&this.finish){
      let counter=0;
      for(let value of this.doctoritems?.nativeElement.childNodes.values()){
        if(value.nodeType==1){
          value.style.order=counter+1
          this.list.push({index:counter,order:counter+1})
        }
        counter++
      }
      this.finish=false;
    }
  }
  goleft(){
    this.slider=setInterval(()=>{
      let prev:any={index:this.list[0].index,order:this.list[0].order}
      this.doctoritems.nativeElement.childNodes[prev.index].style.order=this.list[this.list.length-1].order
      this.list[0].order=this.list[this.list.length-1].order
      this.list.forEach((_,i) => {
      if(i+1!=this.list.length){
        let prev2={index:this.list[i+1].index,order:this.list[i+1].order}
        this.doctoritems.nativeElement.childNodes[prev2.index].style.order=prev.order
        this.list[i+1].order=prev.order
        prev=prev2
      }
    });
    },1000)
  }
  reset(){
    if(this.slider)
    clearInterval(this.slider)
  }
}
