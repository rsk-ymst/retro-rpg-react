'use client'

import React, { useContext } from 'react'
import Button from '../atoms/Button'
import { Context } from '@/app/buttle/context'

export type Props = {
  className?: string
  options: charactorOption[]
}

export type charactorOption = {
  commandName: string
  onClick: () => void
}

const BasicOptions = ({ options, className }: Props) => {
  const context = useContext(Context)

  const charactorOptions = [options, options, options, options]
  const charactorsIdx = context?.currentCharacterIndex || 0

  return (
    <div className={`${className}`}>
      <div className='flex flex-col mt-2 ml-4 text-white font-bold'>
        {charactorOptions[charactorsIdx].map((option, key) => (
          <Button
            key={key}
            className={'text-start'}
            display={option.commandName}
            onClick={option.onClick}
          />
        ))}
      </div>
    </div>
  )
}

export default BasicOptions
