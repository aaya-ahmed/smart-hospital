import { Injectable } from '@angular/core';
import { getAllLabRequsts } from '../models/lab';
import { requestscan } from '../models/scan';

@Injectable({
  providedIn: 'root'
})
export class ShardserviceService {
  private requests:requestscan={
    id: -1,
    scanName: '',
    patientName: '',
    doctorName: '',
    indoorPatientRecordId: null,
    scanId: 0,
    createdDtm: '',
    patientId: 0,
    doctorId: 0
  }
  private user:any={
      patientid:0,
      patientname:'',
      nurseid:0,
      nursename:'',
      patientage:0,
      indoorPatientId:0
    }
  private requsts:getAllLabRequsts={
    id:-1,
    labName:'',
    testId: 0,
    createdDtm: '',
    patientId: 0,
    doctorId: 0,
    patientName: '',
    doctorName: '',
    indoorPatientRecordId:null
  }
  set request(request:requestscan){
    this.requests=request
  }
  get request(){
    return this.requests
  }
  set userinfo(userinfo:any){
    this.user=userinfo
  }
  get userinfo(){
    return this.user
  }
  set testrequest(request:getAllLabRequsts){
    this.requsts=request
  }
  get testrequest(){
    return this.requsts
  }
}
