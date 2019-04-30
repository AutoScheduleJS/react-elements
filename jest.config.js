module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    'react-testing-library/cleanup-after-each',
  ],
  snapshotSerializers: ['jest-emotion'],
};