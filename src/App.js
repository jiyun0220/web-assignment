import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import HistorySection from './components/HistorySection';
import Footer from './components/Footer';
import { translateText } from './utils/api';

function App() {
  const [inputText, setInputText] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('friend');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // 로컬스토리지에서 히스토리 불러오기
  useEffect(() => {
    const savedHistory = localStorage.getItem('translationHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // 히스토리 저장
  useEffect(() => {
    localStorage.setItem('translationHistory', JSON.stringify(history));
  }, [history]);

  // 번역 함수
  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      const result = await translateText(inputText, selectedStyle);
      setTranslatedText(result);
      
      // 히스토리에 추가
      const newItem = {
        id: Date.now(),
        original: inputText,
        translated: result,
        style: selectedStyle,
        timestamp: new Date().toISOString()
      };
      
      setHistory(prev => [newItem, ...prev.slice(0, 9)]); // 최대 10개 저장
    } catch (error) {
      console.error('번역 중 오류 발생:', error);
      alert('번역 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 히스토리 아이템 삭제
  const deleteHistoryItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  // 히스토리 아이템 불러오기
  const loadHistoryItem = (item) => {
    setInputText(item.original);
    setSelectedStyle(item.style);
    setTranslatedText(item.translated);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto p-4 max-w-4xl">
        <div className="bg-white rounded-lg p-6 mb-8 border">
          <InputSection 
            inputText={inputText} 
            setInputText={setInputText}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            handleTranslate={handleTranslate}
            isLoading={isLoading}
          />
          
          {translatedText && (
            <OutputSection 
              translatedText={translatedText} 
              selectedStyle={selectedStyle} 
            />
          )}
        </div>
        
        {history.length > 0 && (
          <HistorySection 
            history={history}
            loadHistoryItem={loadHistoryItem}
            deleteHistoryItem={deleteHistoryItem}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
