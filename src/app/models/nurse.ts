export interface nurseData{
    firstName: string
    lastName: string
    createdDtm: string
    age: number
    nationalId: string
    image: string
    bloodType: string
    phoneNumber: string
    address: string
    gender: string
    userName: string
    mail: string
    password: string
    role: string
    departmentId: number
    departmentName: string
    isActive: true
    nurseNotes: string
    nurseDegree: string
    nurseSpecialization: string   
}
export interface getNurseData {
    nurseDegree: string
    nurseSpecialization: string
    id: number
    departmentName:string
    firstName: string
    lastName: string
    createdDtm: string
    nationalId: string
    phoneNumber: string
    gender: string
    userName: string
    mail: string
    isActive: boolean
  }
  