import { createContext } from 'react'

export type ActionCharacter = {
  type: 'Enemy' | 'FieldPlayer' // どのプレイヤーの操作か
  name: string
  status: BattleVariableStatus
  parameter: CharacterParameter
  commandOptions: CommandOption[]
}

export type Skill = {
  name: string
  type: SkillType
  power: number
  consumeMagicPoint: number
  description: string
}

enum SkillType {
  PhysicalAttack,
  SpecialAttack,
  Healing,
  Defense,
}

export type CommandOption = {
  commandName: string
  onClick: () => void
}

// string部分はのちに型変更
export type BattleVariableStatus = {
  currentHitPoint: number
  currentMagicPoint: number // どのコマンドを実行するのか
  condition: '通常' | '毒' | '麻痺'
  command: string
  onDamage: boolean
}

export type CharacterParameter = {
  level: number // レベル
  attack: number // 攻撃力
  specialAttack: number
  defense: number
  specialDefense: number
  vitality: number
  speed: number
  intelligence: number
  hitPoint: number
  magicPoint: number
  experiencePoint: number
}
