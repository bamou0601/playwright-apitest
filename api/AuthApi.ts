import { APIRequestContext } from '@playwright/test';

export class AuthApi {

    constructor(
        private request: APIRequestContext
    ) {}

    async login(
        username: string,
        password: string
    ) {
        return await this.request.post(
            'https://dummyjson.com/auth/login',
            {
                data: {
                    username,
                    password
                }
            }
        );

    }

}