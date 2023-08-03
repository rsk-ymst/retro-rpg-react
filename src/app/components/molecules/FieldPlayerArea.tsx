'use client'

import Image from 'next/image'
import React, { useContext } from 'react'
import { Context } from '@/app/battle/context'

export type Props = {
  className?: string
}

const FieldPlayerArea = ({ className }: Props) => {
  const context = useContext(Context)

  const currentFieldPlayerIndex = context?.currentFieldPlayerIndex

  return (
    <div className={`${className}`}>
      <div className='flex justify-center align-middle h-full'>
        <div className='w-full flex flex-col items-center'>
          {[0, 1, 2, 3].map((i) => {
            console.log(`cur: ${context?.currentFieldPlayerIndex}`)
            const marginForFocus = i == currentFieldPlayerIndex ? 'mr-20' : undefined
            const leftMargin = `ml-${i * 2}`

            return (
              <Image
                key={i}
                src='/images/ferris.png'
                height={90}
                width={90}
                alt={''}
                className={`${marginForFocus} ${leftMargin}`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FieldPlayerArea
