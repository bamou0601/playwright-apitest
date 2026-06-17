import { test, expect } from '@playwright/test';
import { AuthApi } from '../../api/AuthApi';
import loginData  from '../../test-data/login-data.json';

test('正常ログイン', async({ request }) => {
    const authApi = new AuthApi(request);

    const response =
        await authApi.login(
            loginData.validUser.request
        );

    expect(response.status())
        .toBe(200);

    const body = await response.json();
    console.log(body);
   
    expect(body.id).toBeTruthy();
    expect(body.username)
        .toBe(loginData.validUser.expected.username);

    expect(body.email)
        .toContain(loginData.validUser.expected.email);
    expect(body.gender)
        .toBe(loginData.validUser.expected.gender);

    expect(body.accessToken).toBeTruthy();
    expect(body.accessToken.length).toBe(360)
    
});

test('異常ログイン', async({ request }) => {
    const authApi = new AuthApi(request);

    const response = 
        await authApi.login(
            loginData.invalidUser.request
        );

    expect(response.status())
        .toBe(loginData.invalidUser.expected.status);

});