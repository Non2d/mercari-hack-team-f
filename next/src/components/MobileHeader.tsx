import React from 'react';
import { useAuth } from '../context/AuthContext';
import signInWithGoogle, { signOutUser } from '../utils/auth';

interface MobileHeaderProps {
  title: string;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ title }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white p-4 flex justify-between items-center border-b border-gray-300">
      <div className="relative flex items-center w-full">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="text-center">{title}</span>
        </div>
        <button
          onClick={() => {
            if (user) {
              signOutUser();
            } else {
              signInWithGoogle();
            }
          }}
          style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }} // ボタンのデフォルトスタイルをリセット
          className="ml-auto"
        >
          <img
            src={user?.photoURL || '/icons/google.png'} // nullの場合の代替URLを指定
            alt={`${user?.displayName}'s profile`}
            style={{ borderRadius: '50%', width: '40px', height: '40px' }}
          />
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;