// React 라이브러리 임포트
import React from 'react';

/**
 * 애플리케이션 푸터 컴포넌트
 * 저작권, 제작자 정보, 사용된 기술 스택을 표시
 * 화면 하단에 고정되어 표시됨
 */
const Footer = () => {
  // 푸터 컴포넌트 렌더링
  return (
    <footer className="py-5 bg-slate-50 border-t border-slate-200"> {/* 푸터 영역 - 상단에 구분선 포함 */}
      <div className="container mx-auto px-5 max-w-4xl"> {/* 컨텐츠 중앙 배열 및 최대 크기 제한 */}
        <div className="flex justify-between items-center text-slate-500"> {/* 저작권 및 제작자 정보 라인 - 양쪽 끼로 배치 */}
          <p className="text-sm font-medium">&copy; {new Date().getFullYear()} 공감번역기</p> {/* 저작권 표시 - 현재 연도 동적 반영 */}
          <p className="text-sm">2403 신지윤</p> {/* 제작자 학번과 이름 */}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-400"> {/* 기술 스택 정보 영역 - 구분선으로 구분 */}
          <p>사용된 기술: React, Tailwind CSS, OpenAI API</p> {/* 프로젝트에 사용된 주요 기술 목록 */}
        </div>
      </div>
    </footer>
  );
};

// Footer 컴포넌트 내보내기
export default Footer;
