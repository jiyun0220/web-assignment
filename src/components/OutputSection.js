// React와 필요한 훅(hooks)들을 가져옵니다
import React, { useState, useEffect, useRef } from 'react';
// 아이콘 컴포넌트들을 가져옵니다 - Font Awesome의 React 버전
import { FaUserFriends, FaBriefcase, FaHandshake, FaRobot, FaCopy, FaCheck } from 'react-icons/fa';

// 번역된 텍스트를 출력하는 컴포넌트
// translatedText: 번역된 텍스트 내용
// selectedStyle: 선택된 번역 스타일 (friend, boss, date, ai)
const OutputSection = ({ translatedText, selectedStyle }) => {
  // 텍스트 복사 상태를 관리하는 상태 변수
  const [copied, setCopied] = useState(false);
  // 애니메이션 상태를 관리하는 상태 변수 
  const [isAnimating, setIsAnimating] = useState(false);
  // 결과 텍스트가 보여지는 DOM 요소에 접근하기 위한 참조
  const resultRef = useRef(null);

  // 각 스타일별 설정을 정의한 객체
  // 각 스타일마다 제목, 아이콘, CSS 클래스를 가짐
  const styleConfig = {
    friend: {
      title: '친구에게',  // 화면에 표시될 제목
      icon: <FaUserFriends />,  // 친구 아이콘
      className: 'friend-text'  // 적용될 CSS 클래스
    },
    boss: {
      title: '직장 상사에게',
      icon: <FaBriefcase />,  // 브리프케이스 아이콘
      className: 'boss-text'
    },
    date: {
      title: '낯선 사람에게',
      icon: <FaHandshake />,  // 손잡이 아이콘
      className: 'date-text'
    },
    ai: {
      title: 'AI에게',
      icon: <FaRobot />,  // 로봇 아이콘
      className: 'ai-text'
    }
  };

  // 번역된 텍스트가 변경될 때마다 타이핑 애니메이션 효과 적용
  // [translatedText]는 이 효과가 translatedText가 변경될 때마다 실행됨을 의미
  useEffect(() => {
    if (translatedText) {  // 번역 결과가 있을 때만 애니메이션 적용
      setIsAnimating(true);  // 애니메이션 상태 켜기
      const timer = setTimeout(() => {
        setIsAnimating(false);  // 1.5초 후 애니메이션 상태 끄기
      }, 1500);  // 1.5초 = 1500밀리초
      return () => clearTimeout(timer);  // 컴포넌트 언마운트 시 타이머 제거(메모리 누수 방지)
    }
  }, [translatedText]);

  // 번역 결과를 클립보드에 복사하는 함수
  const copyToClipboard = () => {
    // resultRef가 존재하지 않는 경우 함수 실행 중단
    if (!resultRef.current) return;
    
    // 웹 API를 사용하여 번역된 텍스트를 클립보드에 복사
    navigator.clipboard.writeText(translatedText)
      .then(() => {
        // 복사 성공시 copied 상태를 true로 설정
        setCopied(true);
        // 2초 후에 copied 상태를 false로 돌리기
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        // 복사 실패시 오류 로그 출력
        console.error('클립보드 복사 실패:', err);
      });
  };

  // 선택된 스타일에 따른 설정 가져오기 
  // 올바른 스타일이 없는 경우에는 기본값으로 friend 스타일 사용
  // 구조 분해(destructuring) 문법으로 필요한 값만 추출
  const { title, icon, className } = styleConfig[selectedStyle] || styleConfig.friend;

  // 출력 컴포넌트 렌더링
  return (
    <div className="mt-10 border-t border-slate-200 pt-8">
      {/* 출력 섹션 컨테이너 - 상단 구분선 포함 */}
      <div className="flex items-center justify-between mb-4">
        {/* 제목과 복사 버튼을 담은 헤더 */}
        <h3 className="text-xl font-bold text-slate-700 flex items-center">
          {/* 스타일에 따른 아이콘 */}
          <span className="mr-2 bg-slate-100 p-1.5 rounded-md">{icon}</span>
          {title} 말투로 변환
        </h3>
        {/* 복사 버튼 */}
        <button
          onClick={copyToClipboard}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
          title="복사하기"
        >
          {copied ? (
            // 복사 완료 상태일 때 로고와 텍스트 표시
            <span className="text-green-500 flex items-center">
              <FaCheck className="w-5 h-5 mr-1" />
              복사됨
            </span>
          ) : (
            // 복사 전 상태일 때 복사 아이콘 표시
            <FaCopy className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {/* 결과 텍스트 컨테이너 */}
      <div
        ref={resultRef}
        className={`p-5 rounded-lg bg-slate-50 shadow-sm border-l-4 border-l-slate-300 ${
          // 애니메이션 상태일 때만 typing-animation 클래스 적용
          isAnimating ? 'typing-animation overflow-hidden' : ''
        }`}
      >
        {/* 번역 결과 텍스트 - 스타일별 클래스 적용 */}
        <p className={`text-lg leading-relaxed ${className}`}>
          {translatedText}
        </p>
      </div>
    </div>
  );
};

export default OutputSection;
