import { test, expect } from '@playwright/test';
import { UserApi } from '../../../api/UserApi';
import updateData from '../../../test-data/users/update-data.json';

/**
 * ユーザー情報更新APIテスト
 *
 * テストデータは update-data.json から取得する。
 * 指定したユーザーの情報が正しく更新されることを検証する。
 *
 * 作成者: 馬 猛
 * 作成日: 2026/06/18
 */

test('ユーザー情報更新', async ({ request }) => {

    // UserApiクラスのインスタンス生成
    const userApi = new UserApi(request);

    const response = await userApi.updateUser(updateData.id, {
        firstName: updateData.request.firstName
    });

    // レスポンスの検証
    expect(response.status()).toBe(updateData.expected.status);

    const body = await response.json();

    expect(body.firstName).toBe(updateData.expected.firstName);

});