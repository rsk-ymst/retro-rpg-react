'use client'

import Image from 'next/image'
import { useContext, useEffect } from 'react'
import ParameterItem from './ParameterItem'
import { Context } from '@/game/context'
import { ActionCharacter } from '@/models/ActionCharacter'

export type Props = {
  imageUrl: string
  character: ActionCharacter
  className: string
}

export type ItemProps = {
  key: string
  item: string
}

const parameterItem = ({ key, item }: ItemProps) => {
  return (
    <div className='flex justify-between'>
      <div className='w-[50px] bg-slate-300 pl-2 font-bold'>{key}</div>
      <div className='w-[50px] bg-slate-200 flex justify-center font-bold'>{item}</div>
    </div>
  )
}

const CharacterCard = ({ className, character }: Props) => {
  // const context = useContext(Context)
  // if (!context) throw new Error('BasicOptions context error')

  return (
    <div className={`${className} bg-white mr-2 border-radius px-2 py-2 rounded-md`}>
      <div className='flex justify-center bg-slate-300 rounded-md'>
        <Image src={`/images/${character.enName}/index.png`} height={0} width={80} alt='' />
      </div>

      <ParameterItem itemName={'ATK'} itemValue={`${character.parameter.attack}`} />
      <ParameterItem itemName={'DEF'} itemValue={`${character.parameter.defense}`} />
      <ParameterItem itemName={'SPE'} itemValue={`${character.parameter.speed}`} />
      <ParameterItem itemName={'SPA'} itemValue={`${character.parameter.specialAttack}`} />
      <ParameterItem itemName={'SPD'} itemValue={`${character.parameter.specialDefense}`} />
    </div>
  )
}

export default CharacterCard
