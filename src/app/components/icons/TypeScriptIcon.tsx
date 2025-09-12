import React from 'react';

interface TypeScriptIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export const TypeScriptIcon: React.FC<TypeScriptIconProps> = ({
  className = 'inline',
  width = 22,
  height = 22
}) => {
  return (
    <img
      className={className}
      width={width}
      height={height}
      src="https://cdn-icons-png.flaticon.com/512/919/919832.png"
      alt="TypeScript logo"
    />
  );
};
