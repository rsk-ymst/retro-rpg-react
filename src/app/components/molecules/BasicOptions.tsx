import React from 'react';
import Button from '../atoms/Button';

export type Props = {
  options: [Option],
}

type Option = {
  display_name: string,
  onClick: () => {
    // 状態遷移的な何か
  }
}

const BasicOptions = ({options}: Props) => {
  return (
      options.map((option, key) =>
        <Button key={key} className={''} onClick={function (): void {
          throw new Error('Function not implemented.');
        } } />
      )
  )
}

export default BasicOptions
