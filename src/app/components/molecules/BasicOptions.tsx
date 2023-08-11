'use client'

import React, { useContext } from 'react'
import Button from '../atoms/Button'
import { Context, CharacterType, UIFocusStatus, BattleState } from '@/app/battle/context'

export type Props = {
  className?: string
  options: characterOption[]
}

export type characterOption = {
  commandName: string
  onClick: () => void
}

const BasicOptions = ({ options, className }: Props) => {
  const context = useContext(Context)

  const characterOptions = [options, options, options, options]
  const charactersIdx = context?.currentFieldPlayerIndex || 0

  return (
    <div className={`${className}`}>
      <div className='flex flex-col mt-2 ml-4 text-white font-bold'>
        {characterOptions[charactersIdx >= 0 ? charactersIdx : 0].map((option, key) => {
          return (
            <Button
              key={key}
              className={'text-start'}
              display={option.commandName}
              onClick={option.onClick}
              disabled={
                !(
                  context?.UIFocus === UIFocusStatus.BASIC_OPTIONS &&
                  context.battleState === BattleState.PlayerSelect
                )
              }
            />
          )
        })}
      </div>
    </div>
  )
}

export default BasicOptions
