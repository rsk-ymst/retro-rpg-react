'use client'

import React from 'react'

type Props = {
  className: string
  onClick?: () => void
  display: string
}

const Button = ({ onClick, className, display }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${className}`}
      // disabled
    >
      {display}
    </button>
  )
}

export default Button
