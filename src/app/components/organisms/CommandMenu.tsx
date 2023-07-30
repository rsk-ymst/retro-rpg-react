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
  {
    commandName: 'スキル',
    onClick: () => {
      return
    },
  },
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

  // console.log(context.)

  // const [enemyInfoFocus, setEnemyInfoFocus] = useState(false)

  basicOptions[0].onClick = () => {
    context?.updateUIFocusStatus(UIFocusStatus.ENEMY_INFO)
    context?.updateActionCommand({ ...context.actionCommand, command: 'たたかう' })
  }

  return (
    // <div className={}>
    <div className={`flex bg-blue-600 rounded-lg border-2 border-t-red-50 ${className}`}>
      {/* <div className='flex'> */}
      {/* <div className='flex-[0.8] h-full border-2 border-t-red-50'> */}
      <BasicOptions className='flex-[0.8] h-full' options={basicOptions} />
      {/* <div>たたかう</div>
                  <div>にげる</div>
                  <div>どうぐ</div>
                  <div>助ける</div> */}
      {/* </div> */}

      <EnemyInfo className='flex-1 h-full border-x-2' UIFocus={context?.UIFocus} />

      {/*
      <div >
        {/* <div>たたかう</div>
                  <div>にげる</div>
                  <div>どうぐ</div>
                  <div>助ける</div> */}
      {/* </div> */}

      <UserInfo className='flex-[2] h-full border-t-red-50'></UserInfo>

      {/* </div> */}
    </div>
    // </div>
  )
}

export default CommandMenu
