import { test, expect } from '@playwright/test';
import { AuthApi } from '../../../api/AuthApi';
import refreshData from '../../../test-data/auth/refresh-data.json';

/**
 * トークンリフレッシュAPIテスト
 *
 * テストデータは refresh-data.json から取得する。
 * リフレッシュトークンを使用して新しいアクセストークンを取得できることを検証する。
 *
 * 作成者: 馬 猛
 * 作成日: 2026/06/18
 */

test('refresh token取得', async ({ request }) => {

    // AuthApiクラスのインスタンス生成
    const authApi = new AuthApi(request);

    // ログインしてリフレッシュトークンを取得する
    const loginResponse = await authApi.login(refreshData.login.request);

    // ログイン成功を確認する
    expect(loginResponse.status()).toBe(refreshData.login.expected.status);

    const loginBody = await loginResponse.json();
    const refreshToken = loginBody.refreshToken;


    // リフレッシュトークンを使用して新しいアクセストークンを取得する
    const refreshResponse = await authApi.refreshToken(refreshToken);

    // リフレッシュ成功を確認する
    expect(refreshResponse.status()).toBe(refreshData.refresh.expected.status);

    const refreshBody = await refreshResponse.json();

    // 新しいアクセストークンが取得できたことを確認する
    expect(refreshBody.accessToken).toBeTruthy();

    expect(refreshBody.accessToken).toHaveLength(360);
});
