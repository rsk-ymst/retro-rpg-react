'use client'

import React, { useContext } from 'react'
import Button from '../atoms/Button'
import { Context } from '@/app/battle/context'

export type Props = {
  className?: string
}

const EnemyArea = ({ className }: Props) => {
  const context = useContext(Context)

  return <div className={`${className}`}></div>
}

export default EnemyArea
