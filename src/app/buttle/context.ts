import { createContext } from 'react'

export const Context = createContext<GameContext>(null)

export type GameContext = {
  currentCharacterIndex: number
  actionCommand: ActionCommand
  battleState: BattleState
  UIFocus: UIFocusStatus

  actionQueue: ActionCommandQueue

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
