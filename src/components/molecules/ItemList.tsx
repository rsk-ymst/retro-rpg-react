'use client'

import React, { useContext } from 'react'
import Button from '../atoms/Button'
import { Context, UIFocusStatus } from '@/game/context'

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

const ItemList = ({ className }: Props) => {
  const context = useContext(Context)
  if (!context) throw new Error('items context error')

  return (
    <div className={`${className} flex justify-start text-white`}>
      <div className='flex-[2] justify-start flex-col mt-2 font-bold w-full overflow-y-auto '>
        <div className=''>
          {context.items.map((item, i) => {
            return (
              <div key={i} className='flex'>
                <Button
                  className={'w-[200px]'}
                  display={item.name}
                  onClick={() => {
                    context.updateActionCommand({
                      ...context.actionCommand,
                      content: item,
                    })
                    context.updateUIFocusStatus(UIFocusStatus.USER_INFO)
                  }}
                  selectable={true}
                />
                <div className={'w-[250px]'}>{item.description}</div>
                <div className={'w-[100px] ml-5'}>X {`${item.count}`}</div>
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
    </div>
  )
}

export default ItemList
