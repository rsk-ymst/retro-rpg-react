'use client'

import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import Button from '../atoms/Button'
import { Context, UIFocusStatus, CharacterType } from '@/app/battle/context'

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

const EnemyInfo = ({ className, enemyName, enemyNumber, UIFocus }: Props) => {
  const context = useContext(Context)

  const onClick = () =>
    context?.updateActionCommand({
      ...context.actionCommand,
      target: {
        objectType: CharacterType.Enemy,
        index: 0,
      },
    })

  return (
    <div className={`${className}`}>
      <div className='flex flex-col mt-2 ml-4 text-white font-bold'>
        <Button className={'text-start'} display={'バグA'} onClick={onClick} />
      </div>
    </div>
  )
}

export default EnemyInfo
