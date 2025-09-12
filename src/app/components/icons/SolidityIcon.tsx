import React from 'react';

interface SolidityIconProps {
  className?: string;
}

export const SolidityIcon: React.FC<SolidityIconProps> = ({
  className = '-m-1 h-9 w-9 fill-white'
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1300 1300"
      xmlSpace="preserve"
    >
      <path opacity=".45" d="M773.772 253.308 643.068 485.61H381.842l130.614-232.302h261.316" />
      <path opacity=".6" d="M643.068 485.61h261.318L773.772 253.308H512.456L643.068 485.61z" />
      <path
        opacity=".8"
        d="M512.456 717.822 643.068 485.61 512.456 253.308 381.842 485.61l130.614 232.212z"
      />
      <path opacity=".45" d="m513.721 1066.275 130.704-232.303h261.318l-130.705 232.303H513.721" />
      <path opacity=".6" d="M644.424 833.973H383.107l130.613 232.303h261.317L644.424 833.973z" />
      <path
        opacity=".8"
        d="M775.038 601.761 644.424 833.973l130.614 232.303 130.704-232.303-130.704-232.212z"
      />
    </svg>
  );
};
