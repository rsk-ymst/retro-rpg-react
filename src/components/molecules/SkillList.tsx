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

  const targetFieldPlayer = context.fieldPlayers[context.currentFieldPlayerIndex]
  const fieldPlayerSkills = targetFieldPlayer.skills

  return (
    <div className={`${className} flex justify-start text-white`}>
      <div className='flex-[2] justify-start flex-col mt-2 font-bold w-full overflow-y-auto '>
        <div className=''>
          {fieldPlayerSkills.map((skill, i) => {
            return (
              <div key={i} className='flex'>
                <Button
                  className={'w-[200px]'}
                  display={skill.name}
                  onClick={() => {
                    if (skill.type === SkillType.PhysicalAllAttack) {
                      context.fieldPlayers[context.currentFieldPlayerIndex].status.command = skill.name
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

                    context.updateActionCommand({
                      ...context.actionCommand,
                      content: skill,
                    })
                    context.updateUIFocusStatus(UIFocusStatus.ENEMY_INFO)
                  }}
                />
                <div className={'w-[250px]'}>{skill.description}</div>
                <div className={'w-[100px] ml-5'}>SP: {`${skill.specialPointConsumption}`}</div>
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
      <div className='flex-[0.8] border-l-2'>
        <div className='mt-2 ml-2'>
          <div>{`${targetFieldPlayer.name}`}</div>
          <div>{`SP: ${targetFieldPlayer.status.currentSpecialPoint} / ${targetFieldPlayer.parameter.specialPoint}`}</div>
        </div>
      </div>
    </div>
  )
}

export default SkillList
