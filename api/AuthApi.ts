import { APIRequestContext } from '@playwright/test';
import { config } from '../config/env';

/**
 * 認証APIを操作するクラス
 * ログイン、トークン更新、ユーザー情報取得などを管理する
 * 作成者: 馬 猛
 * 作成日: 2026/06/17
 */
export class AuthApi {

     /**
     * PlaywrightのAPIRequestContextを受け取る
     * requestを使ってHTTPリクエストを送信する
     */
    constructor(
        private request: APIRequestContext
    ) {}

     /**
     * ログインAPI
     * @param user ユーザー情報
     * @param user.username ユーザー名
     * @param user.password パスワード
     * @returns ログインAPIレスポンス
     */
    async login(user: {
        username: string;
        password: string;
    }) {
        return await this.request.post(
            `${config.baseUrl}/auth/login`,
            {
                data: user
            }
        );
    }　
}