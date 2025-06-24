module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
      },
      colors: {
        'friend': '#3B82F6', // 친구 모드 - 라이트 블루
        'boss': '#4B5563',   // 상사 모드 - 진회색
        'date': '#8B5CF6',   // 낯선 사람 모드 - 보라색
        'ai': '#10B981',     // AI 모드 - 그린
      },
      animation: {
        'typing': 'typing 2s steps(20, end)',
      },
      keyframes: {
        typing: {
          from: { width: '0' },
          to: { width: '100%' }
        }
      }
    },
  },
  plugins: [],
}
