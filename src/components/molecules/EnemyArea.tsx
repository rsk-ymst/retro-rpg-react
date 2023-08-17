'use client'

import React, { useContext } from 'react'
import Enemy from './Enemy'
import { Context } from '@/game/context'

export type Props = {
  className?: string
}

const EnemyArea = ({ className }: Props) => {
  const context = useContext(Context)
  const enemies = context?.enemies || []
  const currentEnemyIndex = context?.currentEnemyIndex

  return (
    <div className={`${className}`}>
      <div className='flex align-middle h-full items-center'>
        {enemies.map((e, i) => {
          return <Enemy key={i} index={i} enemy={e} />
        })}
      </div>
    </div>
  )
}

export default EnemyArea
