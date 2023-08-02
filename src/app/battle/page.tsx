'use client'

import { useEffect, useState } from 'react'
import BattleBar from '../components/organisms/BattleBar'
import BattleField from '../components/organisms/BattleField'
import CommandMenu from '../components/organisms/CommandMenu'
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
  fieldCharacterType,
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

  console.log('window reloaded -----------------------------------------')

  const updateBattleState = (value: BattleState) => setBattleState(value)
  const updateUIFocusStatus = (value: UIFocusStatus) => setUIFocus(value)
  const updateActionCommand = (value: ActionCommand) => setActionCommand(value)

  const fetchFieldObject = (obj: actionObject): FieldPlayer | Enemy => {
    if (obj.objectType === fieldCharacterType.Enemy) {
      return enemies[obj.index]
    } else {
      return fieldPlayers[obj.index]
    }
  }

  useEffect(() => {
    MAIN_BGM.play()
  }, [])

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
      actionCommandQueue.sort((cur, next) => {
        const curIdx = cur?.executer?.index || 0
        const nextIdx = next?.executer?.index || 0

        console.log(fieldPlayers[curIdx]?.parameter.speed, fieldPlayers[nextIdx]?.parameter.speed)

        const ret =
          (fieldPlayers[nextIdx]?.parameter.speed || 0) -
          (fieldPlayers[curIdx]?.parameter.speed || 0)

        return ret
      })

      console.log('after: ', actionCommandQueue[0]?.executer?.index)

      const execTransaction = async () => {
        for (let index = 0; index < FIELD_PLAYER_NUMBER; index++) {
          const command = actionCommandQueue.shift()
          setCurrentFieldPlayerIndex(command?.executer?.index || 0)

          const idx = command?.target?.index || 0
          enemies[idx].status.currentHitPoint -= 100

          new Audio('/sounds/attack.mp3').play()

          if (enemies[idx].status.currentHitPoint <= 0) {
            await sleep(2000)
            setBattleState(BattleState.PlayerWin)

            return
          }

          console.log('enemyに100ダメージ!', enemies[idx].status)
          await sleep(2000)
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
      setCurrentFieldPlayerIndex(0)
    }

    setActionCommand({
      ...actionCommand,
      executer: {
        objectType: fieldCharacterType.FieldPlayer,
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
        setCurrentFieldPlayerIndex(0)
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
            {/* メニュー */}
            <BattleBar className={'w-[920px] h-[50px] mt-2'} />
            {/* <div className='bg-blue-600 w-[920px] h-[50px] mt-2 rounded-lg border-2 border-t-red-50'> */}

            {/* </div> */}
            {/* </div> */}

            {/* バトルフィールド */}
            {/* <div className='flex justify-center'> */}
            <BattleField className={'w-[920px] h-[350px]'} />
            {/* <div className='bg-gray-700 w-[920px] h-[320px]'>
        {/* enemy filed */}
            {/* nakama filed */}
            {/* </div> */}
            {/* </div> */}

            {/* コマンドメニュー */}
            <CommandMenu className={'w-[920px] h-[120px] mb-2'} />
            {/* <div className='flex justify-center m-8'> */}
            {/* <div className='flex bg-blue-600 w-[920px] h-[150px] mb-2 rounded-lg border-2 border-t-red-50'> */}
            {/* <div className='flex'> */}
            {/* <div className='flex-[0.8] h-full border-2 border-t-red-50'>
            {/* <div>たたかう</div>
            <div>にげる</div>
            <div>どうぐ</div>
            <div>助ける</div> */}
            {/* </div> */}

            {/* <div className='flex-1 h-full border-2 border-t-red-50'> */}
            {/* <div>たたかう</div>
            <div>にげる</div>
            <div>どうぐ</div>
            <div>助ける</div> */}
            {/* </div> */}

            {/* <div className='flex-[2] h-full border-2 border-t-red-50'> */}
            {/* <div>たたかう</div>
            <div>にげる</div>
            <div>どうぐ</div>
            <div>助ける</div> */}
            {/* </div> */}
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </Context.Provider>
  )
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default GameWindow
