import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { options } from '../models/sidecontrol';
@Injectable({
  providedIn: 'root'
})
export class SidemanagerService {
  control:BehaviorSubject<options>=new BehaviorSubject<options>({component:'',data:{},open:false});
  constructor() { }
  setControl(option:options){    
    this.control.next(option);
  }
}
