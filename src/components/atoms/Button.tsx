'use client'

import Image from 'next/image'
import React from 'react'

type Props = {
  className?: string
  onClick?: () => void
  display: string
  disabled?: boolean
}

const Button = ({ onClick, className, display, disabled }: Props) => {
  const onClick2 = () => {
    if (onClick != undefined) {
      onClick()
    }

    const audio = new Audio('/sounds/decide.mp3')
    audio.play()
  }

  return (
    <>
      <button onClick={onClick2} className={`${className} flex group/edit`} disabled={disabled}>
        <span className={`invisible ${disabled ? '' : 'group-hover/edit:visible'} mt-1 mr-1`}>
          <Image src={`/images/cursor2.png`} height={20} width={20} alt={''} />
        </span>
        <div>{display}</div>
      </button>
    </>
  )
}

export default Button
