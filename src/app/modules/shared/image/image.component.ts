import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { imageclass } from "src/app/image/imageclass";

@Component({
    selector:"app-image",
    styleUrls:['./image.component.css'],
    templateUrl:'./image.component.html'
})
export class ImageComponent implements OnInit{
    @Input()submitted:boolean=false
    @Input()isRequired:boolean=false;
    @Input()imageSrc:string|null=null ;
    @Output()image:EventEmitter<string>=new EventEmitter<string>();
    private imageservice:imageclass=new imageclass()
    constructor(){}
    ngOnInit(): void {}
    setImage(event:any){
        if(event.target.value[0])
            this.imageservice.getbase64(event.target.files[0]).then(
        (res:any)=>{
            this.image.emit(res.split(',').pop());
            this.imageSrc=res;
        }
    )
    }

}