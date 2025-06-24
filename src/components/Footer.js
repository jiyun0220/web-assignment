import React from 'react';

// 애플리케이션 푸터 컴포넌트 - 화면 하단에 고정됨
const Footer = () => {
  return (
    <footer className="py-5 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-5 max-w-4xl">
        <div className="flex justify-between items-center text-slate-500">
          <p className="text-sm font-medium">&copy; {new Date().getFullYear()} 공감번역기</p>
          <p className="text-sm">2403 신지윤</p>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-400">
          <p>사용된 기술: React, Tailwind CSS, OpenAI API</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
