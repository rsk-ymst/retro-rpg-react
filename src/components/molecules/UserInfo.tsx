'use client'

import React, { useContext } from 'react'
import Button from '../atoms/Button'
import { BattleState, CharacterType, Context, UIFocusStatus } from '@/game/context'

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

const UserInfo = ({ className }: Props) => {
  const context = useContext(Context)
  if (!context) throw new Error('items context error')

  const fieldPlayers = context?.fieldPlayers || []

  const isPlayerSelect = context.battleState === BattleState.PlayerSelect
  const isUserInfoFocus = context.UIFocus === UIFocusStatus.USER_INFO

  return (
    <div className={`${className}`}>
      <div className='my-2 mr-4 text-white font-bold'>
        {fieldPlayers.map((fp, index) => {
          return (
            <>
              <div
                key={fp.name}
                className={`flex justify-start w-full ${
                  isPlayerSelect &&
                  isUserInfoFocus &&
                  fp.status.currentHitPoint > 0 &&
                  'bg-white bg-opacity-10'
                }
              `}
              >
                <Button
                  className='flex-1'
                  display={fp?.name}
                  selectable={isPlayerSelect && isUserInfoFocus && fp.status.currentHitPoint > 0}
                  onClick={() => {
                    context.updateActionCommand({
                      ...context.actionCommand,
                      target: {
                        type: CharacterType.FieldPlayer,
                        index: index,
                      },
                    })
                  }}
                />
                <div className='flex-[0.8]'>{`${fp?.status?.currentHitPoint} / ${fp?.parameter.hitPoint}  `}</div>
                <div className='flex-1'>{fp?.status?.command}</div>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default UserInfo
