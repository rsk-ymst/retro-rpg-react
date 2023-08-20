'use client'

import React, { useContext } from 'react'
import Button from '../atoms/Button'
import { Context, UIFocusStatus, CharacterType, BattleState } from '@/game/context'

export type Props = {
  className?: string
  enemyName?: string
  enemyNumber?: Option[]
  UIFocus?: UIFocusStatus
}

export type Option = {
  commandName: string
  onClick: () => void
}

const SkillList = ({ className }: Props) => {
  const context = useContext(Context)
  if (!context) throw new Error('enemy context error')

  const fieldPlayerSkills = context.fieldPlayers[context.currentFieldPlayerIndex].skills

  return (
    <div className={`${className} w-[200px] overflow-y-auto`}>
      <div className='flex flex-col mt-2 text-white font-bold '>
        {fieldPlayerSkills.map((skill, i) => {
          return (
            <div key={i} className='flex'>
              <Button className={'w-[200px]'} display={skill.name} />
              <div className={'w-[200px]'}>{skill.description}</div>
              <div className={'w-[200px]'}>消費SP: {`${skill.specialPointConsumption}`}</div>
            </div>
          )
        })}
        <Button
          display='もどる'
          onClick={() => {
            context.updateUIFocusStatus(UIFocusStatus.BASIC_OPTIONS)
            context.updateActionCommand({ ...context.actionCommand, command: undefined })
          }}
        />
      </div>
    </div>
  )
}

export default SkillList
