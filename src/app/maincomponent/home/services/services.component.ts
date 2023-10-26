import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit,AfterViewInit{
  departments:any[]=[]
  @ViewChild('servicediv',{static:true})serviceitem!:ElementRef;
  list:any[]=[];
  constructor(private service:ServicesService,private router:Router) { }
  ngAfterViewInit(): void {
    this.list=this.serviceitem?.nativeElement.childNodes
    this.list.forEach((item,i) => {
      this.list[i].style.order=i+1
    });
  }

  ngOnInit(): void {
    this.service.get("Departments/getAll").subscribe(
      (res:any)=>{
        this.departments=res.slice(0,7);
      }
    )

  }
  goleft(){
    let prev=this.list[0].style.order
    this.list[0].style.order=this.list[this.list.length-1].style.order
    this.list.forEach((_,i) => {
      let prev2=this.list[i+1].style.order
      this.list[i+1].style.order=prev
      prev=prev2
    });
  }
  goright(){
    let prev=this.list[this.list.length-1].style.order
    this.list[this.list.length-1].style.order=this.list[0].style.order
    this.list.forEach((_,i) => {
      let prev2=this.list[this.list.length-i-2].style.order
      this.list[this.list.length-i-2].style.order=prev
      prev=prev2
    });
  }
  gotodeppage(){
    this.router.navigate(['departments'])
  }
}
