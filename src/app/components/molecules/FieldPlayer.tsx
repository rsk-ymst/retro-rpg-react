'use client'

import Image from 'next/image'
import React, { useContext } from 'react'
import { BattleState, Context } from '@/app/battle/context'

export type Props = {
  className?: string
  characterName?: string
}

const FieldPlayer = ({ characterName, className }: Props) => {
  const context = useContext(Context)

  return (
    <>
      {(context?.battleState === BattleState.PlayerSelect ||
        context?.battleState === BattleState.ActionTransaction) && (
        <Image
          src={`/images/${characterName}/index.png`}
          height={64}
          width={64}
          alt={''}
          className={`${className}`}
        />
      )}
      {context?.battleState === BattleState.PlayerWin && (
        <Image
          src={`/images/${characterName}/win.gif`}
          height={64}
          width={64}
          alt={''}
          className={`${className}`}
        />
      )}
    </>
  )
}

export default FieldPlayer
