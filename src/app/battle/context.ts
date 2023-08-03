import { createContext } from 'react'
import FieldPlayerArea from '../components/molecules/FieldPlayerArea'

export const Context = createContext<GameContext>(null)

export type GameContext = {
  currentFieldPlayerIndex: number

  fieldPlayers: FieldPlayer[]
  enemies: Enemy[]

  actionCommand: ActionCommand
  actionCommandQueue: ActionCommandQueue

  battleState: BattleState
  UIFocus: UIFocusStatus

  /* 更新関数 */
  updateBattleState: (value: BattleState) => void
  updateUIFocusStatus: (value: UIFocusStatus) => void
  updateActionCommand: (value: ActionCommand) => void
} | null

export type ActionCommandQueue = ActionCommand[]

export enum CharacterType {
  Enemy,
  FieldPlayer,
}

// string部分はのちに型変更
export type ActionCommand = {
  executer?: actionObject // どのプレイヤーの操作か
  target?: actionObject // コマンドの実行対象は何か（敵, 見方）
  command?: string // どのコマンドを実行するのか
  content?: string // スキルや道具を用いる場合、その内容は何か
} | null

export type actionObject = {
  objectType: CharacterType
  index: number
}

export type ActionCharacter = {
  type?: CharacterType // どのプレイヤーの操作か
  name: string
  status: Status
  parameter: Parameter
} | null

// string部分はのちに型変更
export type FieldPlayer = {
  name: string
  status: Status
  parameter: FieldPlayerParameter
} | null

export type Enemy = {
  name: string
  status: Status
  parameter: EnemyParameter
}

// string部分はのちに型変更
export type FieldPlayerStatus = {
  currentHitPoint: number
  currentMagicPoint: number // どのコマンドを実行するのか
  condition: string
  command: string
} | null

// string部分はのちに型変更
export type EnemyStatus = {
  currentHitPoint: number
  currentMagicPoint: number // どのコマンドを実行するのか
  condition: string
  command: string
  onDamage: boolean
}

// string部分はのちに型変更
export type Status = {
  currentHitPoint: number
  currentMagicPoint: number // どのコマンドを実行するのか
  condition: string
  command: string
  onDamage: boolean
}

// string部分はのちに型変更
export type FieldPlayerParameter = {
  attack: number
  vitality: number
  speed: number
  defense: number
  intelligence: number
  maxHitPoint: number
  maxMagicPoint: number
}

export type Parameter = {
  attack: number
  vitality: number
  speed: number
  defense: number
  intelligence: number
  maxHitPoint: number
  maxMagicPoint: number
}

export type EnemyParameter = {
  attack: number
  vitality: number
  speed: number
  defense: number
  intelligence: number
  maxHitPoint: number
  maxMagicPoint: number
}

export enum BattleState {
  ActionTransaction,
  PlayerSelect,
  PlayerWin,
  GameOver
}

export enum FocusPlayer {
  A,
  B,
  C,
  D,
}

export enum UIFocusStatus {
  BASIC_OPTIONS,
  SKILLS,
  ENEMY_INFO,
  ITEM_LIST,
}

export const testEnemy: Enemy = {
  name: 'バグA',
  status: {
    currentHitPoint: 300,
    currentMagicPoint: 300,
    condition: 'normal',
    command: 'たたかう',
    onDamage: false,
  },
  parameter: {
    attack: 100,
    vitality: 100,
    defense: 100,
    intelligence: 100,
    maxHitPoint: 1000,
    maxMagicPoint: 500,
    speed: 100,
  },
}

export const testEnemyData: Enemy[] = [testEnemy]
