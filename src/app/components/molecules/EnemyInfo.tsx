'use client'

import React, { useContext } from 'react'
import Button from '../atoms/Button'
import { Context, UIFocusStatus } from '@/app/battle/context'

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

  const onClick = () => context?.updateActionCommand({ ...context.actionCommand, target: 'バグA' })

  return (
    <div className={`${className}`}>
      <div className='flex flex-col mt-2 ml-4 text-white font-bold'>
        <Button className={'text-start'} display={'バグA'} onClick={onClick} />
        {UIFocus == UIFocusStatus.ENEMY_INFO && <div>Focused!!</div>}
        {/* {options.map((option, key) => (
          // <div key={key}>
          <Button key={key} className={'text-start'} display={option.display_name} onClick={option.onClick} />
          // </div>
        ))} */}
      </div>
    </div>
  )
}

export default EnemyInfo
