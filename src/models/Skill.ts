export type Skill = {
  name: string
  type: SkillType
  power: number
  specialPointConsumption: number
  description: string
}

export enum SkillType {
  PhysicalAttack,
  PhysicalAllAttack,

  SpecialAttack,
  SpecialAllAttack,

  Healing,
  Defense,
}
