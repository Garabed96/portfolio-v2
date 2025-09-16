import React from 'react';
import Image from 'next/image';

interface PostgreSQLIconProps {
  className?: string;
}

export const PostgreSQLIcon: React.FC<PostgreSQLIconProps> = ({ className = 'inline' }) => {
  return (
    <Image
      className={className}
      width={22}
      height={22}
      src="https://www.postgresql.org/media/img/about/press/elephant.png"
      alt="PostgreSQL logo"
      unoptimized
    />
  );
};
