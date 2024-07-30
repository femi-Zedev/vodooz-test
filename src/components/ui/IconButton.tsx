import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  ariaLabel: string
  disabled?: boolean
}

const IconButton = ({ icon, onClick, ariaLabel, className,disabled }: IconButtonProps) => {
  return (
    <button
      className={`${className} px-2.5 py-2`}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

export default IconButton;