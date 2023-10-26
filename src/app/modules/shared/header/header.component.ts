import { Component, OnInit,Output ,EventEmitter, HostListener, Input} from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()sideBarStatus:boolean=true;
  @Output()ToggleSideBarEvent:EventEmitter<Boolean>=new EventEmitter();
  constructor() { }
  ngOnInit(): void {
  }
  toggleSideBar(){
    this.sideBarStatus=!this.sideBarStatus;
    this.ToggleSideBarEvent.emit(this.sideBarStatus)
  }
}

