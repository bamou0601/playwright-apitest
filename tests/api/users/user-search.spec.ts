import { test, expect } from '@playwright/test';
import { UserApi } from '../../../api/UserApi';
import searchData from '../../../test-data/users/search-data.json';

test.describe("ユーザー検索API", () => {
    test("ユーザー検索John", async ({ request }) => {

        const userApi = new UserApi(request);

        const response = await userApi.searchUser(
            searchData.searchJohn.request.keyword
        );

        expect(response.status())
            .toBe(searchData.searchJohn.expected.status);

        const body = await response.json();

        expect(body.users.length)
            .toBeGreaterThan(0);

        expect(body.users.length)
            .toBeGreaterThan(0);

        expect(body.users[0].lastName)
            .toBe(searchData.searchJohn.expected.firstUser.lastName);
    });

    test("ユーザー検索Emily", async ({ request }) => {

        const userApi = new UserApi(request);

        const response = await userApi.searchUser(
            searchData.searchEmily.request.keyword
        );

        expect(response.status())
            .toBe(searchData.searchEmily.expected.status);

        const body = await response.json();

        expect(body.users.length)
            .toBeGreaterThan(0);
    });

    test("存在しないユーザー検索", async ({ request }) => {

        const userApi = new UserApi(request);

        const response = await userApi.searchUser(
            searchData.searchNotFound.request.keyword
        );

        expect(response.status())
            .toBe(searchData.searchNotFound.expected.status);

        const body = await response.json();

        expect(body.users.length)
            .toBe(0);
    });
});