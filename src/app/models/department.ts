export interface department{
    department_Name:string,
    location:string,
    isActive:boolean
}
export interface all_department_info{
    departmentId:number,
    departmentName:string,
    departmentLocation:string,
    isActive:boolean,
    isClinical:boolean,
    departmentImage?:any
}
export interface list_department{
    departmentId:number,
    departmentName:string
    isClinical:boolean
}