'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useContext } from 'react'
import { Context } from '@/app/battle/context'

export type Props = {
  className?: string
}

const EnemyArea = ({ className }: Props) => {
  const context = useContext(Context)
  const enemies = context?.enemies || []

  return (
    <div className={`${className}`}>
      <div className='flex justify-center align-middle h-full items-center'>
        {enemies[0].status.currentHitPoint <= 0 && (
          <motion.div
            animate={{
              y: -30,
              transitionEnd: {
                display: 'none',
              },
            }}
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 0 }}
            transition={{ duration: 2.0 }}
            className={'font-bold'}
          >
            <Image src='/images/enemy.png' height={128} width={128} alt={''} />
          </motion.div>
        )}
        {enemies[0].status.currentHitPoint > 0 && (
          <div className='flex justify-center flex-col'>
            <div className='text-white font-bold flex justify-center mb-2'>
              <div>
                {enemies[0]?.status.currentHitPoint} / {enemies[0]?.parameter.hitPoint}
              </div>
            </div>
            <div>
              <Image src='/images/enemy2.png' height={128} width={128} alt={''} />
            </div>
          </div>
        )}
        {enemies[0]?.status.onDamage ? (
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
        ) : (
          <div className='bg-transparent text-transparent'>100</div>
        )}
      </div>
    </div>
  )
}

export default EnemyArea
