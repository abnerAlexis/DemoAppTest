import data from '../data/loginData.json';

export default class Config {
    readonly baseUrl: string;
    readonly username: string;
    readonly password: string;

    constructor() {
        const ENV_NAME = data.envName as 'development' | 'staging' | 'production';
        this.baseUrl = data[ENV_NAME].baseURL;
        this.username = data[ENV_NAME].username;
        this.password = data[ENV_NAME].password;
    }
}