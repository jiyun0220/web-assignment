import React, { useState, useEffect, useRef } from 'react';
import { FaUserFriends, FaBriefcase, FaHandshake, FaRobot, FaCopy, FaCheck } from 'react-icons/fa';

// 번역된 텍스트 출력 컴포넌트
const OutputSection = ({ translatedText, selectedStyle }) => {
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const resultRef = useRef(null);

  // 스타일에 따른 설정
  const styleConfig = {
    friend: {
      title: '친구에게',
      icon: <FaUserFriends />,
      className: 'friend-text'
    },
    boss: {
      title: '직장 상사에게',
      icon: <FaBriefcase />,
      className: 'boss-text'
    },
    date: {
      title: '낯선 사람에게',
      icon: <FaHandshake />,
      className: 'date-text'
    },
    ai: {
      title: 'AI에게',
      icon: <FaRobot />,
      className: 'ai-text'
    }
  };

  // 번역된 텍스트가 변경될 때마다 애니메이션 효과 적용
  useEffect(() => {
    if (translatedText) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [translatedText]);

  // 번역 결과를 클립보드에 복사하는 함수
  const copyToClipboard = () => {
    if (!resultRef.current) return;
    
    navigator.clipboard.writeText(translatedText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('클립보드 복사 실패:', err);
      });
  };

  // 선택된 스타일에 따른 설정 가져오기 (없으면 기본값으로 friend 사용)
  const { title, icon, className } = styleConfig[selectedStyle] || styleConfig.friend;

  return (
    <div className="mt-10 border-t border-slate-200 pt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-slate-700 flex items-center">
          <span className="mr-2 bg-slate-100 p-1.5 rounded-md">{icon}</span>
          {title} 말투로 변환
        </h3>
        <button
          onClick={copyToClipboard}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
          title="복사하기"
        >
          {copied ? (
            <span className="text-green-500 flex items-center">
              <FaCheck className="w-5 h-5 mr-1" />
              복사됨
            </span>
          ) : (
            <FaCopy className="w-5 h-5" />
          )}
        </button>
      </div>
      
      <div
        ref={resultRef}
        className={`p-5 rounded-lg bg-slate-50 shadow-sm border-l-4 border-l-slate-300 ${
          isAnimating ? 'typing-animation overflow-hidden' : ''
        }`}
      >
        <p className={`text-lg leading-relaxed ${className}`}>
          {translatedText}
        </p>
      </div>
    </div>
  );
};

export default OutputSection;
