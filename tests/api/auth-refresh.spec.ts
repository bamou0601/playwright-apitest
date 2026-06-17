import { test, expect, request } from '@playwright/test';
import { config } from '../../config/env';

test('refresh token取得', async({ request }) => {

    //login and get refreshToken
    const loginResponse = await request.post(
        'https://dummyjson.com/auth/login',
        {
            data: {
                username: 'emilys',
                password: 'emilyspass'
            }
        }
    );

    console.log(loginResponse);
    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();
    const refreshToken = loginBody.refreshToken;

    //Refresh token
    const refreshResponse = await request.post(
        `${config.baseUrl}/auth/refresh`,
        {
            data: {
                refreshToken
            }
        }
    );

    expect(refreshResponse.status()).toBe(200);

    const refreshBody = 
        await refreshResponse.json();
    console.log(refreshBody);

    expect(refreshBody.accessToken).toBeTruthy();

});