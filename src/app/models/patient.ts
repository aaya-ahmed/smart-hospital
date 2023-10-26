import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export interface patient{
    image:string;
    name:string;
    id:number;
    email:string;
    gender:string;
    age:number;
    address:string;
    phone:number;
    Patienttype:string;
    bloodgroup:string;
    Occupation:string;
}
           
export interface partinfopatient{
    id: number,
    firstName: string,
    lastName: string,
    age:number,
    gender:string
  }
  
export interface patientscanlist{
    image: any,
    writtenReport:string,
    scan: string,
    doctor: string,
    scanDate: string
}
export interface inpatient{
  patientName: string,
  patientId: number,
  indoorPatientRecordId: number,
  age:number,
  gender: string,
  causeOfAdmission: string,
  oralMedicalHistory: string,
  enterDate: string,
  room_Number: number,
  bedNumber: number,
  floor_Number: number
}
export interface patientreport{
        patientId: number,
        dateOfDischarge: string,
        recommendation: string,
        indoorPatientRecordId: number,
        enterDate: string
      
}
export interface indoorPatientRecords {
    patientRecordId: number
    discahrgeDate: string
    enterDate: string
    patientscans: any[]
    patientTests: any[]
    prescriptions: number[]
    roomNumber: number
    roomType: string
    floorNumber: number
    bedNumber: number
  }
 
export interface patientrequest{
    patientName:string,
    slotTime:string,
    patientId: number,
    age: number,
    gender:string,
    complain:string,
    examined: boolean,
    indoorPatientRecordId:any
}
export interface bill{
  id:number,
  roomCharges: number,
  prescriptionCharges: number,
  indoorPatientRecordID: number,
  appointmentsCharges: number,
  testCharges: number,
  scansCharges: number
}