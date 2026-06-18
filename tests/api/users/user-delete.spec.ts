import { test, expect } from '@playwright/test';
import { UserApi } from '../../../api/UserApi';
import deleteData from '../../../test-data/users/delete-data.json';

/**
 * ユーザー削除APIテスト
 *
 * テストデータは delete-data.json から取得する。
 * 指定したユーザーが正常に削除されることを検証する。
 *
 * 作成者: 馬 猛
 * 作成日: 2026/06/18
 */

test('ユーザー削除', async ({ request }) => {

    // UserApiクラスのインスタンス生成
    const userApi = new UserApi(request);

    const response = await userApi.deleteUser(deleteData.id);

    // レスポンスの検証
    expect(response.status()).toBe(deleteData.expected.status);

    const body = await response.json();

    expect(body.isDeleted)
        .toBeTruthy();

});