import { createContext } from 'react'
import { Skill } from './Skill'

export type ActionCharacter = {
  type: 'Enemy' | 'FieldPlayer' // どのプレイヤーの操作か
  name: string
  drawState: ActionCharacterDrawState
  status: BattleVariableStatus
  parameter: CharacterParameter
  skills: Skill[]
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

export type CommandOption = {
  commandName: string
  onClick: () => void
}

/**
 * 戦闘中に変化するキャラクタの要素
 */
export type BattleVariableStatus = {
  currentHitPoint: number
  currentSpecialPoint: number // どのコマンドを実行するのか
  condition: '通常' | '毒' | '麻痺'
  command: string
  onDamage: boolean
  onDamagePoint: number // 直近の被ダメージ値。被ダメージ値をUIに表示させるために必要
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
  specialPoint: number
  experiencePoint: number
}
