import { createContext } from 'react'
import FieldPlayerArea from '../components/molecules/FieldPlayerArea'
import { ActionCharacter } from '../models/actionCharacter'

export const Context = createContext<GameContext>(null)

export type GameContext = {
  currentFieldPlayerIndex: number
  currentEnemyIndex: number

  fieldPlayers: ActionCharacter[]
  enemies: ActionCharacter[]

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
  executer?: ActionCharacterIdentifier // どのプレイヤーの操作か
  target?: ActionCharacterIdentifier // コマンドの実行対象は何か（敵, 見方）
  command?: string // どのコマンドを実行するのか
  content?: string // スキルや道具を用いる場合、その内容は何か
} | null

export type ActionCharacterIdentifier = {
  type: CharacterType
  index: number
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
  Defence,
}

export type CommandOption = {
  commandName: string
  onClick: () => void
}

// string部分はのちに型変更
export type FieldPlayer = {
  name: string
  status: CharacterStatus
  parameter: FieldPlayerParameter
} | null

export type Enemy = {
  name: string
  status: CharacterStatus
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
export type CharacterStatus = {
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

export type CharacterParameter = {
  level: string
  attack: number
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
  GameOver,
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

export const testEnemy: ActionCharacter = {
  name: 'バグA',
  type: 'Enemy',
  status: {
    currentHitPoint: 300,
    currentMagicPoint: 300,
    condition: '通常',
    command: 'たたかう',
    onDamage: false,
  },
  parameter: {
    attack: 100,
    vitality: 100,
    defense: 100,
    intelligence: 100,
    hitPoint: 1000,
    magicPoint: 500,
    speed: 100,
    level: 0,
    specialAttack: 0,
    specialDefense: 0,
    experiencePoint: 0,
  },
  commandOptions: [],
}

export const testEnemyData: ActionCharacter[] = [testEnemy]
