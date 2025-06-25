// React 라이브러리 임포트
import React from 'react';
// 언어/번역 관련 아이콘 임포트
import { FaLanguage } from 'react-icons/fa';

/**
 * 애플리케이션 헤더 컴포넌트
 * 공감번역기 타이틀과 설명을 표시하는 컴포넌트
 * 기본 그레이디언트 배경과 아이콘을 포함
 */
const Header = () => {
  // 헤더 컴포넌트 렌더링
  return (
    <header className="bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-md"> {/* 그레이디언트 배경과 색상 설정 */}
      <div className="container mx-auto p-5 max-w-4xl"> {/* 컨텐츠 영역 중앙 배열 및 최대 폭 제한 */}
        <div className="flex justify-between items-center"> {/* 헤더 내부 요소 배열 */}
          <div className="flex items-center gap-3"> {/* 로고와 제목 그룹화 */}
            <div className="bg-slate-600 p-2 rounded-full"> {/* 아이콘 배경 원형 배경 */}
              <FaLanguage className="text-2xl text-white" /> {/* 언어/번역 아이콘 */}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">공감번역기</h1> {/* 애플리케이션 제목 */}
              <p className="text-sm mt-1 text-slate-300">막 적어도 바로 전송 가능하도록</p> {/* 애플리케이션 서브 타이틀 */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Header 컴포넌트 내보내기
export default Header;
