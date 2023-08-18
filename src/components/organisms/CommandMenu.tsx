'use client'

import { useContext } from 'react'
import BasicOptions from '../molecules/BasicOptions'
import EnemyInfo from '../molecules/EnemyInfo'
import UserInfo from '../molecules/UserInfo'
import { Context, UIFocusStatus } from '@/game/context'

export type Props = {
  className: string
}

const CommandMenu = ({ className }: Props) => {
  const context = useContext(Context)
  if (!context) throw new Error('CommandMenu context error')

  return (
    <div
      className={`flex bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg border-2 border-t-red-50 ${className}`}
    >
      {(context.UIFocus === UIFocusStatus.BASIC_OPTIONS ||
        context.UIFocus === UIFocusStatus.ENEMY_INFO) && (
        <>
          <BasicOptions className='flex-[0.8] h-full' />
          <EnemyInfo className='flex-1 h-full border-x-2' UIFocus={context?.UIFocus} />
        </>
      )}
      {context.UIFocus === UIFocusStatus.SKILLS && (
        <>
          <BasicOptions className='flex-[1.8] h-full' />
        </>
      )}
      {context.UIFocus === UIFocusStatus.ITEM_LIST && (
        <>
          <BasicOptions className='flex-[1.8] h-full' />
        </>
      )}

      <UserInfo className='flex-[2] h-full border-t-red-50'></UserInfo>
    </div>
  )
}

export default CommandMenu
