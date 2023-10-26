import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements AfterViewInit,OnDestroy {
  images:{image:string,comment:string[]}[]=[
    {image:'assets/slide-one.png',comment:["Entrust your health our doctors","Exceptional people. Exceptional care."]},
    {image:'assets/slide-two.jpg',comment:["Entrust your health our doctors","Medical services that you can trust"]},
    {image:'assets/slide-three.jpg',comment:["Entrust your health our doctors","The Hospital of the Future,Today"]}
    ]
    currentindex:number=0;
    private slider:any;
  constructor() {
   }
  ngAfterViewInit(): void {
    this.slider=setInterval(()=>{
      this.currentindex++;
      if(this.currentindex==3)this.currentindex=0
    },5000)
  }
  slidforward(){
    this.currentindex++;
    if(this.currentindex==3)this.currentindex=0
  }
  slidback(){
    this.currentindex--;
    if(this.currentindex==-1)this.currentindex=2;
  }
  ngOnDestroy(): void {
    clearInterval(this.slider)
  }
}
