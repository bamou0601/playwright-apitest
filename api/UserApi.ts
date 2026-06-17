import { APIRequestContext } from '@playwright/test';

export class UserApi {

  constructor(private request: APIRequestContext){}

  async createUser() {}

  async getUser() {}

  async updateUser() {}

  async deleteUser() {}
}