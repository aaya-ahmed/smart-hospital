import { Component, OnInit, ViewChild } from "@angular/core";
import { HostDirective } from "src/app/directivies/host.directive";
import { SidemanagerService } from "src/app/services/sidemanager.service";
@Component({
    template: ''
  })
export abstract class sidehosttemplate implements OnInit{
    currentComponent:any;
    viewrefrence:any;
    supscriber:any
    title:string=''
    @ViewChild(HostDirective,{static:true}) host!:HostDirective;
    show:boolean=false;
    constructor(private sidemanagerservice:SidemanagerService) { }
    ngOnDestroy(): void {
      this.supscriber.unsubscribe()
    }
    ngOnInit(): void {
      this.supscriber=this.sidemanagerservice.control.subscribe({
        next:responce=>{
          if(responce.open==true){
            this.loadcomponent(responce.component,responce.data);
            this.title=responce.component
            this.show=true
          }
          else if(responce.open==false&&this.viewrefrence){
            this.viewrefrence.clear();
            this.show=false
          }
        }
      })
    }
    abstract loadcomponent(component:string,data:any):void;
    close(){
      this.sidemanagerservice.setControl({open:false,component:'',data:{}})
    }
}