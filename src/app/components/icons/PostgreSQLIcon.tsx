import React from 'react';

interface PostgreSQLIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export const PostgreSQLIcon: React.FC<PostgreSQLIconProps> = ({
  className = 'mx-1 inline',
  width = 22,
  height = 22
}) => {
  return (
    <img
      className={className}
      width={width}
      height={height}
      src="https://www.postgresql.org/media/img/about/press/elephant.png"
      alt="PostgreSQL logo"
    />
  );
};
