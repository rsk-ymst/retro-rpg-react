'use client'

import React, { useContext } from 'react'
import Button from '../atoms/Button'
import { Context, fieldCharacterType } from '@/app/battle/context'

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
  // context?.updateActionCommand({
  //   ...context?.actionCommand,
  //   executer: {
  //     objectType: fieldCharacterType.FieldPlayer,
  //     index: key,
  //   },
  // })

  return (
    <div className={`${className}`}>
      <div className='flex flex-col mt-2 ml-4 text-white font-bold'>
        {characterOptions[charactersIdx].map((option, key) => {
          return (
            <Button
              key={key}
              className={'text-start'}
              display={option.commandName}
              onClick={option.onClick}
            />
          )
        })}
      </div>
    </div>
  )
}

export default BasicOptions
