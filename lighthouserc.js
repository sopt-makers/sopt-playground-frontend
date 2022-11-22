module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/projects', 'http://localhost:3000/projects/upload'],
      startServerCommand: 'npm run start',
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://shrouded-atoll-56755.herokuapp.com/app/projects',
      token: '689daa0b-ed2e-4de1-aeb5-be14c09e0c7d',
    },
  },
};
