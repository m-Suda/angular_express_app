import { Client } from "pg";

export class Postgres {

    private client: Client;

    constructor(host: string, database: string, user: string, password: string) {
        this.client = new Client({
            host: host,
            database: database,
            user: user,
            password: password
        });
    }

    public async connect() {

        await this.client.connect();
    }

    public async query(query: string, param: any[] = []) {

        return (await this.client.query(query, param)).rows;
    }

    public async end() {

        await this.client.end();
    }

}