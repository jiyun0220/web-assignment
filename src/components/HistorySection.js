// React 라이브러리 임포트
import React from 'react';
// 번역 스타일에 따른 아이콘과 기록 관리 관련 아이콘 임포트 
// (FaRedo: 다시 불러오기, FaTrash: 삭제 기능)
import { FaUserFriends, FaBriefcase, FaHandshake, FaRobot, FaRedo, FaTrash } from 'react-icons/fa';

/**
 * 번역 기록을 보여주는 컴포넌트
 * @param {Array} history - 저장된 번역 기록 배열(id, original, translated, style, timestamp 등의 필드를 가짔)
 * @param {Function} loadHistoryItem - 기록에서 항목을 선택하여 다시 불러오는 함수
 * @param {Function} deleteHistoryItem - 기록에서 항목을 삭제하는 함수
 */
const HistorySection = ({ history, loadHistoryItem, deleteHistoryItem }) => {
  /**
   * 타임스킬프를 읽기 쉬운 포맷으로 변환하는 함수
   * @param {number} timestamp - 번역이 이루어진 시간을 나타내는 타임스킬프(밀리초)
   * @returns {string} 형식화된 날짜 문자열 (MM/DD hh:mm 형식)
   */
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    // 월(기본이 0부터 시작하여 1 더함)/일 시:분(두 자리로 패딩) 형식으로 반환
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  /**
   * 바꾸는 말투 스타일별 UI 표시에 필요한 설정을 정의
   * 각 스타일에 따른 배경색, 텍스트 색상, 아이콘, 이름 등을 지정
   */
  const styleConfig = {
    friend: {
      title: '친구',                                       // 표시 이름
      icon: <FaUserFriends className="text-blue-500" />,        // 표시 아이콘
      bgColor: 'bg-blue-100',                              // 배경 색상 클래스
      textColor: 'text-blue-800'                           // 텍스트 색상 클래스
    },
    boss: {
      title: '상사',
      icon: <FaBriefcase className="text-gray-600" />,
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800'
    },
    date: {
      title: '낯선 사람',
      icon: <FaHandshake className="text-purple-500" />,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800'
    },
    ai: {
      title: 'AI',
      icon: <FaRobot className="text-green-500" />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800'
    }
  };

  // 기록 섹션 UI 렌더링
  return (
    <div className="mt-10 pt-2"> {/* 전체 기록 섹션 컨테이너 */}
      <div className="flex items-center justify-between mb-5">
        {/* 섹션 제목 */}
        <h3 className="text-xl font-bold text-slate-700 border-b-2 border-slate-300 pb-1">번역 기록</h3>
      </div>

      {/* 기록이 없으면 안내 메시지, 있으면 기록 목록 표시 */}
      {history.length === 0 ? (
        <p className="text-slate-500 text-sm bg-slate-50 p-4 rounded-lg text-center">번역 기록이 없습니다.</p>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2"> {/* 기록 스크롤 가능한 컨테이너 */}
          {/* 각 번역 기록 항목을 리스트로 표시 */}
          {history.map((item, index) => {
            // 현재 항목의 스타일에 해당하는 UI 정보 가져오기(없으면 기본값 friend 사용)
            const styleData = styleConfig[item.style] || styleConfig.friend;

            // 각 번역 기록 항목 렌더링
            return (
              <div key={index} className="p-4 bg-white border border-slate-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                {/* 항목 상단의 스타일 라벨과 시간, 관리 버튼 표시 */}
                <div className="flex justify-between items-center mb-2">
                  {/* 스타일 라벨 - 해당 스타일에 맞는 색상과 아이콘 적용 */}
                  <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${styleData.bgColor} ${styleData.textColor}`}>
                    <span className="mr-1.5">{styleData.icon}</span>
                    {styleData.title}
                  </span>
                  <div className="flex items-center gap-2">
                    {/* 번역이 이루어진 시간 표시 */}
                    <span className="text-xs text-slate-500">{formatDate(item.timestamp)}</span>
                    {/* 관리 버튼(재사용, 삭제) */}
                    <div className="flex space-x-1">
                      {/* 다시 불러오기 버튼 - 해당 번역을 현재 업데이트 */}
                      <button 
                        onClick={() => loadHistoryItem(item)} 
                        className="text-slate-600 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition-colors"
                        title="다시 사용하기"
                      >
                        <FaRedo className="w-3.5 h-3.5" />
                      </button>
                      {/* 삭제 버튼 - 해당 번역 기록을 삭제 */}
                      <button
                        onClick={() => deleteHistoryItem(item.id)}
                        className="text-slate-600 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                        title="삭제하기"
                      >
                        <FaTrash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* 원본 텍스트 - 한 줄로 제한(line-clamp-1) */}
                <div className="text-sm text-slate-700 mb-1.5 line-clamp-1">{item.original}</div>
                {/* 번역된 텍스트 - 두 줄로 제한(line-clamp-2) */}
                <div className="text-sm font-medium text-slate-900 line-clamp-2">{item.translated}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  ); // HistorySection 렌더링 종료
};

export default HistorySection;
