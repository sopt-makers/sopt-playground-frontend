module.exports = {
  ci: {
    collect: {
      url: [
        // 'http://localhost:3000/members',
        // 'http://localhost:3000/members/upload',
        // 'http://localhost:3000/members/detail',
        'http://localhost:3000/projects',
        'http://localhost:3000/projects/upload',
        'http://localhost:3000/projects/detail',
      ],
      startServerCommand: 'npm run start',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
