'use client'

import React, { useContext } from 'react'
import Button from '../atoms/Button'
import { Context, FieldPlayer, UIFocusStatus } from '@/app/battle/context'

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

const UserInfo = ({ className, enemyName, enemyNumber, UIFocus }: Props) => {
  const context = useContext(Context)
  const fieldPlayers = context?.fieldPlayers || []

  const testPlayer: FieldPlayer = {
    name: 'フェリス',
    status: {
      currentHitPoint: 300,
      maxHitPoint: 480,
      currentMagicPoint: 300,
      maxMagicPoint: 500,
      condition: 'normal',
      command: 'たたかう',
    },
    parameter: {
      attack: 100,
      vitality: 100,
      defense: 100,
      intelligence: 100,
    },
  }

  fieldPlayers.push(testPlayer)
  fieldPlayers.push(testPlayer)
  fieldPlayers.push(testPlayer)
  fieldPlayers.push(testPlayer)

  return (
    <div className={`${className}`}>
      <div className='my-2 mx-4 text-white font-bold'>
        {fieldPlayers.map((fp, index) => {
          return (
            <>
              <div className='flex justify-start w-full'>
                <div className='flex-1'>{fp?.name}</div>
                <div className='flex-1'>{`${fp?.status?.currentHitPoint} / ${fp?.status?.maxHitPoint}  `}</div>
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
