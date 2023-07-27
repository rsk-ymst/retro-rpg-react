import React from 'react';

type Props = {
  className: string
  onClick: () => void;
}

const Button = ({ onClick, className}: Props) => {
  return (
    <button
      onClick={onClick}
      className={className}
    >
    </button>
  );
};

export default Button;
