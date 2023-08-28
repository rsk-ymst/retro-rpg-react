'use client'

import React, { useContext } from 'react'
import Button from '../atoms/Button'
import { Context, UIFocusStatus, CharacterType, BattleState } from '@/game/context'

export type Props = {
  className?: string
  enemyName?: string
  enemyNumber?: Option[]
  UIFocus?: UIFocusStatus
}

export type Option = {
  commandName: string
  onClick: () => void
}

const EnemyInfo = ({ className }: Props) => {
  const context = useContext(Context)
  if (!context) throw new Error('enemy context error')

  const isPlayerSelect = context.battleState === BattleState.PlayerSelect
  const isEnemyInfoFocus = context.UIFocus === UIFocusStatus.ENEMY_INFO

  return (
    <div className={`${className}`}>
      <div className='flex flex-col mt-2 text-white font-bold'>
        {context.enemies.map((e, i) => {
          const onClick = () =>
            context.updateActionCommand({
              ...context.actionCommand,
              target: {
                type: CharacterType.Enemy,
                index: i,
              },
            })

          return (
            <div
              key={i}
              className={`${
                isPlayerSelect &&
                isEnemyInfoFocus &&
                e.status.currentHitPoint > 0 &&
                'bg-white bg-opacity-10'
              }
              `}
            >
              <Button
                // 末尾表示の余白部分を調整する
                className={`text-start ${context.enemies.length === i + 1 && 'pb-1'}
                }`}
                display={e.name}
                onClick={onClick}
                onMouseEnter={() => context.updateCurrentEnemyIndex(i)}
                disabled={
                  !(
                    context?.UIFocus === UIFocusStatus.ENEMY_INFO &&
                    context.battleState === BattleState.PlayerSelect &&
                    e.status.currentHitPoint > 0
                  )
                }
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EnemyInfo
