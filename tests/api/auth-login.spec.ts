import { test, expect } from '@playwright/test';
import { AuthApi } from '../../api/AuthApi';

test('正常ログイン', async({ request }) => {
    const authApi = new AuthApi(request);

    const response =
        await authApi.login(
            'emilys',
            'emilyspass'
        );
      
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.username).toBe('emilys');
    expect(body.accessToken).toBeTruthy();
    
});

test('異常ログイン', async({ request }) => {
    const authApi = new AuthApi(request);

    const response = 
        await authApi.login(
            'wrong-user',
            'wrong-password'
        );

    expect(response.status()).toBe(400);

});