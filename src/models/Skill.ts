export type Skill = {
  name: string
  type: SkillType
  power: number
  specialPointConsumption: number
  description: string
}

export enum SkillType {
  PhysicalAttack,
  SpecialAttack,
  Healing,
  Defense,
}
