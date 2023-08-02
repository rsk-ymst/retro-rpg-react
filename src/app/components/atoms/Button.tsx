'use client'

import React from 'react'

type Props = {
  className: string
  onClick?: () => void
  display: string
}

const Button = ({ onClick, className, display }: Props) => {
  const onClick2 = () => {
    if (onClick != undefined) {
      onClick()
    }

    const audio = new Audio('/sounds/decide.mp3')
    audio.play()
  }

  return (
    <>
      <button
        onClick={onClick2}
        className={`${className}`}
        // disabled
      >
        {display}
      </button>
    </>
  )
}

export default Button
