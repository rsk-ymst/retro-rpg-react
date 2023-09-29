import { useEffect, useRef, useState } from 'react'
import { ActionCharacter, EffectType } from '../models/ActionCharacter'
import { getRandomInt } from '../utils/math'
import {
  ActionCommand,
  ActionCommandQueue,
  BattleState,
  GameContext,
  UIFocusStatus,
  ActionCharacterIdentifier,
  CharacterType,
  testEnemyData,
} from './context'

import { testPlayerData } from './player'
import { Item, ItemType, testItems } from '@/models/Item'

const FIELD_PLAYER_NUMBER = 4
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const useGameContext = () => {
  /* UIに関連する変数 */
  const [battleBarContent, setBattleBarContent] = useState<string | undefined>(undefined)
  const [battleState, setBattleState] = useState<BattleState>(BattleState.PlayerSelect)
  const [UIFocus, setUIFocus] = useState<UIFocusStatus>(UIFocusStatus.BASIC_OPTIONS)

  /* フィールドオブジェクトに関連する変数 */
  const [currentFieldPlayerIndex, setCurrentFieldPlayerIndex] = useState<number>(0)
  const [fieldPlayers, setFieldPlayers] = useState<ActionCharacter[]>(testPlayerData)
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState<number>(-1)
  const [enemies, setEnemies] = useState<ActionCharacter[]>(testEnemyData)

  /* アクションコマンドに関連する変数 */
  const [actionCommand, setActionCommand] = useState<ActionCommand>(null)
  const [actionCommandQueue, setActionCommandQueue] = useState<ActionCommandQueue>([])

  const [items, setItems] = useState<Item[]>(testItems)
  const [isPlayingBGM, setIsPlayingBGM] = useState<boolean>(false)

  /* 子コンポーネントでコンテキスト変数を更新するための関数 */
  const updateBattleState = (value: BattleState) => setBattleState(value)
  const updateUIFocusStatus = (value: UIFocusStatus) => setUIFocus(value)
  const updateActionCommand = (value: ActionCommand) => setActionCommand(value)
  const updateCurrentEnemyIndex = (value: number) => setCurrentEnemyIndex(value)
  const updateIsPlayingBGM = (value: boolean) => setIsPlayingBGM(value)
  const updateBattleBarContent = (value?: string) => setBattleBarContent(value)

  /* SE Ref */
  const selectSERef = useRef<HTMLAudioElement>(null)
  const normalAttackSERef = useRef<HTMLAudioElement>(null)
  const chargeSERef = useRef<HTMLAudioElement>(null)
  const specialAttackSERef = useRef<HTMLAudioElement>(null)
  const healingSERef = useRef<HTMLAudioElement>(null)

  /* BGM Ref */
  const mainBGMRef = useRef<HTMLAudioElement>(null)
  const winBGMRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    /* 音量調整 */
    if (mainBGMRef.current?.volume) mainBGMRef.current.volume = 0.2
    if (winBGMRef.current?.volume) winBGMRef.current.volume = 0.3
    if (selectSERef.current?.volume) selectSERef.current.volume = 0.4
    if (healingSERef.current?.volume) healingSERef.current.volume = 0.6
    if (chargeSERef.current?.volume) chargeSERef.current.volume = 0.8
    if (normalAttackSERef.current?.volume) normalAttackSERef.current.volume = 0.8
    if (specialAttackSERef.current?.volume) specialAttackSERef.current.volume = 0.5

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * フィールドプレイヤ, エネミーの各プールから特定のオブジェクトを取得する
   */
  const fetchFieldEntity = (obj: ActionCharacterIdentifier): ActionCharacter => {
    if (obj.type === CharacterType.Enemy) {
      return enemies[obj.index]
    } else {
      return fieldPlayers[obj.index]
    }
  }

  /**
   * キャラクタの可変ステータスを更新する
   */
  const updateCharacterStatus = (obj: ActionCharacterIdentifier, target: ActionCharacter) => {
    switch (obj.type) {
      case CharacterType.FieldPlayer: {
        setFieldPlayers(fieldPlayers.map((e, i) => (i === obj.index ? target : e)))
        return
      }

      case CharacterType.Enemy: {
        setEnemies(enemies.map((e, i) => (i === obj.index ? target : e)))
        return
      }

      case CharacterType.AllFieldPlayer: {
        setFieldPlayers(
          fieldPlayers.map((e) => {
            e.status.onEffect = undefined
            return e
          }),
        )
        return
      }

      case CharacterType.AllEnemy: {
        setEnemies(
          enemies.map((e) => {
            e.status.onEffect = undefined
            return e
          }),
        )
        return
      }

      default:
        return
    }
  }

  /**
   * フォーカスするキャラクタを設定する
   */
  const setFocusCharacterIndex = (obj?: ActionCharacterIdentifier) => {
    if (!obj) throw new Error('Object')

    if (obj.type === CharacterType.Enemy) setCurrentEnemyIndex(obj.index)
    if (obj.type === CharacterType.FieldPlayer) setCurrentFieldPlayerIndex(obj.index)
  }

  /**
   * 生存状態のキャラクタを誰でもよいから取得する
   */
  const searchAliveTarget = (identifier?: ActionCharacterIdentifier) => {
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

  /**
   * 対象キャラクタが生存状態か確認する
   */
  const isAlive = (target: ActionCharacter) => target.status.currentHitPoint > 0

  /**
   * 敵を全員倒したかを確認する
   */
  const isExtinctEnemies = () => {
    return enemies.filter((e) => e.status.currentHitPoint > 0).length == 0
  }

  /**
   * 生存しているエンティティの数を取得する
   */
  const validQueueLength = () => {
    return (
      enemies.filter((e) => e.status.currentHitPoint > 0).length +
      fieldPlayers.filter((e) => e.status.currentHitPoint > 0).length
    )
  }

  /**
   * 生存しているフィールドプレイヤ数を取得
   */
  const getAliveFieldPlayerCount = () => {
    return fieldPlayers.filter((e) => e.status.currentHitPoint > 0).length
  }


  const clearFieldPlayerCommand = () => {
    fieldPlayers.map((e) => {
      e.status.command = undefined
      return e
    })
    setFieldPlayers(fieldPlayers)
  }

  /**
   * バトルトランザクション開始前に敵のコマンドを設定する
   */
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
        } as ActionCharacterIdentifier,
        name: 'たたかう',
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
      if (!cur.executer || !next.executer) return 0

      const curObj = fetchFieldEntity(cur.executer)
      const nextObj = fetchFieldEntity(next.executer)

      return (nextObj?.parameter.speed || 0) - (curObj?.parameter.speed || 0)
    })
  }

  const effectTarget = (
    target: ActionCharacter,
    point: number,
    effect: EffectType,
  ): ActionCharacter => {
    target.status.currentSpecialPoint += point
    if (target.parameter.specialPoint > target.status.currentSpecialPoint)
      target.status.currentSpecialPoint = target.parameter.specialPoint

    if (effect === EffectType.Damage) {
      target.status.currentHitPoint -= point
    }

    if (effect === EffectType.HealingHP) {
      target.status.currentHitPoint += point

      // 上限値を超える回復値を修正
      if (target.parameter.hitPoint > target.status.currentHitPoint)
        target.status.currentHitPoint = target.parameter.hitPoint
    }

    if (effect === EffectType.HealingSP) {
      target.status.currentSpecialPoint += point

      // 上限値を超える回復値を修正
      if (target.parameter.specialPoint > target.status.currentSpecialPoint)
        target.status.currentSpecialPoint = target.parameter.specialPoint
    }

    target.status.onEffectPoint = point
    target.status.onEffect = effect

    return target
  }

  const targetAction = async (
    executerIdentifier: ActionCharacterIdentifier,
    targetIdentifier: ActionCharacterIdentifier,
    command: ActionCommand,
  ) => {
    const executer = fetchFieldEntity(executerIdentifier)
    let target = fetchFieldEntity(targetIdentifier)
    if (!executer || !target) return

    switch (command?.name) {
      case 'たたかう': {
        const damage = executer.parameter.attack
        const effectedTarget = effectTarget(target, damage, EffectType.Damage)

        // ATTACK_SE.play()
        normalAttackSERef.current?.play()
        updateCharacterStatus(targetIdentifier, effectedTarget)

        return
      }

      case 'スキル': {
        if (command.content === undefined) throw new Error('expected skill set')

        if (!('specialPointConsumption' in command.content))
          throw new Error('not set specialPointConsumption')

        executer.status.currentSpecialPoint -= command.content?.specialPointConsumption || 0

        switch (command.target?.type) {
          case CharacterType.Enemy: {
            const damage = executer.parameter.attack

            const effectedTarget = effectTarget(target, damage, EffectType.Damage)

            chargeSERef.current?.play()
            await sleep(1000)
            normalAttackSERef.current?.play()

            updateCharacterStatus(targetIdentifier, effectedTarget)
            return
          }

          case CharacterType.AllFieldPlayer: {
            const damage = 120
            fieldPlayers.map((e) => {
              if (isAlive(e)) effectTarget(e, damage, EffectType.Damage)
            })

            specialAttackSERef.current?.play()
            setEnemies(enemies)
            return
          }

          case CharacterType.AllEnemy: {
            const damage = 120
            enemies.map((e) => {
              if (isAlive(e)) effectTarget(e, damage, EffectType.Damage)
            })

            specialAttackSERef.current?.play()
            await sleep(1300)
            normalAttackSERef.current?.play()

            setEnemies(enemies)
            return
          }
        }
      }

      case 'どうぐ': {
        if (command.content === undefined) throw new Error('expected item set')

        const item = command.content
        switch (item.type) {
          case ItemType.HPHealing: {
            const healingPoint = item.power

            healingSERef.current?.play()
            effectTarget(target, healingPoint, EffectType.HealingHP)

            updateCharacterStatus(targetIdentifier, target)
            return
          }

          case ItemType.SPHealing: {
            const damage = 120
            fieldPlayers.map((e) => {
              if (isAlive(e)) effectTarget(e, damage, EffectType.HealingHP)
            })

            setEnemies(enemies)
            return
          }
        }

        return
      }
    }

    updateCharacterStatus(targetIdentifier, target)
  }

  /**
   *======================================
   * バトル状態の変化に伴う副作用
   *======================================
   */
  useEffect(() => {
    // console.log('update battleState', battleState)

    if (battleState == BattleState.ActionTransaction) {
      // console.log('before: ', actionCommandQueue[0]?.executer)

      /* ソート */
      addEnemyCommand()
      sortActionCommandQueue()

      // console.log('after: ', actionCommandQueue[0]?.executer?.index)

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
          if (!executerEntity) return

          /* トランザクション中に死亡したキャラは飛ばす */
          if (executerEntity.status.currentHitPoint <= 0) continue

          /* 無効な攻撃対象を選択した場合は有効な対象に変更  */
          if (targetEntity.status.currentHitPoint <= 0) {
            targetIdentifier.index = searchAliveTarget(targetIdentifier)
            targetEntity = fetchFieldEntity(targetIdentifier)
          }

          setFocusCharacterIndex(executerIdentifier)
          setBattleBarContent(command.content?.name)

          await sleep(800)

          await targetAction(executerIdentifier, targetIdentifier, command)

          // const damage = command.command === 'たたかう' ? executerEntity.parameter.attack : 0
          // targetEntity.status.currentHitPoint -= damage || 0
          // targetEntity.status.onEffect = true

          if (isExtinctEnemies()) {
            await sleep(2000)
            setBattleState(BattleState.PlayerWin)
            return
          }

          await sleep(1000)

          targetEntity.status.onEffect = undefined
          targetEntity.status.onEffectPoint = 0

          setBattleBarContent(undefined)
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
      clearFieldPlayerCommand()
      setCurrentEnemyIndex(-1) // 敵フォーカスを無効に
      setCurrentFieldPlayerIndex(0)
      setUIFocus(UIFocusStatus.BASIC_OPTIONS)
      setActionCommandQueue([])
      setActionCommand(null)

      return
    }

    if (battleState == BattleState.PlayerWin) {
      mainBGMRef.current?.pause()
      setBattleBarContent(undefined)

      if (isPlayingBGM) winBGMRef.current?.play()

      return
    }
  }, [battleState])

  /**
   *======================================
   * UIの変化に伴う副作用
   *======================================
   */
  useEffect(() => {
    // console.log('update UIFocus', UIFocus)
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

    // console.log('update currentFieldPlayerIndex', currentFieldPlayerIndex)
  }, [currentFieldPlayerIndex])

  useEffect(() => {
    /* 発火タイミングに制約を設ける */
    if (battleState == BattleState.ActionTransaction) return
    if (currentFieldPlayerIndex >= FIELD_PLAYER_NUMBER) return
    if (actionCommand == null) return

    // console.log('update actionCommand', actionCommand)

    // ターゲット決定 => コマンド確定
    if (actionCommand?.target !== undefined) {
      actionCommandQueue.push(actionCommand)
      setActionCommandQueue(actionCommandQueue)

      // キャラクタ全員のコマンドが決定したら、stateを切り替える
      if (actionCommandQueue.length === getAliveFieldPlayerCount()) {
        setCurrentFieldPlayerIndex(-1) // フィールドキャラクタのフォーカスを一時キャンセルする
        setCurrentEnemyIndex(-1) // 敵のフォーカスを一時キャンセルする

        setBattleState(BattleState.ActionTransaction)
        return
      }

      setCurrentEnemyIndex(-1) // 敵のフォーカスを一時キャンセルする
      setCurrentFieldPlayerIndex(currentFieldPlayerIndex + 1)
      setActionCommand(null) // コマンド内容を
      setUIFocus(UIFocusStatus.BASIC_OPTIONS)
    }
  }, [actionCommand, currentFieldPlayerIndex])

  const initialContext: GameContext = {
    currentFieldPlayerIndex,
    currentEnemyIndex,
    battleBarContent,
    fieldPlayers,
    enemies,
    actionCommand,
    battleState,
    UIFocus,
    actionCommandQueue,
    items,
    isPlayingBGM,
    updateBattleState,
    updateUIFocusStatus,
    updateActionCommand,
    updateCurrentEnemyIndex,
    updateIsPlayingBGM,
    updateBattleBarContent,
    selectSERef,
    normalAttackSERef,
    chargeSERef,
    specialAttackSERef,
    healingSERef,
    mainBGMRef,
    winBGMRef,
  }

  return initialContext
}

export default useGameContext
