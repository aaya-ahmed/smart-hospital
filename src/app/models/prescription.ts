export interface All_Prescription_Info {
  prescriptionItems: PrescriptionItem[]
  prescription_Date: string
  re_appointement_date: string
  patientId: number
  doctorId: number
  diagnosis: string
  indoorPatientRecordId: number
}
  
  export interface PrescriptionItem{
    
    prescriptionItemId: number
    medicine_Name: string
    medicine_concentration: string
    instructions: string
    medicineType: string
    dose: string
    durarion: string
  }
  // interfaces of get prescription
  export interface getPrescriptionInfo {
  
      doctorFullName: string
      department: string
      presciption: any
      prescription: Prescription
    }
    
    export interface Prescription {
      prescriptionId: number
      prescriptionItems: PrescriptionItem[]
      prescription_Date: string
      re_appointement_date: string
      patient: any
      patientId: number
      doctor: any
      doctorId: number
      diagnosis: string
      indoorPatientRecordId: number
    }
   
  
 
  