import React from 'react';
import { FaUserFriends, FaBriefcase, FaHandshake, FaRobot, FaRedo, FaTrash } from 'react-icons/fa';

// 번역 기록을 보여주는 컴포넌트
const HistorySection = ({ history, loadHistoryItem, deleteHistoryItem }) => {
  // 날짜 포맷팅 함수
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  // 각 스타일에 따른 배경색, 텍스트 색, 아이콘 설정
  const styleConfig = {
    friend: {
      title: '친구',
      icon: <FaUserFriends className="text-blue-500" />,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800'
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

  return (
    <div className="mt-10 pt-2">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold text-slate-700 border-b-2 border-slate-300 pb-1">번역 기록</h3>
      </div>

      {history.length === 0 ? (
        <p className="text-slate-500 text-sm bg-slate-50 p-4 rounded-lg text-center">번역 기록이 없습니다.</p>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {history.map((item, index) => {
            const styleData = styleConfig[item.style] || styleConfig.friend;

            return (
              <div key={index} className="p-4 bg-white border border-slate-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-center mb-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${styleData.bgColor} ${styleData.textColor}`}>
                    <span className="mr-1.5">{styleData.icon}</span>
                    {styleData.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{formatDate(item.timestamp)}</span>
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => loadHistoryItem(item)} 
                        className="text-slate-600 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition-colors"
                        title="다시 사용하기"
                      >
                        <FaRedo className="w-3.5 h-3.5" />
                      </button>
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
                
                <div className="text-sm text-slate-700 mb-1.5 line-clamp-1">{item.original}</div>
                <div className="text-sm font-medium text-slate-900 line-clamp-2">{item.translated}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistorySection;
