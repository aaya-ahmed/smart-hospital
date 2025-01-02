import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { list_department } from '../models/department';
import { alldoctors } from '../models/doctors';
import { labsList } from '../models/lab';
import { inpatient } from '../models/patient';
import { requestvital, showvitalnurse } from '../models/vital-sign';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private url:string="https://localhost:7163/api/";
  constructor(private http:HttpClient) {}
  post(controller:string,object:any){
    return this.http.post(this.url+controller,object)
  }
  get(controller:string):Observable<any>{
    return this.http.get(this.url+controller)
  }
  getalldoctorswithdepartmet():Observable<alldoctors[]>{
    return this.http.get<alldoctors[]>(this.url+"Departments/getAllEmps").pipe(
      map((res:alldoctors[])=>{
        return res.map(responce=>({
          departmentId:responce.departmentId ,
          departmentName:responce.departmentName,
          doctorDtos:responce.doctorDtos}
          ))
        }
      )
    )
  } 
  getdepartments():Observable<list_department[]>{
    return this.http.get<list_department[]>(this.url+"Departments/getAll").pipe(
        map((res:list_department[])=>{
          return res.map(responce=>({
            departmentId:responce.departmentId,
            departmentName:responce.departmentName,
            isClinical:responce.isClinical
          }))
        }
        )
        )
  
  }
  getTestNames():Observable<labsList[]>{
        return this.http.get<labsList[]>(this.url+"MedicalTest/getAll").pipe(
        map((tests:labsList[])=>{
          return tests.map(test=>({
           id:test.id,
           name:test.name,
           testCharge:test.testCharge
          }))
        })
      );
        
  }
  getvital(param:requestvital){
        return this.http.get<showvitalnurse[]>(this.url+"GetVitalSignesByRangeOfDate/"+param.patientID+
                                                               "/"+param.StartDate+
                                                               "/"+param.EndDate)
  }
  update(controller:string,object:any){
    return this.http.put(this.url+controller,object)
  }
  updatewithoutbody(controller:string){
    return this.http.put(this.url+controller,null)
  }
  delete(controller:string){
    return this.http.delete(this.url+controller)
  }
  getindoorpatient(id:number):Observable<inpatient[]>{
    return this.http.get<inpatient[]>(this.url+"Patient/GetInDoorPatients/"+id)
      .pipe(
          map((res:any[])=>{
            return res.map(responce=>({
              patientName:responce.firstName +""+responce.lastName,
              patientId: responce.id,
              indoorPatientRecordId: responce.indoorPatientId,
              age:responce.age,
              gender: responce.gender,
              causeOfAdmission: responce.causeOfAdmission,
              oralMedicalHistory: responce.oralMedicalHistory,
              enterDate: responce.enterDate,
              room_Number: responce.room_Number,
              bedNumber: responce.bedNumber,
              floor_Number: responce.floor_Number
            })
          )
        }
      )
    )
  }
}
