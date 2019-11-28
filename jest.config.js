module.exports = {
  rootDir: 'src',
  verbose: true,
  testRegex: '.test.js$',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['**/*.{js}', '!**/*.test.{js}']
}
