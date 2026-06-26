import { APIRequestContext } from '@playwright/test';
//import { config } from '../config/env';
import { BaseApi } from "./BaseApi";

/**
 * 認証APIを操作するクラス
 * ログイン、トークン更新、ユーザー情報取得などを管理する
 * 作成者: 馬 猛
 * 作成日: 2026/06/17
 */
export class AuthApi extends BaseApi {

    /**
    * BaseApiへAPIRequestContextを渡す
    *
    * BaseApiで共通HTTP処理
    * (Request/Response記録・Allure添付・HTTP通信)
    * を利用するためのコンストラクタ
    */
    constructor(request: APIRequestContext) {
        super(request);
    }

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
        return this.post("/auth/login", user);
    }

    /**
     * 認証済みユーザー情報を取得します。
     * @param accessToken 認証ヘッダーに付与するアクセストークン
     * @returns ユーザー情報取得APIのレスポンス
     */
    async getMe(accessToken: string) {
        return this.get(
            "/auth/me",
            {
                Authorization: `Bearer ${accessToken}`
            }
        );
    }

    /**
     * リフレッシュトークンを送信し、新しいアクセストークンを取得します。
     * @param refreshToken リフレッシュに使用するトークン
     * @returns リフレッシュAPIのレスポンス
     */
    async refreshToken(refreshToken: string) {
        return this.post(
            "/auth/refresh",
            {
                refreshToken
            }
        );
    }
}