/**
 * 環境設定を管理するモジュール
 * TEST_ENV によって dev/qa/stg/prod の設定を切り替えます。
 * 作成者: 馬 猛
 * 作成日: 2026/06/17
 */
// 各環境ごとの設定を定義します。
export const environments = {
    dev: {
        // 開発環境のベースURL
        baseUrl: 'https://dummyjson.com'
    },
    qa: {
        // 品質保証環境のベースURL
        baseUrl: 'https://dummyjson.com'
    },
    stg: {
        // ステージング環境のベースURL
        baseUrl: 'https://dummyjson.com'
    },
    prod: {
        // 本番環境のベースURL
        baseUrl: 'https://dummyjson.com'
    },
}

// 実行時の環境変数 TEST_ENV から現在の環境を決定し、デフォルトは dev に設定します。
const currentEnv = process.env.TEST_ENV || 'dev';

// currentEnv に対応する環境設定をエクスポートします。
export const config =
    environments[
    currentEnv as keyof typeof environments
    ];

