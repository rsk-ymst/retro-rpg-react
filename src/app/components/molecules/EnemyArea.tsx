'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useContext } from 'react'
import Button from '../atoms/Button'
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
        {
          // if (enemies[0].status.currentHitPoint === 0) {

          enemies[0].status.currentHitPoint === 0 && (
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
              <Image src='/images/enemy.png' height={200} width={200} alt={''} />
            </motion.div>
          )
          // }
        }
        {enemies[0].status.currentHitPoint > 0 && (

            //  <motion.div
            //   animate={{
            //     x: 200,
            //   }}
            //   initial={{ opacity: 1 }}
            //   whileInView={{ opacity: 1 }}
            //   transition={{ duration: 0.5 }}
            //   className={'font-bold'}
            // >
          <>
            <Image src='/images/enemy.png' height={200} width={200} alt={''} />
            <div>{enemies[0]?.status.currentHitPoint}</div>
          </>
        )}
        {/* <motion.div
          animate={{
            y: -50,
            transitionEnd: {
              display: 'none',
            },
          }}
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className={'font-bold'}
        > */}
        {/* <Image src='/images/enemy.png' height={200} width={200} alt={''} /> */}
        {/* </motion.div> */}
        {/* {enemies[0]?.status.onDamage && ( */}

      </div>
    </div>
  )
}

export default EnemyArea
