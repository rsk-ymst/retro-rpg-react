export type Item = {
  name: string
  type: ItemType
  power: number
  specialPointConsumption: number
  description: string
}

export enum ItemType {
  HPHealing,
}
