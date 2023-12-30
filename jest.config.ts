// const nextJest : require('next/jest')
import nextJest from 'next/jest';


const createJestConfig= nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig= {
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'node',
  // setupFiles: ['<rootDir>/setupEnv.js'],
  //define env vars 
  // globals: {

  // },
  coverageProvider: 'v8',
  moduleNameMapper: {
    // '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@public/(.*)$': '<rootDir>/public/$1',
    "^@lib/(.*)$": '<rootDir>/src/lib/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    // Transform TypeScript files
    '^.+\\.ts$': 'ts-jest',
  }

}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
