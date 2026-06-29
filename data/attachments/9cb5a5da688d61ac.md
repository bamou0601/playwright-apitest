# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\users\user-delete.spec.ts >> ユーザー削除
- Location: tests\api\users\user-delete.spec.ts:15:5

# Error details

```
Error: apiRequestContext.delete: getaddrinfo ENOTFOUND dummyjson.comusers
Call log:
  - → DELETE https://dummyjson.comusers/1
    - user-agent: Playwright/1.61.0 (x64; windows 10.0) node/24.16
    - accept: application/json
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json

```

# Test source

```ts
  73  |             headers
  74  |         );
  75  |     }
  76  | 
  77  |     //DELETE
  78  |     protected async delete(
  79  |         endpoint: string,
  80  |         headers: Record<string, string> = {}
  81  |     ) {
  82  |         return await this.send(
  83  |             "DELETE",
  84  |             endpoint,
  85  |             undefined,
  86  |             headers
  87  |         );
  88  |     }
  89  | 
  90  |     /**
  91  |      * 共通HTTP送信処理
  92  |      *
  93  |      * - エンドポイントを環境設定の baseUrl と結合する
  94  |      * - リクエスト/レスポンス情報をAllureに添付し、テスト結果の可視化を強化する
  95  |      * - HTTPメソッドごとにPlaywrightのRequestContext APIを呼び出す
  96  |      * - JSONとしてパースできるレスポンスはJSON形式で、そうでない場合はテキストとして扱う
  97  |      *
  98  |      * これにより各APIクラスはHTTPメソッドの実装に依存せず、
  99  |      * ビジネスロジックに集中できる
  100 |      */
  101 |     private async send(
  102 |         method: string,
  103 |         endpoint: string,
  104 |         body?: any,
  105 |         headers: Record<string, string> = {}
  106 |     ): Promise<APIResponse> {
  107 | 
  108 |         const url = `${config.baseUrl}${endpoint}`;
  109 | 
  110 |         // デフォルトヘッダー
  111 |         const requestHeaders = {
  112 |             "Content-Type": "application/json",
  113 |             "Accept": "application/json",
  114 |             ...headers
  115 |         };
  116 | 
  117 |         // リクエスト情報を組み立てる
  118 |         // - BaseUrl とエンドポイントを結合する
  119 |         // - ヘッダーとボディを含めてAllureへ添付する
  120 |         const requestInfo = {
  121 |             method: method,
  122 |             URL: url,
  123 |             Headers: requestHeaders,
  124 |             Body: body
  125 |         };
  126 | 
  127 |         // - ヘッダーとボディを含めてAllureへ添付する
  128 |         await allure.step("Request", async () => {
  129 |             await allure.attachment(
  130 |                 "Request",
  131 |                 JSON.stringify(requestInfo, null, 2),
  132 |                 ContentType.JSON
  133 |             );
  134 |         });
  135 | 
  136 |         // Execute
  137 |         // API呼び出しを実行する
  138 |         // - 実行時間を計測する
  139 |         // - 後でレスポンス情報に含める
  140 |         const start = Date.now();
  141 | 
  142 |         let response: APIResponse;
  143 | 
  144 |         switch (method) {
  145 |             case "GET":
  146 |                 response = await this.request.get(url, {
  147 |                     headers: requestHeaders
  148 |                 });
  149 |                 break;
  150 | 
  151 |             case "POST":
  152 |                 response = await this.request.post(url, {
  153 |                     headers: requestHeaders,
  154 |                     data: body
  155 |                 });
  156 |                 break;
  157 | 
  158 |             case "PUT":
  159 |                 response = await this.request.put(url, {
  160 |                     headers: requestHeaders,
  161 |                     data: body
  162 |                 });
  163 |                 break;
  164 | 
  165 |             case "PATCH":
  166 |                 response = await this.request.patch(url, {
  167 |                     headers: requestHeaders,
  168 |                     data: body
  169 |                 });
  170 |                 break;
  171 | 
  172 |             case "DELETE":
> 173 |                 response = await this.request.delete(url, {
      |                                                     ^ Error: apiRequestContext.delete: getaddrinfo ENOTFOUND dummyjson.comusers
  174 |                     headers: requestHeaders
  175 |                 });
  176 |                 break;
  177 | 
  178 |             default:
  179 |                 // 未対応メソッドは早期に失敗させる
  180 |                 throw new Error(`Unsupported HTTP Method : ${method}`);
  181 | 
  182 |         }
  183 | 
  184 |         // API呼び出しに要した時間を計測する
  185 |         const duration = Date.now() - start;
  186 | 
  187 |         // レスポンスボディをパースする
  188 |         // - JSONとして解釈できる場合はオブジェクトに変換する
  189 |         // - そうでない場合はテキスト形式を保持する
  190 |         let responseBody: any;
  191 |         const responseText = await response.text();
  192 | 
  193 |         try {
  194 |             responseBody = responseText
  195 |                 ? JSON.parse(responseText) : {};
  196 |         } catch {
  197 |             responseBody = responseText;
  198 |         }
  199 | 
  200 |         // レスポンス情報を整理してAllureへ添付する
  201 |         // - ステータス、ヘッダー、実行時間、ボディを含める
  202 |         const responseInfo = {
  203 |             Status: response.status(),
  204 |             StatusText: response.statusText(),
  205 |             Duration: `${duration} ms(${(duration / 1000).toFixed(2)} s)`,
  206 |             Headers: response.headers(),
  207 |             Body: responseBody
  208 |         };
  209 | 
  210 |         await allure.step("Response", async () => {
  211 |             await allure.attachment(
  212 |                 "Response",
  213 |                 JSON.stringify(responseInfo, null, 2),
  214 |                 ContentType.JSON
  215 |             );
  216 |         });
  217 | 
  218 |         // 呼び出し元ではAPIResponseをそのまま扱う
  219 |         return response;
  220 |     }
  221 | 
  222 | }
  223 | 
  224 | 
```