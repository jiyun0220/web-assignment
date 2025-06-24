import React from 'react';
import { FaLanguage } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-md">
      <div className="container mx-auto p-5 max-w-4xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-slate-600 p-2 rounded-full">
              <FaLanguage className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">공감번역기</h1>
              <p className="text-sm mt-1 text-slate-300">막 적어도 바로 전송 가능하도록</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
