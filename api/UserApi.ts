import { APIRequestContext } from '@playwright/test';
import { config } from '../config/env';

/**
 * ユーザー関連の API 操作を提供するクラス。
 * ユーザー作成、取得、更新、削除の CRUD 操作を管理します。
 * 作成者: 馬 猛
 * 作成日: 2026/06/18
 */
export class UserApi {

  /**
   * Playwright の APIRequestContext を受け取り、HTTP リクエストを実行します。
   * @param request Playwright の APIRequestContext
   */
  constructor(private request: APIRequestContext) { }

  /**
   * ユーザーを作成します。
   * @param user 作成するユーザー情報
   */
  async createUser(user: {
    firstName: string;
    lastName: string;
    age: number;
  }) {
    return await this.request.post(`${config.baseUrl}/users/add`, {
      data: user,
    });
  }

  /**
   * 指定した ID のユーザー情報を取得します。
   * @param id 取得するユーザーの ID
   */
  async getUser(id: number) {
    return await this.request.get(`${config.baseUrl}/users/${id}`);
  }

  /**
   * 指定した ID のユーザー情報を更新します。
   * @param id 更新するユーザーの ID
   * @param user 変更するユーザー情報
   */
  async updateUser(id: number, user: Object) {
    return await this.request.put(`${config.baseUrl}/users/${id}`, {
      data: user,
    });
  }

  /**
   * 指定した ID のユーザーを削除します。
   * @param id 削除するユーザーの ID
   */
  async deleteUser(id: number) {
    return await this.request.delete(`${config.baseUrl}/users/${id}`);
  }
}
