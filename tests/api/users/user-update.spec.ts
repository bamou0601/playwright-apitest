import { test, expect } from '@playwright/test';
import { UserApi } from '../../api/UserApi';

test('ユーザー情報更新', async ({ request }) => {

    // UserApiクラスのインスタンス生成
    const userApi = new UserApi(request);

    const response = await userApi.updateUser(1, {
        firstName: 'Hanako'
    });

    // レスポンスの検証
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.firstName).toBe('Hanako');

});