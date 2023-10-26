import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { tileLayer,marker, icon, Map} from 'leaflet';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit,AfterViewInit {
  options:any
  leafletmap:any;
  @ViewChild('map')map!:ElementRef
  constructor(private router:Router) { }
  ngAfterViewInit(): void {
  //   this.options={
  //     layers: [
  //       tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //         attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  //        }),
  //       marker([29.3213102,30.8340012],{icon:icon({
  //         iconSize: [ 30, 30 ],
  //         iconAnchor: [ 15, 30 ],
  //         iconUrl: '../../../../assets/marker_end.svg',
  //       })}).on('click',()=>{
  //         console.log("d")
  //         this.router.navigateByUrl('')
  //       })
  //     ],
  //     zoom: 17,
  //     center: [29.3213102,30.8340012],
  //     zoomControl: false ,
  //     dragging:false
  //   }
  //   this.leafletmap=new Map(this.map.nativeElement,this.options)
  //   this.leafletmap.getMap().then((mapres:any)=>{
  //     mapres.invalidateSize();
  // });
  }

  ngOnInit(): void {

  }

}
