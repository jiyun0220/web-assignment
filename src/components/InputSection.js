// React 라이브러리 및 필수 아이콘 임포트
import React from 'react';
// FontAwesome 아이콘 - 각 번역 스타일에 맞는 아이콘들 임포트
import { FaUserFriends, FaBriefcase, FaHandshake, FaRobot } from 'react-icons/fa';

/**
 * 입력 섹션 컴포넌트 - 사용자 입력과 번역 스타일 선택 기능 담당
 * @param {string} inputText - 사용자가 입력한 원본 텍스트
 * @param {function} setInputText - 입력 텍스트 상태 업데이트 함수
 * @param {string} selectedStyle - 현재 선택된 번역 스타일 (friend, boss, date, ai)
 * @param {function} setSelectedStyle - 번역 스타일 상태 업데이트 함수
 * @param {function} handleTranslate - 번역 실행 함수
 * @param {boolean} isLoading - 번역 로딩 상태
 */
const InputSection = ({ 
  inputText, 
  setInputText, 
  selectedStyle, 
  setSelectedStyle, 
  handleTranslate,
  isLoading
}) => {
  // 선택 가능한 번역 스타일 옵션 정의
  // 각 스타일은 고유 id, 표시 이름, 아이콘, 색상 값을 가짐
  const styleOptions = [
    { id: 'friend', name: '친구에게', icon: <FaUserFriends />, color: 'blue' }, // MZ 세대 친구 말투
    { id: 'boss', name: '직장 상사에게', icon: <FaBriefcase />, color: 'gray' }, // 공손하고 격식있는 말투
    { id: 'date', name: '낯선 사람에게', icon: <FaHandshake />, color: 'purple' }, // 예의바르고 친절한 말투
    { id: 'ai', name: 'AI에게', icon: <FaRobot />, color: 'green' }  // 명령어 형식의 말투
  ];

  // 입력 섹션 UI 렌더링
  return (
    <div className="mb-8">
      {/* 섹션 제목 */}
      <h2 className="text-2xl font-bold mb-4 text-slate-800">
        <span className="border-b-2 border-slate-700 pb-1">어떻게 말할까요?</span>
      </h2>
      
      {/* 사용자 입력 텍스트 영역 */}
      <div className="mb-5">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="번역할 문장을 입력하세요..."
          className="w-full p-5 border-0 rounded-lg shadow-inner bg-slate-50 focus:ring-1 focus:ring-slate-400 focus:shadow-lg h-32 transition-all duration-200"
        />
      </div>
      
      {/* 번역 스타일 선택 영역 */}
      <div className="mb-6">
        <p className="text-sm text-slate-600 mb-3 font-medium">누구에게 말하는 스타일로 바꿀까요?</p>
        <div className="flex flex-wrap gap-3">
          {/* 각 스타일 옵션을 버튼으로 표시 */}
          {styleOptions.map(option => {
            // 선택된 스타일에 따라 명시적으로 CSS 클래스를 생성
            let buttonClass = "flex items-center px-4 py-2 rounded-full transition-all duration-200 ";
            
            if (selectedStyle === option.id) {
              // 선택된 경우 해당 스타일의 테마 색상으로 버튼 스타일링
              switch(option.id) {
                case 'friend':
                  buttonClass += "bg-friend text-white font-medium border-2 border-friend";
                  break;
                case 'boss':
                  buttonClass += "bg-boss text-white font-medium border-2 border-boss";
                  break;
                case 'date':
                  buttonClass += "bg-date text-white font-medium border-2 border-date";
                  break;
                case 'ai':
                  buttonClass += "bg-ai text-white font-medium border-2 border-ai";
                  break;
                default:
                  buttonClass += "bg-blue-500 text-white font-medium";
              }
            } else {
              // 선택되지 않은 경우 기본 스타일 적용(호버 시 해당 스타일 색상 힌트 제공)
              switch(option.id) {
                case 'friend':
                  buttonClass += "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700";
                  break;
                case 'boss':
                  buttonClass += "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900";
                  break;
                case 'date':
                  buttonClass += "bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700";
                  break;
                case 'ai':
                  buttonClass += "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700";
                  break;
                default:
                  buttonClass += "bg-gray-100 text-gray-700";
              }
            }
            
            // 스타일 선택 버튼 렌더링
            return (
              <button
                key={option.id}  // React 리스트 렌더링을 위한 고유 키
                onClick={() => setSelectedStyle(option.id)}  // 클릭 시 선택된 스타일 변경
                className={buttonClass}  // 동적으로 생성된 스타일 클래스
              >
                <span className="mr-2 opacity-80">{option.icon}</span>  {/* 스타일 아이콘 */}
                <span className="font-medium">{option.name}</span>  {/* 스타일 이름 */}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* 번역 실행 버튼 */}
      <button
        onClick={handleTranslate}  // 클릭 시 번역 함수 실행
        disabled={isLoading || !inputText.trim()}  // 로딩 중이거나 입력이 없으면 비활성화
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          isLoading || !inputText.trim() 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'  // 비활성화된 상태 스타일
            : 'bg-blue-600 text-white hover:bg-blue-700'  // 활성화된 상태 스타일
        }`}
      >
        {isLoading ? (
          // 로딩 중일 때 스피너 애니메이션과 텍스트 표시
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            변환 중...
          </div>
        ) : (
          // 로딩 중이 아닐 때 기본 텍스트 표시
          '번역하기'
        )}
      </button>
    </div>
  );
};

export default InputSection;
