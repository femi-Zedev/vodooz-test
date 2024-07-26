import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

const IconButton = ({ icon, onClick, isActive }: IconButtonProps) => {
  return (
    <button
      className={`px-2.5 py-2 hover:bg-orange-100/30 rounded-lg ${isActive ? 'text-orange-400' : 'text-gray-400'}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;