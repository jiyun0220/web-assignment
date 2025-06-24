import React from 'react';

// 애플리케이션 푸터 컴포넌트
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-12">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">AI 공감번역기</h3>
            <p className="text-sm text-gray-400">막 적어도 바로 전송 가능하도록</p>
          </div>
          <div className="text-sm">
            <p>© {new Date().getFullYear()} AI 공감번역기. All rights reserved.</p>
            <p className="text-gray-500 text-xs mt-1">
              이 프로젝트는 웹프로그래밍 과제를 위해 개발되었습니다.
            </p>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-700 pt-6 text-sm text-gray-500">
          <p>이 애플리케이션은 OpenAI API를 사용하여 문장 스타일을 변환합니다.</p>
          <p>사용된 기술: React, Tailwind CSS, OpenAI API</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
