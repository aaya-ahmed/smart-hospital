export interface labs {
  id: number
  name: string
  testCharge: number
  categoricalParamters: CategoricalParamter[]
  numericalParamters: NumericalParamter[]
}

export interface CategoricalParamter {
  id: number
  testParameterName: string
  fieldType: string
  inputPattern: string
  unit: string
  normalvalue: string
}

export interface NumericalParamter {
  id: number
  testParameterName: string
  fieldType: string
  inputPattern: string
  unit: string
  min_Range: number
  max_Range: number
}
export interface resultData {

  labRequestId: number
  categoricalDetails: CategoricalDetail[]
  numericalDetails: NumericalDetail[]
  testDate: string,
  indoorPatientRecordId: number
}

export interface CategoricalDetail {
  testParameterId: number
  measuredValue: string
}

export interface NumericalDetail {
  testParameterId: number
  measuredValue: number
}
export interface labsList{
  name:string;
  id:number,
  testCharge:number
}

export interface addlabRequst {
  labName: string
  createdDtm: string
  patientId: number
  doctorId: number
}
export interface getAllLabRequsts{
  id:number,
  labName: string,
  testId: number,
  createdDtm: string,
  patientId: number,
  doctorId: number,
  patientName: string,
  doctorName: string,
  indoorPatientRecordId:any,
}
export interface patienttestlist {
  patientTestId: number
  patientId: number
  testName: string
  doctorId: number
  categoricalDetails: CategoricalDetail[]
  numericalDetails: NumericalDetail[]
  testDate: string
}

