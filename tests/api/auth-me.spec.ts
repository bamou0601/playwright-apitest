import { test, expect} from '@playwright/test';

test('ユーザー情報取得', async({ request }) => {

    const loginResponse =
        await request.post(
            'https://dummyjson.com/auth/login',
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
            'https://dummyjson.com/auth/me',
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );
    
    expect(meResponse.status()).toBe(200);

});