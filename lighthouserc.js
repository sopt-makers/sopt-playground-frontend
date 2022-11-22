module.exports = {
  ci: {
    collect: {
      // 정적 사이트의 경우 - Lighthouse CI는 해당 경로의 정적 파일을 통해서 성능을 측정
      // staticDistDir: './public'
      url: ['http://localhost:3000/members', 'http://localhost:3000/projects', 'http://localhost:3000/projects/upload'],
      // Lighthouse가 측정을 시작하기 전에 서버를 켜는 명령어
      startServerCommand: 'yarn start',
    },
    assert: {
      assertions: {
        // performance 카테고리 점수가 90점 미만이면 warning
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1 }],
      },
    },
    upload: {
      /* Add configuration here */
      // 구글에서 제공하는 무료 스토리지로 업로드
      target: 'temporary-public-storage',
    },
  },
};
