'use client'

import Image from 'next/image'
import React, { useContext } from 'react'
import Button from '../atoms/Button'
import { Context } from '@/app/battle/context'

export type Props = {
  className?: string
}

const FieldPlayerArea = ({ className }: Props) => {
  const context = useContext(Context)

  return (
    <div className={`${className}`}>
      <div className='flex justify-center align-middle h-full items-center'>
        <div className='mr-4'>
          {[0, 1, 2, 3].map((i) => (
            <Image key={i} src='/images/ferris.png' height={90} width={90} alt={''} className={`ml-${i*2}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FieldPlayerArea
