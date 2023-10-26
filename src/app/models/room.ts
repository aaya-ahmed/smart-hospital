export interface addNewRoom{
    roomCharges: number
    roomType: string
    numberOfBeds: number
    floorNumber: number
    roomNumber: number
    departmentId: number
   
}
export interface allRooms {
    roomType: string
    numberOf_freeBeds: number
    numberOf_allBeds: number
    floorNumber: number
    roomNumber: number
  }