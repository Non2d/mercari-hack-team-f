import React from 'react';
import { Home, Search, Camera, Archive, User } from 'lucide-react';

const MobileFooter: React.FC = () => {
  return (
    <footer className="bg-white p-4 fixed bottom-0 w-full">
      <div className="flex justify-between">
        <div className="flex flex-col items-center">
          <Home size={24} />
          <span className="text-xs">ホーム</span>
        </div>
        <div className="flex flex-col items-center">
          <Search size={24} />
          <span className="text-xs">さがす</span>
        </div>
        <div className="flex flex-col items-center">
          <Camera size={24} />
          <span className="text-xs">出品</span>
        </div>
        <div className="flex flex-col items-center">
          <Archive size={24} />
          <span className="text-xs">断捨離</span>
        </div>
        <div className="flex flex-col items-center">
          <User size={24} />
          <span className="text-xs">マイページ</span>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;