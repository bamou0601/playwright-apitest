import { test, expect, request } from '@playwright/test';
import { AuthApi } from '../../api/AuthApi';
import { loginData } from '../../test-data/LoginData';

for (const data of loginData) {

    test(
        `login-${data.username}`,
        async({ request }) => {
            
            const authApi = new AuthApi(request);

            const response =
                await authApi.login(
                    data.username,
                    data.password
                );
            
            expect(response.status())
            .toBe(data.expectedStatus);    
        }
    );

}