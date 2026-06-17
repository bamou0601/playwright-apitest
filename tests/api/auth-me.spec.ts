import { test, expect} from '@playwright/test';
import { config } from '../../config/env';

test('ユーザー情報取得', async({ request }) => {

    const loginResponse =
        await request.post(
            `${config.baseUrl}/auth/login`,
            {
                data: {
                    username: 'emilys',
                    password: 'emilyspass'
                }
            }
        );

    const　loginBody = await loginResponse.json();

    const token = loginBody.accessToken;

    const meResponse = 
        await request.get(
            `${config.baseUrl}/auth/me`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );
    
    expect(meResponse.status()).toBe(200);

});