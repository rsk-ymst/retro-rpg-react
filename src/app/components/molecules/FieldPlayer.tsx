'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useContext } from 'react'
import { BattleState, Context } from '@/app/battle/context'
import { ActionCharacter } from '@/app/models/actionCharacter'

export type Props = {
  className?: string
  characterName?: string
  fieldCharacter: ActionCharacter
}

const FieldPlayer = ({ characterName, className, fieldCharacter }: Props) => {
  const context = useContext(Context)

  return (
    <>
      {fieldCharacter.status.onDamage && (
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
          className={'font-bold text-white'}
        >
          100
        </motion.div>
      )}
      {(context?.battleState === BattleState.PlayerSelect ||
        context?.battleState === BattleState.ActionTransaction) &&
        (fieldCharacter.status.onDamage ? (
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
              src={`/images/${characterName}/onDamage.png`}
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
        fieldCharacter.status.currentHitPoint > 0 && (
          <Image
            src={`/images/${characterName}/win.gif`}
            height={64}
            width={64}
            alt={''}
            className={`${className}`}
          />
        )}
    </>
  )
}

export default FieldPlayer
