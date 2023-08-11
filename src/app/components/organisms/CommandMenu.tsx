'use client'

import { useContext, useState } from 'react'
import BasicOptions, { characterOption } from '../molecules/BasicOptions'
import EnemyInfo from '../molecules/EnemyInfo'
import UserInfo from '../molecules/UserInfo'
import { GameContext, Context, UIFocusStatus } from '@/app/battle/context'

export type Props = {
  className: string
}

const basicOptions: characterOption[] = [
  {
    commandName: 'たたかう',
    onClick: () => {
      return
    },
  },
  // {
  //   commandName: 'スキル',
  //   onClick: () => {
  //     return
  //   },
  // },
  {
    commandName: 'どうぐ',
    onClick: () => {
      return
    },
  },
  {
    commandName: 'にげる',
    onClick: () => {
      return
    },
  },
]

const enemyOptions: Object[] = [
  {
    enemyName: 'バグA',
    onClick: () => {
      return
    },
  },
]

const CommandMenu = ({ className }: Props) => {
  const context = useContext(Context)

  basicOptions[0].onClick = () => {
    context?.updateUIFocusStatus(UIFocusStatus.ENEMY_INFO)
    context?.updateActionCommand({ ...context.actionCommand, command: 'たたかう' })
  }

  basicOptions[1].onClick = () => {
    context?.updateUIFocusStatus(UIFocusStatus.SKILLS)
    context?.updateActionCommand({ ...context.actionCommand, command: 'スキル' })
  }

  return (
    <div className={`flex bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg border-2 border-t-red-50 ${className}`}>
      <BasicOptions className='flex-[0.8] h-full' options={basicOptions} />
      <EnemyInfo className='flex-1 h-full border-x-2' UIFocus={context?.UIFocus} />
      <UserInfo className='flex-[2] h-full border-t-red-50'></UserInfo>
    </div>
  )
}

export default CommandMenu
