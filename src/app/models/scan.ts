export interface scan{    
        scanName:string,
        scanCharge: number
}
export interface scanList{
        id:number,
        scanName: string,
        scanCharge: number
        
}
export interface requestscan{
        id: number,
        scanName: string,
        scanId: number,
        createdDtm: string,
        patientId: number,
        doctorId:number,
        patientName: string,
        doctorName: string,
        indoorPatientRecordId: any
        }
export interface patientscan{
       scanRequestId: number,
       scanImages:image [],
       writtenReport:string,
       scanDate:string,
       indoorPatientRecordId: any
}
export interface requestscanByIds{
        scanName: string,
        createdDtm: string,
        patientId:number,
        doctorId:number,
        indoorPatientRecordId: any
        }
export interface image{
        content:any
}
export interface patientscanlist{
        patientScanId: number,
        patientId: number,
        scanName: string,
        patientName: string,
        doctorName: string,
        doctorId: number,
        scanImages: string[],
        writtenReport:string,
        scanDate: string,
        indoorPatientRecordId: any
      }