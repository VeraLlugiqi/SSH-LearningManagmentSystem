/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/**/*.test.ts"],
verbose: true,
forceExit: true,
};

// module.exports = {
//   roots: ['<rootDir>'],
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//   },
//   testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.tsx?$',
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
// };