// import { Props } from "../molecules/BasicOptions"

import { useContext, useEffect } from 'react'
import EnemyArea from '../molecules/EnemyArea'
import FieldPlayerArea from '../molecules/FieldPlayerArea'
import { Context } from '@/game/context'

export type Props = {
  className: string
}

const BattleField = ({ className }: Props) => {
  const context = useContext(Context)
  if (!context) throw new Error('BasicOptions context error')


  return (
    <div className={`${className} `}>
      <audio ref={context.mainBGMRef} loop src='/music/battle_main.mp3' />
      <audio ref={context.winBGMRef} loop src='/music/win.mp3' />
      <audio ref={context.normalAttackSERef} src='/sounds/attack.mp3' />
      <audio ref={context.chargeSERef} src='/sounds/charge.mp3' />
      <audio ref={context.specialAttackSERef} src='/sounds/special.mp3' />
      <audio ref={context.healingSERef} src='/sounds/healing.mp3' />
      <div className='flex h-full'>
        <EnemyArea className='h-full flex-1' />
        <FieldPlayerArea className='h-full flex-1' />
      </div>
    </div>
  )
}

export default BattleField
