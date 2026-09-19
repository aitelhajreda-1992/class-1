import React from 'react';

interface OutdoorLogoProps {
  className?: string;
  showText?: boolean;
  tagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const OutdoorLogo: React.FC<OutdoorLogoProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-8 md:h-9',
    md: 'h-12 md:h-16',
    lg: 'h-24 md:h-32',
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src="https://i.ibb.co/W4Wgys7s/Outdoors-2.png"
        alt="OUTDOOR SPORTS - Comfort • Style • Adventure"
        className={`${sizeClasses[size]} w-auto object-contain transition-transform duration-300 hover:scale-105 select-none`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
