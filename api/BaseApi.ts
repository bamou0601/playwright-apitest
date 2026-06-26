import { APIRequestContext, APIResponse } from "@playwright/test";
import { config } from "../config/env";
import { allure } from "allure-playwright";
import { ContentType } from "allure-js-commons";

/**
 * API共通クラス
 *
 * 全APIの共通処理を管理する。
 * Request/ResponseをAllureへ自動添付する。
 *
 * 作成者：馬 猛
 * 作成日：2026/06/25
 */

export class BaseApi {

    constructor(
        protected request: APIRequestContext
    ) { }

    //GET
    protected async get(
        endpoint: string,
        headers: Record<string, string> = {}
    ) {
        return await this.send(
            "GET",
            endpoint,
            undefined,
            headers
        );
    }

    //POST
    protected async post(
        endpoint: string,
        body?: any,
        headers: Record<string, string> = {}
    ) {
        return await this.send(
            "POST",
            endpoint,
            body,
            headers
        );
    }

    //PUT
    protected async put(
        endpoint: string,
        body?: any,
        headers: Record<string, string> = {}
    ) {
        return await this.send(
            "PUT",
            endpoint,
            body,
            headers
        );
    }

    //PATCH
    protected async patch(
        endpoint: string,
        body?: any,
        headers: Record<string, string> = {}
    ) {
        return await this.send(
            "PATCH",
            endpoint,
            body,
            headers
        );
    }

    //DELETE
    protected async delete(
        endpoint: string,
        headers: Record<string, string> = {}
    ) {
        return await this.send(
            "DELETE",
            endpoint,
            undefined,
            headers
        );
    }

    /**
     * 共通HTTP送信処理
     *
     * - エンドポイントを環境設定の baseUrl と結合する
     * - リクエスト/レスポンス情報をAllureに添付し、テスト結果の可視化を強化する
     * - HTTPメソッドごとにPlaywrightのRequestContext APIを呼び出す
     * - JSONとしてパースできるレスポンスはJSON形式で、そうでない場合はテキストとして扱う
     *
     * これにより各APIクラスはHTTPメソッドの実装に依存せず、
     * ビジネスロジックに集中できる
     */
    private async send(
        method: string,
        endpoint: string,
        body?: any,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {

        const url = `${config.baseUrl}${endpoint}`;

        // デフォルトヘッダー
        const requestHeaders = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...headers
        };

        // リクエスト情報を組み立てる
        // - BaseUrl とエンドポイントを結合する
        // - ヘッダーとボディを含めてAllureへ添付する
        const requestInfo = {
            method: method,
            URL: url,
            Headers: requestHeaders,
            Body: body
        };

        await allure.step("Request", async () => {
            await allure.attachment(
                "Request",
                JSON.stringify(requestInfo, null, 2),
                ContentType.JSON
            );
        });

        // Execute
        // API呼び出しを実行する
        // - 実行時間を計測する
        // - 後でレスポンス情報に含める
        const start = Date.now();

        let response: APIResponse;

        switch (method) {
            case "GET":
                response = await this.request.get(url, {
                    headers: requestHeaders
                });
                break;

            case "POST":
                response = await this.request.post(url, {
                    headers: requestHeaders,
                    data: body
                });
                break;

            case "PUT":
                response = await this.request.put(url, {
                    headers: requestHeaders,
                    data: body
                });
                break;

            case "PATCH":
                response = await this.request.patch(url, {
                    headers: requestHeaders,
                    data: body
                });
                break;

            case "DELETE":
                response = await this.request.delete(url, {
                    headers: requestHeaders
                });
                break;

            default:
                // 未対応メソッドは早期に失敗させる
                throw new Error(`Unsupported HTTP Method : ${method}`);

        }

        // API呼び出しに要した時間を計測する
        const duration = Date.now() - start;

        // レスポンスボディをパースする
        // - JSONとして解釈できる場合はオブジェクトに変換する
        // - そうでない場合はテキスト形式を保持する
        let responseBody: any;
        const responseText = await response.text();

        try {
            responseBody = responseText
                ? JSON.parse(responseText) : {};
        } catch {
            responseBody = responseText;
        }

        // レスポンス情報を整理してAllureへ添付する
        // - ステータス、ヘッダー、実行時間、ボディを含める
        const responseInfo = {
            Status: response.status(),
            StatusText: response.statusText(),
            Duration: `${duration} ms(${(duration / 1000).toFixed(2)} s)`,
            Headers: response.headers(),
            Body: responseBody
        };

        await allure.step("Response", async () => {
            await allure.attachment(
                "Response",
                JSON.stringify(responseInfo, null, 2),
                ContentType.JSON
            );
        });

        // 呼び出し元ではAPIResponseをそのまま扱う
        return response;
    }

}

