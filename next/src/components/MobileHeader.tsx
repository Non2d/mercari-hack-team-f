import React from 'react';

interface MobileHeaderProps {
  title: string;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ title }) => {
  return (
    <header className="bg-white p-4 flex justify-between items-center border-b border-gray-300">
      <div className="flex justify-center items-center w-full">
        <span>{title}</span>
      </div>
    </header>
  );
};

export default MobileHeader;