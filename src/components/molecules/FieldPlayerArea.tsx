'use client'

import Image from 'next/image'
import React, { useContext } from 'react'
import FieldPlayer from './FieldPlayer'
import { BattleState, Context } from '@/game/context'

export type Props = {
  className?: string
}

const FieldPlayerArea = ({ className }: Props) => {
  const context = useContext(Context)
  if (!context) throw new Error('field player context error')

  const fieldPlayers = context.fieldPlayers
  const currentFieldPlayerIndex = context.currentFieldPlayerIndex

  return (
    <div className={`${className}`}>
      <div className='flex justify-center align-middle h-full'>
        <div className='w-full flex flex-col items-center mr-8'>
          {['ferris', 'gopher', 'tux', 'droid'].map((name, i) => {
            console.log(`cur: ${context?.currentFieldPlayerIndex}`)
            const marginForFocus = i == currentFieldPlayerIndex ? 'mr-20' : undefined

            return (
              <div
                key={i}
                className='flex justify-start items-center'
                style={{ margin: `0 0 0 ${i * 30}px` }}
              >
                {context?.battleState === BattleState.PlayerSelect &&
                  context.currentFieldPlayerIndex === i && (
                    <div>
                      <Image src={`/images/cursor2.png`} height={30} width={30} alt={''} />
                    </div>
                  )}

                <FieldPlayer
                  key={i}
                  characterName={name}
                  className={`${marginForFocus} mt-5 `}
                  fieldCharacter={fieldPlayers[i]}
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
