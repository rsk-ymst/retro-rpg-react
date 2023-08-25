'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useContext } from 'react'
import { Context } from '@/game/context'
import { ActionCharacter } from '@/models/ActionCharacter'
import './enemy.css'

export type Props = {
  className?: string
  enemy?: ActionCharacter
  index: number
}

const Enemy = ({ className, enemy, index }: Props) => {
  const context = useContext(Context)
  if (!context || !enemy) throw new Error('enemy context error')

  const currentEnemyIndex = context.currentEnemyIndex
  const isFocus = currentEnemyIndex === index

  return (
    <motion.div
      animate={{
        x: 150,
      }}
      transition={{ duration: 0.3 }}
      className={'font-bold text-white'}
    >
      <div className={`${className} flex items-center`}>
        {enemy.status.currentHitPoint > 0 && (
          <div className='flex flex-col items-center'>
            <div className='text-white font-bold flex mb-2'>
              <div>
                {enemy?.status.currentHitPoint} / {enemy.parameter.hitPoint}
              </div>
            </div>
            <div className={isFocus ? 'custom-blink' : ''}>
              <Image src='/images/enemy2.png' height={128} width={128} alt={''} />
            </div>
          </div>
        )}
        {enemy.status.currentHitPoint <= 0 && (
          <motion.div
            animate={{
              y: -30,
            }}
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className={'font-bold'}
          >
            <Image src='/images/enemy.png' height={128} width={128} alt={''} />
          </motion.div>
        )}
        {enemy.status.onDamage ? (
          <motion.div
            animate={{
              y: -50,
              transitionEnd: {
                display: `${enemy.status.currentHitPoint <= 0 ? '' : 'none'}`, // 敵が複数いるときのレイアウト崩れを防ぐ
              },
            }}
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className={'font-bold text-white'}
          >
            <div className='w-10'>
              {enemy.status.onDamagePoint}
            </div>
          </motion.div>
        ) : (
          <div className='bg-transparent text-transparent w-10'>100</div>
        )}
      </div>
    </motion.div>
  )
}

export default Enemy
