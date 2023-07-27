'use client'

import React from 'react'
import Button from '../atoms/Button'

export type Props = {
  className?: string
  enemyName?: string
  enemyNumber?: Option[]
  isFocus?: boolean
}

export type Option = {
  display_name: string
  onClick: () => void
}

const EnemyInfo = ({ className, enemyName, enemyNumber }: Props) => {
  return (
    <div className={`${className}`}>
      <div className='flex flex-col mt-2 ml-4 text-white font-bold'>
        <Button className={'text-start'} display={'バグA'}/>
        {/* {options.map((option, key) => (
          // <div key={key}>
          <Button key={key} className={'text-start'} display={option.display_name} onClick={option.onClick} />
          // </div>
        ))} */}
      </div>
    </div>
  )
}

export default EnemyInfo
