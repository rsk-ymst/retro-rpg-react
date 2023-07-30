import { createContext } from 'react'

export const Context = createContext<GameContext>(null)

export type GameContext = {
  currentFieldPlayerIndex: number
  fieldPlayers: FieldPlayer[]

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

// string部分はのちに型変更
export type ActionCommand = {
  executer?: string // どのプレイヤーの操作か
  command?: string // どのコマンドを実行するのか
  target?: string // コマンドの実行対象は何か（敵, 見方）
  content?: string // スキルや道具を用いる場合、その内容は何か
} | null

// string部分はのちに型変更
export type FieldPlayer = {
  name: string
  status: FieldPlayerStatus
  parameter: FieldPlayerParameter
} | null

// string部分はのちに型変更
export type FieldPlayerStatus = {
  currentHitPoint: number
  maxHitPoint: number //
  currentMagicPoint: number // どのコマンドを実行するのか
  maxMagicPoint: number // どのコマンドを実行するのか
  condition: string
  command: string
} | null

// string部分はのちに型変更
export type FieldPlayerParameter = {
  attack: number
  vitality: number
  defense: number
  intelligence: number
} | null

export enum BattleState {
  ActionTransaction,
  PlayerSelect,
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
