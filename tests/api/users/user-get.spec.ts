import { test, expect } from '@playwright/test';
import { UserApi } from '../../../api/UserApi';
import getData from '../../../test-data/users/get-data.json';

/**
 * ユーザー情報取得APIテスト
 *
 * 指定した ID のユーザー情報を正常に取得できることを検証する。
 *
 * 作成者: 馬 猛
 * 作成日: 2026/06/18
 */

test('ユーザー情報取得', async ({ request }) => {

    // UserApiクラスのインスタンス生成
    const userApi = new UserApi(request);

    // ユーザー情報取得API実行
    const response = await userApi.getUser(getData.id);

    // レスポンスの検証
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(getData.expected.status);

    const body = await response.json();

    //差分チェック
    // expect(body).toMatchSnapshot(
    //     'user-1.json'
    // );
    expect(body.id).toBe(getData.id);

});