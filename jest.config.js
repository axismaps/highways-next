module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFiles: ['dotenv-flow/config'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/__mocks__/svgrMock.js',
  },
};
