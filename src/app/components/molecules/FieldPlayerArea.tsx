'use client'

import Image from 'next/image'
import React, { useContext } from 'react'
import { BattleState, Context } from '@/app/battle/context'

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
          {["ferris", "gopher", "linux", "droid"].map((name, i) => {
            console.log(`cur: ${context?.currentFieldPlayerIndex}`)
            const marginForFocus = i == currentFieldPlayerIndex ? 'mr-20' : undefined

            return (
              <div key={i} className='flex justify-start items-center'>
              {
                (context?.battleState === BattleState.PlayerSelect && context.currentFieldPlayerIndex === i) &&
                <div>
                  <Image src={`/images/cursor2.png`} height={30} width={30} alt={''}/>
                </div>
              }
              <Image
                key={i}
                src={`/images/${name}.png`}
                height={70}
                width={70}
                alt={''}
                className={`${marginForFocus} mt-4`}
              />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FieldPlayerArea
