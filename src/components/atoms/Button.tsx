'use client'

import Image from 'next/image'
import React, { useContext, useRef } from 'react'
import { Context } from '@/game/context'

type Props = {
  className?: string
  onClick?: () => void
  display: string
  selectable?: boolean
  onMouseEnter?: () => void
}

const Button = ({ onClick, className, display, selectable = true, onMouseEnter }: Props) => {
  const context = useContext(Context)
  if (!context) throw new Error('BasicOptions context error')

  const onClickHandler = () => {
    /* 連続してSEを再生できるように */
    if (context.selectSERef.current?.currentTime !== undefined)
      context.selectSERef.current.currentTime = 0

    context.selectSERef.current?.play()

    if (onClick != undefined) {
      onClick()
    }
  }

  return (
    <>
      <button
        onClick={onClickHandler}
        className={`${className} flex group/edit`}
        disabled={!selectable}
        onMouseEnter={onMouseEnter}
      >
        <span className={`invisible ${selectable ? 'group-hover/edit:visible' : ''} mt-1 mr-[1px]`}>
          <Image src={`/images/cursor.png`} height={20} width={20} alt={''} />
        </span>
        <div>{display}</div>
      </button>
    </>
  )
}

export default Button
