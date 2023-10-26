export interface Report {
    id: number
    patientId: number
    dateOfDischarge: string
    recommendation: string
    causeOfAdmission: string
    lastPrescription: LastPrescription
    listOfMedicineNames: ListOfMedicineName[]
    scanNames: string[]
    testNames: string[]
    indoorPatientRecordId: any
  }
  
  export interface LastPrescription {
    prescriptionId: number
    prescriptionItems: PrescriptionItem[]
    prescription_Date: string
    re_appointement_date: string
    patient: any
    patientId: number
    doctorId: number
    diagnosis: string
    indoorPatientRecordId: number
  }
  
  export interface PrescriptionItem {
    prescriptionItemId: number
    medicine_Name: string
    medicine_concentration: string
    instructions: string
    medicineType: string
    dose: string
    durarion: string
  }
  
 
  export interface ListOfMedicineName {
    prescriptionItemId: number
    medicine_Name: string
    medicine_concentration: string
    instructions: string
    medicineType: string
    dose: string
    durarion: string
  }
  