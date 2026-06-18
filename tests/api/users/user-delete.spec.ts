import { test, expect } from '@playwright/test';
import { UserApi } from '../../../api/UserApi';

test('ユーザー削除', async ({ request }) => {

    // UserApiクラスのインスタンス生成
    const userApi = new UserApi(request);

    const response = await userApi.deleteUser(1);

    // レスポンスの検証
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.isDeleted)
        .toBeTruthy();

});