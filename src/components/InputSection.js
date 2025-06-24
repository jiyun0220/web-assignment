import React from 'react';
import { FaUserFriends, FaBriefcase, FaHandshake, FaRobot } from 'react-icons/fa';

const InputSection = ({ 
  inputText, 
  setInputText, 
  selectedStyle, 
  setSelectedStyle, 
  handleTranslate,
  isLoading
}) => {
  const styleOptions = [
    { id: 'friend', name: '친구에게', icon: <FaUserFriends />, color: 'blue' },
    { id: 'boss', name: '직장 상사에게', icon: <FaBriefcase />, color: 'gray' },
    { id: 'date', name: '낯선 사람에게', icon: <FaHandshake />, color: 'purple' },
    { id: 'ai', name: 'AI에게', icon: <FaRobot />, color: 'green' }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">
        <span className="border-b-2 border-slate-700 pb-1">어떻게 말할까요?</span>
      </h2>
      
      <div className="mb-5">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="번역할 문장을 입력하세요..."
          className="w-full p-5 border-0 rounded-lg shadow-inner bg-slate-50 focus:ring-1 focus:ring-slate-400 focus:shadow-lg h-32 transition-all duration-200"
        />
      </div>
      
      <div className="mb-6">
        <p className="text-sm text-slate-600 mb-3 font-medium">누구에게 말하는 스타일로 바꿀까요?</p>
        <div className="flex flex-wrap gap-3">
          {styleOptions.map(option => {
            // 선택된 스타일에 따라 명시적으로 클래스를 지정
            let buttonClass = "flex items-center px-4 py-2 rounded-full transition-all duration-200 ";
            
            if (selectedStyle === option.id) {
              // 선택된 경우 색상별 배경 지정 및 텍스트를 흰색이 아닌 더 잘 보이는 색상으로 변경
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
              // 선택되지 않은 경우
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
            
            return (
              <button
                key={option.id}
                onClick={() => setSelectedStyle(option.id)}
                className={buttonClass}
              >
                <span className="mr-2 opacity-80">{option.icon}</span>
                <span className="font-medium">{option.name}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      <button
        onClick={handleTranslate}
        disabled={isLoading || !inputText.trim()}
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          isLoading || !inputText.trim() 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            변환 중...
          </div>
        ) : (
          '번역하기'
        )}
      </button>
    </div>
  );
};

export default InputSection;
