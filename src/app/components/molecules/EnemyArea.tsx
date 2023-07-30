'use client'

import Image from "next/image";
import React, { useContext } from 'react'
import Button from '../atoms/Button'
import { Context } from '@/app/battle/context'

export type Props = {
  className?: string
}

const EnemyArea = ({ className }: Props) => {
  const context = useContext(Context)

  return (
    <div className={`${className}`}>
      <div className='flex justify-center align-middle h-full items-center'>
        <Image src='/images/enemy.png' height={200} width={200} alt={""} />
      </div>
    </div>
  )
}

export default EnemyArea
