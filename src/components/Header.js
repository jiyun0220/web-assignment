import React from 'react';
import { FaLanguage } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaLanguage className="text-3xl mr-2" />
            <div>
              <h1 className="text-2xl font-bold">AI 공감번역기</h1>
              <p className="text-sm mt-1">막 적어도 바로 전송 가능하도록</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
