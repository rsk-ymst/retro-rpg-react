'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useContext } from 'react'
import { BattleState, Context } from '@/game/context'
import { ActionCharacter, EffectType } from '@/models/ActionCharacter'

export type Props = {
  className?: string
  characterName?: string
  fieldCharacter: ActionCharacter
}

const FieldPlayer = ({ characterName, className, fieldCharacter }: Props) => {
  const context = useContext(Context)

  return (
    <>
      {fieldCharacter.status.onEffect !== undefined && (
        <motion.div
          animate={{
            y: -50,
            transitionEnd: {
              display: 'none',
            },
          }}
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className={`w-[30px] ${
            fieldCharacter.status.onEffect === EffectType.Damage
              ? 'text-white'
              : fieldCharacter.status.onEffect === EffectType.HealingHP
              ? 'text-green-300'
              : fieldCharacter.status.onEffect === EffectType.HealingSP
              ? 'text-blue-500'
              : ''
          }`}
        >
          {fieldCharacter.status.onEffectPoint}
        </motion.div>
      )}
      {(context?.battleState === BattleState.PlayerSelect ||
        context?.battleState === BattleState.ActionTransaction) &&
        (fieldCharacter.status.onEffect === EffectType.Damage ? (
          <Image
            src={`/images/${characterName}/onDamage.png`}
            height={64}
            width={64}
            alt={''}
            className={`${className}`}
          />
        ) : fieldCharacter.status.currentHitPoint <= 0 ? (
          <motion.div
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <Image
              src={`/images/${characterName}/onEffect.png`}
              height={64}
              width={64}
              alt={''}
              className={`${className}`}
            />
          </motion.div>
        ) : (
          <Image
            src={`/images/${characterName}/index.png`}
            height={64}
            width={64}
            alt={''}
            className={`${className}`}
          />
        ))}

      {context?.battleState === BattleState.PlayerWin &&
        (fieldCharacter.status.currentHitPoint > 0 ? (
          <Image
            src={`/images/${characterName}/win.gif`}
            height={64}
            width={64}
            alt={''}
            className={`${className}`}
          />
        ) : (
          // 幅間調整のためのダミー
          <div className={`bg-transparent h-[64px] w-[64px] ${className}`} />
        ))}
    </>
  )
}

export default FieldPlayer
