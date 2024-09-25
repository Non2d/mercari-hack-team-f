import React, { useState } from 'react';
import { Search, BotMessageSquare } from 'lucide-react';
import signInWithGoogle, { signOutUser } from '../utils/auth';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    'おすすめ',
    'マイリスト',
    'ゲーム・おもちゃ・グッズ',
    '本・雑誌・漫画',
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => window.location.href = '/'}
            >
              <BotMessageSquare className="text-gray-600" size={30} />
              <span className="text-lg font-semibold text-gray-600">LLM Product</span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="なにをお探しですか？"
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-md w-80"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user && (<span className="text-sm text-gray-600">ようこそ、{user.displayName}さん</span>)}
            <button
              onClick={() => {
                if (user) {
                  signOutUser();
                } else {
                  signInWithGoogle();
                }
              }}
              style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }} // ボタンのデフォルトスタイルをリセット
            >
              <img
                src={user?.photoURL || '/icons/google.png'} // nullの場合の代替URLを指定
                alt={`${user?.displayName}'s profile`}
                style={{ borderRadius: '50%', width: '40px', height: '40px' }}
              />
            </button>
          </div>
        </div>
        <nav className="mt-4 flex justify-center">
          <ul className="flex space-x-6 text-sm">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`pb-2 cursor-pointer font-bold ${activeIndex === index
                  ? 'text-mercariRed border-b-2 border-mercariRed'
                  : 'text-gray-600 hover:text-gray-800'
                  }`}
                onClick={() => setActiveIndex(index)}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;