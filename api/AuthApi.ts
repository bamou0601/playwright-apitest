import { APIRequestContext } from '@playwright/test';
import { config } from '../config/env';

export class AuthApi {

    constructor(
        private request: APIRequestContext
    ) {}

    //login(data: loginData.invalidUser)のモードに適する
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