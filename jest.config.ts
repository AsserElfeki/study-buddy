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
  //   'process.env': {

  //     DATABASE_URL: "postgres://asseradmin:UPTZH8ejejUM@146.59.87.108:3000/studybuddy?schema:public",

  //     SHADOW_DATABASE_URL: "postgres://asseradmin:UPTZH8ejejUM@146.59.87.108:3000/studybuddy_shadow?schema:public",

  //     EMAIL_SERVER_USER: "asser.elfeki@gmail.com",
  //     EMAIL_SERVER_PASSWORD: "nrzxvltfumhtwlqp",
  //     EMAIL_SERVER_HOST: "smtp.gmail.com",
  //     EMAIL_SERVER_PORT: "587",
  //     EMAIL_FROM: "asser.elfeki@gmail.com",

  //     GITHUB_ID: "82bc7a77cf6c8a3d3ab7",
  //     GITHUB_SECRET: "e50c7b4d6de87f467f9cb73768efc1dc50f3864b",

  //     GOOGLE_CLIENT_ID: "994641788896-3fbu1t9j30clqu75qlc8d15sesef8mmp.apps.googleusercontent.com",
  //     GOOGLE_CLIENT_SECRET: "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",

  //     NEXTAUTH_SECRET: "9pVY6FzWq/RQKwz7n4kHUhqFlOSeaHKzOPwfl04hyhQ:",
  //     NEXTAUTH_URL: 'http://localhost:3000/',
  //     NEXT_PUBLIC_API_URL: 'http://localhost:3000/api/',
  //     NEXT_API_URL: 'http://localhost:3000/api/',

  //     X_RapidAPI_Key: "40ce70cbe0mshea894c58706c262p1b8ad9jsn0f8b17b68fb8",


  //     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dhms6rode",
  //     NEXT_PUBLIC_CLOUDINARY_API_KEY: "268797749231342",
  //     CLOUDINARY_API_SECRET: "Oq0964nNBhXdtceDGlErtdY_Idk",

  //     CLOUDINARY_URL: "cloudinary://268797749231342:Oq0964nNBhXdtceDGlErtdY_Idk@dhms6rode",
  //     CLOUDINARY_UPLOAD_API: "https://api.cloudinary.com/v1_1/dhms6rode/"
  //   }
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
