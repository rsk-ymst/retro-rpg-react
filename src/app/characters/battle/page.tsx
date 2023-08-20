'use client'

import './style.css'
import localFont from 'next/font/local'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { ActionCharacter } from '../../../models/ActionCharacter'
import BattleBar from '../components/organisms/BattleBar'
import BattleField from '../components/organisms/BattleField'
import CommandMenu from '../components/organisms/CommandMenu'
import { ATTACK_SE } from '../utils/sound'
import {
  ActionCommand,
  ActionCommandQueue,
  BattleState,
  Context,
  FocusPlayer,
  GameContext,
  UIFocusStatus,
  ActionCharacterIdentifier,
  CharacterType,
  testEnemyData,
} from './context'

const myFont = localFont({ src: '../../../public/fonts/BestTen-CRT.otf' })

import { testPlayerData } from './player'

const FIELD_PLAYER_NUMBER = 4
const MAIN_BGM = new Audio('/music/8bit.mp3')

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const GameWindow = () => {
  // データ受信し、ここで初期値設定
  const [currentFieldPlayerIndex, setCurrentFieldPlayerIndex] = useState<number>(0)
  const [enterGame, setEnterGame] = useState<boolean>(true)
  const [fieldPlayers, setFieldPlayers] = useState<ActionCharacter[]>(testPlayerData)

  const [currentEnemyIndex, setCurrentEnemyIndex] = useState<number>(-1)
  const [enemies, setEnemies] = useState<ActionCharacter[]>(testEnemyData)

  const [actionCommandQueue, setActionCommandQueue] = useState<ActionCommandQueue>([])
  const [actionCommand, setActionCommand] = useState<ActionCommand>(null)

  const [battleState, setBattleState] = useState<BattleState>(BattleState.PlayerSelect)
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
  const fetchFieldEntity = (obj?: ActionCharacterIdentifier): ActionCharacter => {
    if (!obj) throw new Error('Object')

    if (obj.type === CharacterType.Enemy) {
      return enemies[obj.index]
    } else {
      return fieldPlayers[obj.index]
    }
  }

  const updateCharacterStatus = (obj: ActionCharacterIdentifier, target: ActionCharacter) => {
    if (obj.type === CharacterType.Enemy)
      setEnemies(enemies.map((e, i) => (i === obj.index ? target : e)))

    if (obj.type === CharacterType.FieldPlayer)
      setFieldPlayers(fieldPlayers.map((e, i) => (i === obj.index ? target : e)))
  }

  const setFocusCharacterIndex = (obj?: ActionCharacterIdentifier) => {
    if (!obj) throw new Error('Object')

    if (obj.type === CharacterType.Enemy) setCurrentEnemyIndex(obj.index)
    if (obj.type === CharacterType.FieldPlayer) setCurrentFieldPlayerIndex(obj.index)
  }

  const searchValidTarget = (identifier?: ActionCharacterIdentifier) => {
    if (!identifier) throw new Error('Object')

    var validIndex = 0

    if (identifier.type === CharacterType.Enemy) {
      enemies.forEach((e, i) => {
        if (e.status.currentHitPoint > 0) validIndex = i
      })
    }

    if (identifier.type === CharacterType.FieldPlayer) {
      fieldPlayers.forEach((e, i) => {
        if (e.status.currentHitPoint > 0) validIndex = i
      })
    }

    return validIndex
  }

  const isExtinctEnemies = () => {
    return enemies.filter((e) => e.status.currentHitPoint > 0).length == 0
  }

  const validQueueLength = () => {
    return (
      enemies.filter((e) => e.status.currentHitPoint > 0).length +
      fieldPlayers.filter((e) => e.status.currentHitPoint > 0).length
    )
  }

  const getAliveFieldPlayerCount = () => {
    return fieldPlayers.filter((e) => e.status.currentHitPoint > 0).length
  }

  const addEnemyCommand = () => {
    enemies.forEach((e, i) => {
      if (e.status.currentHitPoint <= 0) return

      const actionCommand: ActionCommand = {
        executer: {
          type: CharacterType.Enemy,
          index: i,
        },
        target: {
          type: CharacterType.FieldPlayer,
          index: getRandomInt(0, 3),
        },
        command: 'たたかう',
      }

      actionCommandQueue.push(actionCommand)
    })
  }

  /**
   * 各フィールドキャラクタの素早さ順でアクションコマンドのソートを行う
   */
  const sortActionCommandQueue = () => {
    actionCommandQueue.sort((cur, next) => {
      if (!cur || !next) return 0

      const curObj = fetchFieldEntity(cur.executer)
      const nextObj = fetchFieldEntity(next.executer)

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
      console.log('before: ', actionCommandQueue[0]?.executer)

      /* ソート */
      addEnemyCommand()
      sortActionCommandQueue()

      console.log('after: ', actionCommandQueue[0]?.executer?.index)

      const execTransaction = async () => {
        await sleep(1000)
        const validLength = validQueueLength()

        for (let index = 0; index < validLength; index++) {
          const command = actionCommandQueue.shift()
          if (!command) return

          const executerIdentifier = command.executer
          const targetIdentifier = command.target
          if (!executerIdentifier || !targetIdentifier) return

          const executerEntity = fetchFieldEntity(executerIdentifier)
          let targetEntity = fetchFieldEntity(targetIdentifier)
          if (!executerEntity || !targetEntity) return

          /* トランザクション中に死亡したキャラは飛ばす */
          if (executerEntity.status.currentHitPoint <= 0) continue

          /* 無効な攻撃対象を選択した場合は有効な対象に変更  */
          if (targetEntity.status.currentHitPoint <= 0) {
            targetIdentifier.index = searchValidTarget(targetIdentifier)
            targetEntity = fetchFieldEntity(targetIdentifier)
          }

          setFocusCharacterIndex(executerIdentifier)
          // if (executerEntity.type === 'FieldPlayer')
          //   setCurrentFieldPlayerIndex(executerIdentifier.index)

          await sleep(1000)
          ATTACK_SE.play()

          const damage = command.command === 'たたかう' ? executerEntity.parameter.attack : 0
          targetEntity.status.currentHitPoint -= damage || 0
          targetEntity.status.onDamage = true

          updateCharacterStatus(targetIdentifier, targetEntity)

          if (isExtinctEnemies()) {
            await sleep(2000)
            setBattleState(BattleState.PlayerWin)
            return
          }

          // console.log('enemyに100ダメージ!', enemies[command.target?.index || 0].status)
          await sleep(1000)

          targetEntity.status.onDamage = false
          updateCharacterStatus(targetIdentifier, targetEntity)
        }

        setCurrentFieldPlayerIndex(-1)
        await sleep(1500)

        setBattleState(BattleState.PlayerSelect)
      }

      execTransaction()

      return
    }

    if (battleState == BattleState.PlayerSelect) {
      setCurrentEnemyIndex(-1) // 敵フォーカスを無効に
      setCurrentFieldPlayerIndex(0)
      setUIFocus(UIFocusStatus.BASIC_OPTIONS)
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
   * currentFieldPlayerIndexの変化に伴う副作用
   *======================================
   */
  useEffect(() => {
    if (battleState === BattleState.ActionTransaction) return
    if (currentFieldPlayerIndex === -1) return

    /* 全てのフィールドプレイヤのコマンド選択もしくは実行が終われば、一度フォーカスを無効にする */
    if (currentFieldPlayerIndex == 4) {
      setCurrentFieldPlayerIndex(-1)
      return
    }

    /* 死亡したフィールドプレイヤのコマンド選択は行わない */
    if (fieldPlayers[currentFieldPlayerIndex].status.currentHitPoint <= 0) {
      setCurrentFieldPlayerIndex(currentFieldPlayerIndex + 1)
      return
    }

    /* フィールドプレイヤのコマンド選択が可能に */
    setActionCommand({
      ...actionCommand,
      executer: {
        type: CharacterType.FieldPlayer,
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
      setActionCommandQueue(actionCommandQueue)

      console.log('pushed actionCommand', actionCommandQueue)

      // キャラクタ全員のコマンドが決定したら、stateを切り替える
      if (actionCommandQueue.length === getAliveFieldPlayerCount()) {
        setCurrentFieldPlayerIndex(-1) // フィールドキャラクタのフォーカスを一時キャンセルする
        setBattleState(BattleState.ActionTransaction)
        return
      }

      setCurrentFieldPlayerIndex(currentFieldPlayerIndex + 1)
      setActionCommand(null) // コマンド内容を
      setUIFocus(UIFocusStatus.BASIC_OPTIONS)
    }
  }, [actionCommand, currentFieldPlayerIndex])

  const initialContext: GameContext = {
    currentFieldPlayerIndex,
    currentEnemyIndex,
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
      <Head>
        <link />
      </Head>
      <main className={myFont.className}>
        <div className='flex justify-center m-4'>
          <div className='bg-black w-[960px] h-[540px]'>
            <div className='flex justify-center flex-col items-center'>
              <BattleBar className={'w-[920px] h-[50px] mt-2'} />
              <BattleField className={'w-[920px] h-[350px]'} />
              <CommandMenu className={'w-[920px] h-[120px] mb-2'} />
            </div>
          </div>
        </div>
      </main>
    </Context.Provider>
  )
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default GameWindow
