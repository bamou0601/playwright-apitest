import { test, expect } from '@playwright/test';
import { AuthApi } from '../../../api/AuthApi';
import loginData from '../../../test-data/auth/login-data.json';

/**
 * ログインAPIテスト
 *
 * テストデータは login-data.json から取得する。
 * 正常系・異常系のログイン動作を検証する。
 *
 * 作成者: 馬 猛
 * 作成日: 2026/06/17
 *

/**
 * 正常ログインテスト
 * 有効なユーザー情報でログインできることを確認する
 */
test('正常ログイン', async ({ request }) => {

    // AuthApiクラスのインスタンス生成
    const authApi = new AuthApi(request);
    const requestBody = loginData.validUser.request;

    // ログインAPI実行
    const response =
        await authApi.login(requestBody);

    //ステータスコード確認
    expect(response.status())
        .toBe(loginData.validUser.expected.status);

    //レスポンスボディ取得
    const body = await response.json();
    // console.log(body);

    // ユーザー情報検証
    // オブジェクトのプロパティが存在するかを確認する
    expect(body.id).toBeDefined();

    //一部のプロパティが一致するかを確認する
    expect(body).toMatchObject(loginData.validUser.expected.body);

    // トークン検証
    expect(body.accessToken).toBeTruthy();
    expect(body.refreshToken).toBeTruthy();


    // アクセストークンとリフレッシュトークンは動的に生成されるため、値の比較は行わず、存在するかを確認する
    delete body.accessToken;
    delete body.refreshToken;

    expect(body).toEqual(loginData.validUser.expected.body);
});

/**
 * 異常ログインテスト
 * 不正なユーザー情報でログインした場合のエラーを確認する
 */
test('異常ログイン', async ({ request }) => {

    // AuthApiクラスのインスタンス生成
    const authApi = new AuthApi(request);

    // 不正なユーザー情報でログイン
    const response =
        await authApi.login(
            loginData.invalidUser.request
        );

    // エラーステータス確認
    expect(response.status())
        .toBe(loginData.invalidUser.expected.status);

});

