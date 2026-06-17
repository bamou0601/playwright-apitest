import { defineConfig } from "@playwright/test";

export default defineConfig({

    testDir: './tests',

    projects: [
        {
            name: 'api'
        }
    ]

//     dotenv.config({
//   path: `.env.${process.env.TEST_ENV || 'dev'}`
// });

// export default defineConfig({

//   use: {
//     baseURL: process.env.BASE_URL
//   }
});