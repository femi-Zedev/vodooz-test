import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  ariaLabel: string
}

const IconButton = ({ icon, onClick, ariaLabel, className }: IconButtonProps) => {
  return (
    <button
      className={`${className} px-2.5 py-2`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;