'use client'

import React from 'react'

type Props = {
  className: string
  onClick?: () => void
  display: string
}

const Button = ({ onClick, className, display }: Props) => {
  const audio = new Audio("/sounds/decide.mp3")
  // audio.play()
  const onClick2 = () => {
    if (onClick != undefined) {
      onClick()
    }
    
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
      <audio src='/public/sounds/decide.mp3' />
    </>
  )
}

export default Button
