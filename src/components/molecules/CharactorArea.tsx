'use client'

import Image from 'next/image'
import React, { useContext } from 'react'
import Button from '../atoms/Button'
import { Context } from '@/game/context'

export type Props = {
  className?: string
}

export type characterOption = {
  commandName: string
  onClick: () => void
}

const EnemyArea = ({ className }: Props) => {
  const context = useContext(Context)

  return (
    <div className={`${className}`}>
      <div className='flex justify-center align-middle h-full items-center'>
        <Image src='/images/ferris.png' height={200} width={200} alt={''} />
      </div>
    </div>
  )
}

export default EnemyArea
