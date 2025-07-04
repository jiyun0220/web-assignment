import axios from 'axios'; // axios는 HTTP 요청을 보내기 위한 라이브러리

/**
 * 입력된 텍스트를 선택한 스타일로 변환하는 함수
 * @param {string} inputText - 변환할 원본 텍스트
 * @param {string} style - 변환 스타일 (friend, boss, date, ai)
 * @returns {Promise<string>} - 변환된 텍스트
 */
export const translateText = async (inputText, style) => {
  // 모든 환경 변수를 확인합니다 - 디버깅용
  console.log('모든 환경 변수:', process.env);
  
  // .env 파일에 설정된 OpenAI API 키를 가져옵니다
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  
  // API 키가 제대로 설정되었는지 확인 (보안을 위해 첫 5자만 표시)
  console.log('API 키 상태:', apiKey ? `유효함 (시작: ${apiKey.substring(0, 5)}...)` : '없음');
  console.log('REACT_APP_OPENAI_API_KEY 직접 출력:', process.env.REACT_APP_OPENAI_API_KEY);
  
  // API 키가 없으면 오류 메시지를 반환하고 함수 실행 중단
  if (!apiKey) {
    console.error('API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.');
    return '⚠️ API 키가 설정되지 않아 변환할 수 없습니다. 환경 설정을 확인해주세요.';
  }
  // 각 변환 스타일에 맞는 지시사항(프롬프트) 설정
  const stylePrompts = {
    friend: "20~30대 친구들끼리 쓰는 최신 유행어와 밈을 자연스럽게 활용해서 변환해줘. 인스타나 카톡에서 쓰는 말투처럼 가볍고 친근하게 해줘. 필요하면 ㅋㅋㅋ, ㅠㅠ 같은 표현이나 이모티콘도 넣어.",
    boss: "회사 상사에게 보고하는 것처럼 정중하고 예의 바르게 변환해줘. 현대 비즈니스 환경에서 쓰는 자연스러운 존댓말을 사용하되, 업무 용어나 비즈니스 표현을 적절히 섞어서 전문적으로 들리게 해줘. 원래 내용의 의미를 보강해서 더 논리적이고 설득력 있게 표현해도 좋아.",
    date: "안친한 사람이나 아직 친밀하지 않은 사이에게 메세지 전하는 변환해줘. 예의와 정중함을 유지하면서도 너무 기계적이지 않게, 적당한 공손함을 표현하고 상대가 부담 없이 대화할 수 있는 말투로 만들어줘. 기본 존칭을 사용하되, 지나치게 친근하지도 않고 지나치게 단절하지도 않은 적절한 거리감을 유지하세요.",
    ai: "AI에게 명령하는 최적의 프롬프트 형식으로 변환해줘. 명확한 지시어를 사용하고 구체적인 요구사항을 포함해. 모호함을 제거하고 AI가 정확히 이해할 수 있도록 구조화된 형태로 만들어. 원래 의도를 파악해서 더 효율적인 명령어로 재구성해도 좋아."
  };

  // OpenAI에게 보낼 완전한 프롬프트 구성
  // 여기에는 원본 문장과 선택한 스타일에 대한 지시사항이 포함됨
  const prompt = `
원본 문장: "${inputText}"

위 문장을 다음 지침에 맞게 변환해주세요:
${stylePrompts[style]}

중요: 반드시 자연스러운 한국어로 변환하되, 원래 의미를 유지하면서 해당 스타일에 맞게 톤과 표현을 적절히 조절해주세요. 내용은 간결하면서도 의미 전달이 명확해야 합니다.
  `;

  // API 요청 시작
  try {
    // OpenAI API 호출 - GPT 모델에게 텍스트 변환 요청
    console.log('번역 요청 시작:', style);
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo-0125",
        messages: [
          {
            role: "system",
            content: "너는 뛰어난 한국어 네이티브 말투 변환 AI로, 2023년부터 2025년까지 가장 유행하는 한국어 밸, 유행어, 은어, 슬랭, MZ세대 표현 등을 완벽히 이해하고 사용할 수 있어. 문장 의미를 단순히 단어만 바꾸는 것이 아니라, 말하려는 의도를 파악해 자연스러운 표현으로 의역/문맵바탕 재생성하면서 상황에 적합한 여러 표현이나 유행어를 넣어줘. 기계적이거나 어색하지 않고 해당 정확한 피어그룹이 실제로 사용할 법한 자연스러운 한국어 표현을 만들어줘. 설명문이나 부가 설명은 절대 포함하지 마요. 오로지 변환된 문장만 반환하세요."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 300,
        top_p: 0.95
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    // AI가 생성한 응답에서 필요한 텍스트만 추출하여 반환
    // trim()은 앞뒤 공백을 제거함
    return response.data.choices[0].message.content.trim();
  } catch (error) { // API 요청 중 발생한 오류 처리
    console.error('API 요청 중 오류 발생:', error);
    
    // 오류 유형에 따라 사용자에게 보여줄 오류 메시지 결정
    if (error.response) { // 서버가 응답을 보낸 경우
      // 서버가 응답을 보냈지만 오류 상태 코드인 경우
      if (error.response.status === 401) {
        return '⚠️ API 키가 유효하지 않습니다. API 키를 올바르게 설정했는지 확인해주세요.';
      } else if (error.response.status === 429) {
        return '⚠️ API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.';
      } else {
        return `번역 중 오류가 발생했습니다. 오류 코드: ${error.response.status}`;
      }
    } else if (error.request) {
      // 요청은 되었지만 응답이 없는 경우
      return '⚠️ 서버에 연결할 수 없습니다. 인터넷 연결을 확인하고 다시 시도해주세요.';
    } else {
      // 기타 오류
      return `⚠️ 오류 발생: ${error.message || '알 수 없는 오류'}`;
    }
  }
};


