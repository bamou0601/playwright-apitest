import { test, expect } from '@playwright/test';
import { AuthApi } from '../../../api/AuthApi';
import { config } from '../../../config/env';
import authMeData from '../../../test-data/auth/me-data.json';

/**
 * ユーザー情報取得APIテスト
 *
 * テストデータは me-data.json から取得する。
 * ユーザー情報取得の正常系を検証する。
 *
 * 作成者: 馬 猛
 * 作成日: 2026/06/18
 */

test('ユーザー情報取得', async ({ request }) => {

    // AuthApiクラスのインスタンス生成
    const authApi = new AuthApi(request);

    // ログインAPI実行
    const loginResponse =
        await authApi.login(
            authMeData.login.request
        );

    //ステータスコード確認    
    expect(loginResponse.status())
        .toBe(authMeData.login.expected.status);

    const loginBody = await loginResponse.json();

    // ログインレスポンスからアクセストークンを取得する
    const token = loginBody.accessToken;


    // 取得したアクセストークンを使ってユーザー情報取得APIを呼び出す
    const meResponse = await authApi.getMe(token);

    // ユーザー情報取得成功を確認する
    expect(meResponse.status()).toBe(authMeData.me.expected.status);

    const meBody = await meResponse.json();

    expect(meBody.username).toBe(authMeData.me.expected.username);

    expect(meBody.gender).toBe(authMeData.me.expected.gender);
});