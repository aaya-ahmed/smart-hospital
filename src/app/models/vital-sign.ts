export interface vitalSign{
    patientId: number,
     nurseId: number,
     pressure: string,
     pulseRate: number,
     temperature: number,
     ecg: null,
     respirationRate: number,
     vitals_date: string,
     note:Note
    
   }
   export interface Note {
    subject: string,
    createdDate: string,
    body: string
  }
  export interface requestvital{
    patientID:number,
    StartDate:string,
    EndDate:string
  }
  export  interface showvitalnurse{
    nurseName: string,
    patientName: string,
    vitalsignId: number,
    pressure: string,
    pulseRate: number,
    temperature: number,
    ecg: any,
    respirationRate:number,
    vitals_date: string,
    noteDto: {
      subject: string,
      createdDate: string,
      body: string,
      nurseId:number,
      doctorId:number,
      indoorPatientRecordId:number
    }
  }