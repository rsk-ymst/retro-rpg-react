export type Item = {
  name: string
  type: ItemType
  power: number
  description: string
  count: number
}

export enum ItemType {
  HPHealing,
  SPHealing,
}

export const testItems = [
  {
    name: 'ポーション',
    type: ItemType.HPHealing,
    power: 100,
    description: '味方のHPを100回復',
    count: 3,
  },
  {
    name: 'エーテル',
    type: ItemType.SPHealing,
    power: 100,
    description: '味方のSPを100回復',
    count: 3,
  },
]
