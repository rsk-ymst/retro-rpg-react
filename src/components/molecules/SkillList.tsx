'use client'

import React, { useContext } from 'react'
import Button from '../atoms/Button'
import { Context, UIFocusStatus, CharacterType } from '@/game/context'
import { SkillType } from '@/models/Skill'

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
              <Button
                className={'w-[200px]'}
                display={skill.name}
                onClick={() => {
                  if (skill.type === SkillType.PhysicalAllAttack) {
                    context.updateActionCommand({
                      ...context.actionCommand,
                      content: skill,
                      target: {
                        type: CharacterType.AllEnemy,
                        index: 0,
                      },
                    })

                    return
                  }

                  context.updateUIFocusStatus(UIFocusStatus.ENEMY_INFO)
                  context.updateActionCommand({
                    ...context.actionCommand,
                    content: skill,
                  })
                }}
              />
              <div className={'w-[200px]'}>{skill.description}</div>
              <div className={'w-[200px]'}>消費SP: {`${skill.specialPointConsumption}`}</div>
            </div>
          )
        })}
        <Button
          display='もどる'
          onClick={() => {
            context.updateUIFocusStatus(UIFocusStatus.BASIC_OPTIONS)
            context.updateActionCommand({ ...context.actionCommand, name: undefined })
          }}
        />
      </div>
    </div>
  )
}

export default SkillList
