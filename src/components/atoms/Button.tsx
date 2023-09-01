'use client'

import Image from 'next/image'
import React from 'react'

type Props = {
  className?: string
  onClick?: () => void
  display: string
  selectable?: boolean
  onMouseEnter?: () => void
}

const Button = ({ onClick, className, display, selectable = true, onMouseEnter }: Props) => {
  const onClickHandler = () => {
    if (onClick != undefined) {
      onClick()
    }

    // const audio = new Audio('/sounds/decide.mp3')
    // audio.volume = 0.5
    // audio.play()
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
          <Image src={`/images/cursor2.png`} height={20} width={20} alt={''} />
        </span>
        <div>{display}</div>
      </button>
    </>
  )
}

export default Button
