'use client'

import { useEffect, useState } from 'react'
import BattleBar from '../components/organisms/BattleBar'
import BattleField from '../components/organisms/BattleField'
import CommandMenu from '../components/organisms/CommandMenu'
import { ATTACK_SE } from '../utils/sound'
import {
  ActionCommand,
  ActionCommandQueue,
  BattleState,
  Context,
  Enemy,
  FieldPlayer,
  FocusPlayer,
  GameContext,
  UIFocusStatus,
  actionObject,
  CharacterType,
  testEnemyData,
} from './context'

import { testPlayerData } from './player'

const FIELD_PLAYER_NUMBER = 4
const MAIN_BGM = new Audio('/music/8bit.mp3')

const GameWindow = () => {
  // データ受信し、ここで初期値設定
  const [currentFieldPlayerIndex, setCurrentFieldPlayerIndex] = useState<number>(0)
  const [enterGame, setEnterGame] = useState<boolean>(true)
  const [fieldPlayers, setFieldPlayers] = useState<FieldPlayer[]>(testPlayerData)

  const [currentEnemyIndex, setCurrentEnemyIndex] = useState<number>(0)
  const [enemies, setEnemies] = useState<Enemy[]>(testEnemyData)

  const [actionCommandQueue, setActionCommandQueue] = useState<ActionCommandQueue>([])
  const [actionCommand, setActionCommand] = useState<ActionCommand>(null)

  const [battleState, setBattleState] = useState<BattleState>(BattleState.PlayerSelect)
  const [focusPlayer, setFocusPlayer] = useState<FocusPlayer>(FocusPlayer.A)
  const [UIFocus, setUIFocus] = useState<UIFocusStatus>(UIFocusStatus.BASIC_OPTIONS)

  const updateBattleState = (value: BattleState) => setBattleState(value)
  const updateUIFocusStatus = (value: UIFocusStatus) => setUIFocus(value)
  const updateActionCommand = (value: ActionCommand) => setActionCommand(value)


  useEffect(() => {
    MAIN_BGM.volume = 0.2
    MAIN_BGM.play()
  }, [])

  /**
   * フィールドプレイヤ, エネミーの各プールから特定のオブジェクトを取得する
   */
  const fetchFieldObject = (obj?: actionObject): FieldPlayer | Enemy => {
    if (!obj) return null

    if (obj.objectType === CharacterType.Enemy) {
      return enemies[obj.index || 0]
    } else {
      return fieldPlayers[obj.index || 0]
    }
  }

  /**
   * 各フィールドキャラクタの素早さ順でアクションコマンドのソートを行う
   */
  const sortActionCommandQueue = () => {
    actionCommandQueue.sort((cur, next) => {
      if (!cur || !next) return 0

      const curObj = fetchFieldObject(cur.executer)
      const nextObj = fetchFieldObject(next.executer)

      return (nextObj?.parameter.speed || 0) - (curObj?.parameter.speed || 0)
    })
  }


  /**
   *======================================
   * バトル状態の変化に伴う副作用
   *======================================
   */
  useEffect(() => {
    console.log('update battleState', battleState)

    if (battleState == BattleState.ActionTransaction) {
      console.log('before: ', actionCommandQueue[0]?.executer?.index)

      /* ソート */
      sortActionCommandQueue()

      console.log('after: ', actionCommandQueue[0]?.executer?.index)

      const execTransaction = async () => {
        await sleep(1000)

        for (let index = 0; index < FIELD_PLAYER_NUMBER; index++) {
          const command = actionCommandQueue.shift()
          if (!command) return

          const executer = fetchFieldObject(command.executer)
          const damage = command.command === 'たたかう' ? executer?.parameter.attack : 0

          setCurrentFieldPlayerIndex(command.executer?.index || 0)
          await sleep(1000)

          ATTACK_SE.play()

          const bufTarget = fetchFieldObject(command.target)
          if (bufTarget === null || bufTarget === undefined) {
            return
          }

          bufTarget.status.currentHitPoint -= damage || 0
          setEnemies(enemies.map((e, i) => (i == command?.target?.index ? bufTarget : e)))

          if (enemies[command?.target?.index || 0].status.currentHitPoint <= 0) {
            await sleep(2000)
            setBattleState(BattleState.PlayerWin)
            return
          }

          console.log('enemyに100ダメージ!', enemies[command.target?.index || 0].status)
          await sleep(1000)
        }
        enemies[0].status.onDamage = false

        setBattleState(BattleState.PlayerSelect)
      }

      execTransaction()

      return
    }

    if (battleState == BattleState.PlayerSelect) {
      setCurrentFieldPlayerIndex(0)
      setActionCommandQueue([])
      setActionCommand(null)

      return
    }

    if (battleState == BattleState.PlayerWin) {
      MAIN_BGM.pause()
      new Audio('/music/win.mp3').play()

      return
    }
  }, [battleState])

  /**
   *======================================
   * UIの変化に伴う副作用
   *======================================
   */
  useEffect(() => {
    console.log('update UIFocus', UIFocus)
  }, [UIFocus])

  /**
   *======================================
   * actionCommandの変化に伴う副作用
   *======================================
   */
  useEffect(() => {
    if (currentFieldPlayerIndex == 4) {
      setCurrentFieldPlayerIndex(-1)
    }

    setActionCommand({
      ...actionCommand,
      executer: {
        objectType: CharacterType.FieldPlayer,
        index: currentFieldPlayerIndex,
      },
    })

    console.log('update currentFieldPlayerIndex', currentFieldPlayerIndex)
  }, [currentFieldPlayerIndex])

  useEffect(() => {
    /* 発火タイミングに制約を設ける */
    if (battleState == BattleState.ActionTransaction) return
    if (currentFieldPlayerIndex >= FIELD_PLAYER_NUMBER) return
    if (actionCommand == null) return

    console.log('update actionCommand', actionCommand)

    // ターゲット決定 => コマンド確定
    if (actionCommand?.target !== undefined) {
      actionCommandQueue.push(actionCommand)
      console.log('pushed actionCommand', actionCommandQueue)

      // キャラクタ全員のコマンドが決定したら、stateを切り替える
      if (actionCommandQueue.length >= 4) {
        setCurrentFieldPlayerIndex(-1) // フィールドキャラクタのフォーカスを一時キャンセルする
        setBattleState(BattleState.ActionTransaction)
        return
      }

      setCurrentFieldPlayerIndex(currentFieldPlayerIndex + 1)
      setActionCommand(null) // コマンド内容を
    }
  }, [actionCommand, currentFieldPlayerIndex])

  const initialContext: GameContext = {
    currentFieldPlayerIndex,
    fieldPlayers,
    enemies,
    actionCommand,
    battleState,
    UIFocus,
    actionCommandQueue,
    updateBattleState,
    updateUIFocusStatus,
    updateActionCommand,
  }

  return (
    <Context.Provider value={initialContext}>
      <div className='flex justify-center m-4'>
        <div className='bg-black w-[960px] h-[540px]'>
          <div className='flex justify-center flex-col items-center'>
            <BattleBar className={'w-[920px] h-[50px] mt-2'} />
            <BattleField className={'w-[920px] h-[350px]'} />
            <CommandMenu className={'w-[920px] h-[120px] mb-2'} />
          </div>
        </div>
      </div>
    </Context.Provider>
  )
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default GameWindow
