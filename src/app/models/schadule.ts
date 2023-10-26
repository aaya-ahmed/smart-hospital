export interface schedules{
    id:number,
    doctors:doctors_schedule[]
}
export interface doctors_schedule{
  doctorId:number,
  doctorName:string,
  scheduleObjects:list_schedule[]
}
export interface list_schedule{
  dayOfWork:number,
  startTime:string,
  endTime:string,
  timePerPatient:string,
  scheduleId:number
}
export interface newDocschedule{
    doctorId:number,
    dayOfWork:number,
    startTime:string,
    endTime:string,
    timePerPatient:string
}
export interface allSlot{
    doctorId:number,
    doctorName:string,
    workSchedules:Slot[]
  }
  export interface Slot {
    dayOfWork: number
    slots: Slotinfo[]
  }
  
  export interface Slotinfo {
    slot_Id: string
    slotTime: string
    slotNumber: string
  }
  
