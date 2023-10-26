export interface stock{
    stockId: number,
    stockLocation: string
}
export interface medicineWithStock{
        commercialName: string,
        group: string,
        effectiveSubstance: string,
        description: string,
        stockMedicines: {
          quantity: number,
          price: number,
          barcode: number,
          concentration: number,
          addedDtm: string,
          expireDtm: string,
          stockId: number,
          warning: string,
          medicineName: string
        }
}
export interface medicine{
    commercialName: string,
    group: string,
    effectiveSubstance: string,
    description: string
}
export interface newmedicine{
  id: number,
  quantity: number,
  price: number,
  barcode: number,
  concentration: number,
  addedDtm: string,
  expireDtm: string,
  stockId: number,
  medicineId: number,
  warning: string,
  medicineName: string
}