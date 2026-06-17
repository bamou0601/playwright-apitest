export const environments = {
    dev: {
        baseUrl: 'https://dummyjson.com'
    },
    qa: {
        baseUrl: 'https://dummyjson.com'
    },
    stg: {
        baseUrl: 'https://dummyjson.com'
    },
    prod: {
        baseUrl: 'https://dummyjson.com'
    },
}

const currentEnv = process.env.TEST_ENV || 'dev';

export const config =
    environments[
        currentEnv as keyof typeof environments
    ];