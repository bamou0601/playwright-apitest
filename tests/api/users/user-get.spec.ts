import { test, expect } from '@playwright/test';
import { UserApi } from '../../../api/UserApi';

test('ユーザー情報取得', async ({ request }) => {

    // UserApiクラスのインスタンス生成
    const userApi = new UserApi(request);

    // ユーザー情報取得API実行
    const response = await userApi.getUser(1);

    // レスポンスの検証
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();

    // expect(body).toMatchSnapshot(
    //     'user-1.json'
    // );
    expect(body.id).toBe(1);

});