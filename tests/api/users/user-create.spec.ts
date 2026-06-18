import { test, expect } from '@playwright/test';
import { UserApi } from '../../../api/UserApi';
import createData from '../../../test-data/users/create-data.json';

/**
 * ユーザー作成APIテスト
 *
 * テストデータは create-data.json から取得する。
 * ユーザー作成の正常系を検証する。
 *
 * 作成者: 馬 猛
 * 作成日: 2026/06/18
 */

test('ユーザー作成', async ({ request }) => {

    // UserApiクラスのインスタンス生成
    const userApi = new UserApi(request);

    // ユーザー作成API実行
    const response = await userApi.createUser({
        firstName: createData.request.firstName,
        lastName: createData.request.lastName,
        age: createData.request.age
    });

    // レスポンスの検証
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(createData.expected.status);

    const body = await response.json();

    console.log(body);

    expect(body).toHaveProperty('id');
    expect(body.firstName).toBe(createData.request.firstName);
    expect(body.lastName).toBe(createData.request.lastName);
    expect(body.age).toBe(createData.request.age);
});
