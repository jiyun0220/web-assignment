import React, { useState, useEffect } from 'react'; // React 기본 기능과 훅 가져오기
import Header from './components/Header'; // 헤더 컴포넌트 가져오기
import InputSection from './components/InputSection'; // 입력 섹션 컴포넌트 가져오기
import OutputSection from './components/OutputSection'; // 출력 섹션 컴포넌트 가져오기
import HistorySection from './components/HistorySection'; // 히스토리 섹션 컴포넌트 가져오기
import Footer from './components/Footer'; // 푸터 컴포넌트 가져오기
import { translateText } from './utils/api'; // API 유틸리티 함수 가져오기

function App() {
  // 상태 관리를 위한 useState 훅 사용
  const [inputText, setInputText] = useState(''); // 사용자 입력 텍스트
  const [selectedStyle, setSelectedStyle] = useState('friend'); // 선택된 변환 스타일 (기본값: 친구)
  const [translatedText, setTranslatedText] = useState(''); // 변환된 텍스트
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 표시
  const [history, setHistory] = useState([]); // 번역 기록 저장용 배열

  // 앱이 처음 로드될 때 로컬스토리지에서 저장된 번역 기록을 불러옴
  // 빈 배열 []은 이 효과가 컴포넌트가 마운트될 때 한 번만 실행됨을 의미
  useEffect(() => {
    const savedHistory = localStorage.getItem('translationHistory'); // 'translationHistory' 키로 저장된 데이터 가져오기
    if (savedHistory) { // 저장된 데이터가 있으면
      setHistory(JSON.parse(savedHistory)); // JSON 문자열을 객체로 변환하여 상태에 설정
    }
  }, []);

  // 히스토리 상태가 변경될 때마다 로컬스토리지에 저장
  // [history] 는 이 효과가 history 상태가 변경될 때마다 실행됨을 의미
  useEffect(() => {
    localStorage.setItem('translationHistory', JSON.stringify(history)); // 객체를 JSON 문자열로 변환하여 저장
  }, [history]);

  // 텍스트 번역 처리 함수 - 사용자가 '변환하기' 버튼을 클릭하면 실행됨
  const handleTranslate = async () => {
    if (!inputText.trim()) return; // 입력값이 없으면 함수 종료

    setIsLoading(true); // 로딩 상태 시작
    try {
      // api.js의 translateText 함수를 호출하여 텍스트 변환
      const result = await translateText(inputText, selectedStyle);
      setTranslatedText(result); // 변환 결과를 상태에 저장
      
      // 새로운 히스토리 아이템 생성
      const newItem = {
        id: Date.now(), // 고유 ID 생성 (현재 시간 기반)
        original: inputText, // 원본 텍스트
        translated: result, // 변환된 텍스트
        style: selectedStyle, // 사용된 변환 스타일
        timestamp: new Date().toISOString() // 현재 시간 ISO 형식으로 저장
      };
      
      // 히스토리 배열 앞에 새 항목 추가, 최대 10개까지만 유지
      setHistory(prev => [newItem, ...prev.slice(0, 9)]); // 최대 10개 저장
    } catch (error) {
      console.error('번역 중 오류 발생:', error);
      alert('번역 중 오류가 발생했습니다.'); // 사용자에게 오류 알림
    } finally {
      setIsLoading(false); // 로딩 상태 종료 (성공/실패 여부와 상관없이)
    }
  };

  // 히스토리에서 특정 항목 삭제 함수
  const deleteHistoryItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id)); // 지정된 ID를 제외한 항목만 남김
  };

  // 히스토리에서 특정 항목 불러와서 다시 보여주는 함수
  const loadHistoryItem = (item) => {
    setInputText(item.original); // 원본 텍스트 입력창에 설정
    setSelectedStyle(item.style); // 해당 항목의 스타일로 설정
    setTranslatedText(item.translated); // 번역 결과 표시
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100"> {/* 전체 페이지 컨테이너, 최소 화면 높이 설정 */}
      <Header /> {/* 헤더 컴포넌트 */}
      
      <main className="container mx-auto p-4 max-w-4xl flex-grow"> {/* 메인 콘텐츠 영역, 가운데 정렬, 최대 너비 제한 */}
        <div className="bg-white rounded-lg p-6 mb-8 border"> {/* 입력 및 출력 섹션 포함하는 카드 */}
          <InputSection 
            inputText={inputText} 
            setInputText={setInputText}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            handleTranslate={handleTranslate}
            isLoading={isLoading}
          />
          
          {/* 번역 결과가 있을 때만 출력 섹션 표시 */}
          {translatedText && (
            <OutputSection 
              translatedText={translatedText} 
              selectedStyle={selectedStyle} 
            />
          )}
        </div>
        
        {/* 히스토리가 있을 때만 히스토리 섹션 표시 */}
        {history.length > 0 && (
          <HistorySection 
            history={history}
            loadHistoryItem={loadHistoryItem}
            deleteHistoryItem={deleteHistoryItem}
          />
        )}
      </main>
      
      <Footer /> {/* 푸터 컴포넌트 */}
    </div>
  );
}

export default App;
