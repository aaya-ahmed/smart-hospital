
export interface doctors{
  imageName: string
  image: any
  firstName: string,
  lastName: string,
  createdDtm: string,
  age:number,
  nationalId: string,
  bloodType: string,
  phoneNumber: string,
  address: string,
  gender: string,
  userName: string,
  mail: string,
  password: string,
  role: string,
  departmentId:number,
  departmentName: string,
  isActive: boolean,
  docDegree: string,
  docSpecialization: string

}
export interface doctor{
  docDegree: string,
      docSpecialization: string,
      clinicalDoctor: boolean,
      id: number,
      firstName: string,
      lastName: string,
      createdDtm: string,
      age: number,
      nationalId:string,
      image: null,
      imageName: string,
      bloodType: string,
      phoneNumber: string,
      address: string,
      gender: string,
      userName: string,
      mail: string,
      password: null,
      role: null,
      departmentId: number,
      departmentName: string,
      isActive: boolean
}
export interface doctorsList{
  id:number
  firstName: string,
  lastName: string,
  createdDtm: string,
  nationalId: string,
  phoneNumber: string,
  gender: string,
  userName: string,
  mail: string,
  departmentName: string,
  isActive: boolean,
  docDegree: string,
  docSpecialization: string

}
export interface alldoctors {
    departmentId:number,
    departmentName: string,
    doctorDtos: DoctorDto[]
  }
  
  export interface DoctorDto {
    id: number,
    firstName:string,
    lastName:string
  }

