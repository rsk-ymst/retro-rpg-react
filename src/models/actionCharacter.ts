import { createContext } from 'react'

export type ActionCharacter = {
  type: 'Enemy' | 'FieldPlayer' // どのプレイヤーの操作か
  name: string
  drawState: ActionCharacterDrawState
  status: BattleVariableStatus
  parameter: CharacterParameter
  commandOptions: CommandOption[]
}

/**
 * 戦闘中に変化するキャラクタの描画状態を管理するステート
 */
export enum ActionCharacterDrawState {
  Normal,
  onDamage,
  onDead,
  Win,
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

/**
 * 戦闘中に変化するキャラクタの要素
 */
export type BattleVariableStatus = {
  currentHitPoint: number
  currentMagicPoint: number // どのコマンドを実行するのか
  condition: '通常' | '毒' | '麻痺'
  command: string
  onDamage: boolean
}

/**
 * レベルに応じて定義付けられるキャラクタのパラメータ
 */
export type CharacterParameter = {
  level: number // レベル
  attack: number // 攻撃力
  specialAttack: number
  defense: number
  specialDefense: number
  speed: number
  hitPoint: number
  magicPoint: number
  experiencePoint: number
}
