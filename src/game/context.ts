import { MutableRefObject, RefObject, createContext } from 'react'
import { ActionCharacter, ActionCharacterDrawState } from '../models/ActionCharacter'
import { Item } from '@/models/Item'
import { Skill, SkillType } from '@/models/Skill'

export const Context = createContext<GameContext>(null)

export type GameContext = {
  currentFieldPlayerIndex: number
  currentEnemyIndex: number

  fieldPlayers: ActionCharacter[]
  enemies: ActionCharacter[]

  actionCommand: ActionCommand
  actionCommandQueue: ActionCommandQueue

  battleBarContent?: string
  battleState: BattleState
  UIFocus: UIFocusStatus
  items: Item[]
  isPlayingBGM: boolean

  /* 更新関数 */
  updateBattleState: (value: BattleState) => void
  updateUIFocusStatus: (value: UIFocusStatus) => void
  updateActionCommand: (value: ActionCommand) => void
  updateCurrentEnemyIndex: (value: number) => void
  updateIsPlayingBGM: (value: boolean) => void


  selectSERef: RefObject<HTMLAudioElement>
  normalAttackSERef: RefObject<HTMLAudioElement>
  chargeSERef: RefObject<HTMLAudioElement>
  specialAttackSERef: RefObject<HTMLAudioElement>
  healingSERef: RefObject<HTMLAudioElement>

  mainBGMRef: RefObject<HTMLAudioElement>
  winBGMRef: RefObject<HTMLAudioElement>
} | null

export type ActionCommandQueue = ActionCommand[]

export enum CharacterType {
  Enemy,
  FieldPlayer,
  AllEnemy,
  AllFieldPlayer,
}

// string部分はのちに型変更
export type ActionCommand = {
  executer?: ActionCharacterIdentifier // どのプレイヤーの操作か
  target?: ActionCharacterIdentifier // コマンドの実行対象は何か（敵, 見方）
  name?: string // どのコマンドを実行するのか
  content?: Skill | Item // スキルや道具を用いる場合、その内容は何か
} | null

export type ActionCharacterIdentifier = {
  type: CharacterType
  index: number
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
  currentSpecialPoint: number // どのコマンドを実行するのか
  condition: string
  command: string
} | null

// string部分はのちに型変更
export type EnemyStatus = {
  currentHitPoint: number
  currentSpecialPoint: number // どのコマンドを実行するのか
  condition: string
  command: string
  onEffect: boolean
}

// string部分はのちに型変更
export type CharacterStatus = {
  currentHitPoint: number
  currentSpecialPoint: number // どのコマンドを実行するのか
  condition: string
  command: string
  onEffect: boolean
}

// string部分はのちに型変更
export type FieldPlayerParameter = {
  attack: number
  vitality: number
  speed: number
  defense: number
  intelligence: number
  maxHitPoint: number
  maxSpecialPoint: number
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
  specialPoint: number
  experiencePoint: number
}

export type EnemyParameter = {
  attack: number
  vitality: number
  speed: number
  defense: number
  intelligence: number
  maxHitPoint: number
  maxSpecialPoint: number
}

export enum BattleState {
  ActionTransaction,
  PlayerSelect,
  PlayerWin,
  GameOver,
}

export enum UIFocusStatus {
  BASIC_OPTIONS,
  SKILLS,
  ENEMY_INFO,
  USER_INFO,
  ITEM_LIST,
}

export const testEnemy: ActionCharacter = {
  name: 'バグA',
  type: 'Enemy',
  status: {
    currentHitPoint: 200,
    currentSpecialPoint: 300,
    condition: '通常',
    command: 'たたかう',
    onEffect: undefined,
    onEffectPoint: 0,
  },
  parameter: {
    attack: 100,
    defense: 100,
    hitPoint: 200,
    specialPoint: 500,
    speed: 100,
    level: 0,
    specialAttack: 0,
    specialDefense: 0,
    experiencePoint: 0,
  },
  skills: [
    {
      name: 'ライフタイム',
      type: SkillType.PhysicalAttack,
      power: 450,
      specialPointConsumption: 100,
      description: '相手の時間を止める',
    },
    {
      name: '所有権',
      type: SkillType.PhysicalAttack,
      power: 450,
      specialPointConsumption: 100,
      description: '相手の時間を止める',
    },
    {
      name: 'RAII',
      type: SkillType.PhysicalAttack,
      power: 450,
      specialPointConsumption: 100,
      description: '相手の時間を止める',
    },
    {
      name: 'await',
      type: SkillType.PhysicalAttack,
      power: 450,
      specialPointConsumption: 100,
      description: '相手の時間を止める',
    },
  ],
  commandOptions: [],
  drawState: ActionCharacterDrawState.Normal,
}

export const testEnemy2: ActionCharacter = {
  name: 'バグB',
  type: 'Enemy',
  status: {
    currentHitPoint: 200,
    currentSpecialPoint: 300,
    condition: '通常',
    command: 'たたかう',
    onEffect: undefined,
    onEffectPoint: 0,
  },
  parameter: {
    attack: 100,
    defense: 100,
    hitPoint: 200,
    specialPoint: 500,
    speed: 100,
    level: 0,
    specialAttack: 0,
    specialDefense: 0,
    experiencePoint: 0,
  },
  commandOptions: [],
  skills: [
    {
      name: 'ライフタイム',
      type: SkillType.PhysicalAttack,
      power: 450,
      specialPointConsumption: 100,
      description: '相手の時間を止める',
    },
    {
      name: '所有権',
      type: SkillType.PhysicalAttack,
      power: 450,
      specialPointConsumption: 100,
      description: '相手の時間を止める',
    },
    {
      name: 'RAII',
      type: SkillType.PhysicalAttack,
      power: 450,
      specialPointConsumption: 100,
      description: '相手の時間を止める',
    },
    {
      name: 'await',
      type: SkillType.PhysicalAttack,
      power: 450,
      specialPointConsumption: 100,
      description: '相手の時間を止める',
    },
  ],
  drawState: ActionCharacterDrawState.Normal,
}

export const testEnemyData: ActionCharacter[] = [testEnemy, testEnemy2]
