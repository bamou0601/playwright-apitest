import { test, expect } from '@playwright/test';
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

    // ログインしてアクセストークンを取得する
    const loginResponse =
        await request.post(
            `${config.baseUrl}/auth/login`,
            {
                data: authMeData.login.request,
            }
        );

    // ログイン成功を確認する
    expect(loginResponse.status()).toBe(authMeData.login.expected.status);

    const loginBody = await loginResponse.json();
    const token = loginBody.accessToken;

    // 取得したアクセストークンで /auth/me を呼び出す
    const meResponse =
        await request.get(
            `${config.baseUrl}/auth/me`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                },
            }
        );

    // ユーザー情報取得成功を確認する
    expect(meResponse.status()).toBe(authMeData.me.expected.status);

    const meBody = await meResponse.json();

    expect(meBody.username).toBe(authMeData.me.expected.username);

    expect(meBody.gender).toBe(authMeData.me.expected.gender);
});