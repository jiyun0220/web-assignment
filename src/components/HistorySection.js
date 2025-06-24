import React from 'react';
import { FaUserFriends, FaBriefcase, FaHeart, FaRobot, FaRedo, FaTrash } from 'react-icons/fa';

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
      title: '초면',
      icon: <FaHeart className="text-pink-500" />,
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-800'
    },
    ai: {
      title: 'AI',
      icon: <FaRobot className="text-green-500" />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800'
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">번역 기록</h2>
      </div>
      
      <div className="space-y-3">
        {history.map((item) => {
          const { title, icon, bgColor, textColor } = styleConfig[item.style] || styleConfig.friend;
          
          return (
            <div 
              key={item.id} 
              className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor} mr-2`}>
                    {icon} {title}
                  </span>
                  <span className="text-xs text-gray-500">{formatDate(item.timestamp)}</span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => loadHistoryItem(item)} 
                    className="text-blue-600 hover:text-blue-800 mr-2"
                    title="다시 사용하기"
                  >
                    <FaRedo className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteHistoryItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                    title="삭제하기"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-700 mb-1 line-clamp-1">{item.original}</div>
              <div className="text-sm font-medium line-clamp-2">{item.translated}</div>
            </div>
          );
        })}
        
        {history.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            번역 기록이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default HistorySection;
