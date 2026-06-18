# Playwright API Test

このリポジトリは、Playwright を使った API テストのサンプル実装です。
テストは主に `tests/api` 配下に配置されており、`UserApi` や `AuthApi` を利用して API を呼び出します。

## 構成

- `api/` - API 呼び出しを行うクラス定義
- `config/` - 環境ごとの設定を管理するモジュール
- `tests/api/` - Playwright テストケース
- `test-data/` - テストデータ JSON
- `utils/` - 補助ユーティリティ
- `playwright.config.ts` - Playwright の設定

## 前提

- Node.js がインストールされていること
- `npm` または `pnpm` などのパッケージマネージャを利用できること

## セットアップ

```bash
npm install
```

## テスト実行

```bash
npx playwright test
```

特定ファイルのみ実行する場合:

```bash
npx playwright test tests/api/auth/auth-login.spec.ts
```

## 環境切り替え

`config/env.ts` では `TEST_ENV` 環境変数を使って実行環境を切り替えます。
デフォルトは `dev` です。

```bash
TEST_ENV=qa npx playwright test
```

Windows の PowerShell では:

```powershell
$env:TEST_ENV = 'qa'
npx playwright test
```

## 作成者

- 馬 猛

## 備考

- 現在は `https://dummyjson.com` をベース URL として利用しています。
- `playwright.config.ts` に `.env` ベースの環境切り替え実装の TODO が残っています。
