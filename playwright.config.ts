import { defineConfig } from "@playwright/test";

/**
 * Playwright設定ファイル
 *
 * テスト実行時の共通設定を管理する。
 * 現在はAPIテスト専用プロジェクトとして設定している。
 *
 * 作成者: 馬 猛
 * 作成日: 2026/06/17
 */
export default defineConfig({

    /**
     * テストコードの配置ディレクトリ
     */
    testDir: './tests',

    /**
     * 実行対象プロジェクト
     * APIテスト用プロジェクト
     */
    projects: [
        {
            name: 'api'
        }
    ]

    /**
 * TODO:
 * dotenvを利用した環境分離を実装する
 * - .env.dev
 * - .env.qa
 * - .env.stg
 * - .env.prod
 */
//     dotenv.config({
//   path: `.env.${process.env.TEST_ENV || 'dev'}`
// });

// export default defineConfig({

//   use: {
//     baseURL: process.env.BASE_URL
//   }
});