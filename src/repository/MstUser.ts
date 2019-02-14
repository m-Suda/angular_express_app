import * as config from '../settings/config';
import { Postgres } from "../database/Postgres";

class MstUser {

    public readonly COLUMNS: string[] = [
        'userId',
        'userName',
        'createDate',
        'createUser',
        'updateDate',
        'updateUser',
        'isDelete'
    ];

    public async selectAll() {

        const db: Postgres = new Postgres(config.host, config.database, config.dbUser, config.dbUserPassword);
        db.connect();

        const sql: string = `
          SELECT user_id, user_name, create_date, create_user, update_date, update_user
          FROM mst_user
          WHERE is_delete = 0
        `;

        try {
            return await db.query(sql);
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            db.end();
        }
    }

    public async select(userId: string) {

        const db: Postgres = new Postgres(config.host, config.database, config.dbUser, config.dbUserPassword);
        db.connect();

        const sql: string = `
          SELECT user_id, user_name, create_date, create_user, update_date, update_user
          FROM mst_user
          WHERE user_id = $1
            AND is_delete = 0
        `;
        const param = [ userId ];

        try {
            return await db.query(sql, param);
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            db.end();
        }
    }

    public async insert(body) {

        const db: Postgres = new Postgres(config.host, config.database, config.dbUser, config.dbUserPassword);
        db.connect();

        const sql: string = `
          INSERT INTO mst_user (user_id, user_name, create_date, create_user, update_date, update_user)
          VALUES ($1, $2, to_char(now(), 'YYYYMMDDHH24MISS'), $3, to_char(now(), 'YYYYMMDDHH24MISS'), $4);
        `;
        const param = [
            body.userId,
            body.userName,
            body.createUser,
            body.updateUser
        ];

        try {
            await db.query(sql, param);
            return true;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            db.end();
        }
    }

    public async update(body) {

        // userIdが無い場合はError
        if (!body.hasOwnProperty('userId')) {
            throw new Error('Does not UserID');
        }

        const db: Postgres = new Postgres(config.host, config.database, config.dbUser, config.dbUserPassword);
        db.connect();

        var query: string = 'UPDATE mst_user SET ';
        // UPDATEのSET以下にbodyで渡ってきた値のみを更新対象にする処理
        for (let i = 0; i < this.COLUMNS.length; i++) {
            let name = this.COLUMNS[ i ];
            // userId, createDate, createUserは更新しない
            // updateDateはSQLの方で値を入れる。
            if (name === 'userId' ||
                name === 'createDate' ||
                name === 'createUser' ||
                name === 'updateDate'
            ) {
                continue;
            }
            // bodyに無い値は更新しない
            if (!body.hasOwnProperty(name)) {
                continue;
            }
            query += this.createUpdateColumn(body, name);
        }

        query += "update_date = to_char(now(), 'YYYYMMDDHH24MISS') WHERE user_id = $1";
        const param = [ body.userId ];

        console.log(query);

        try {
            await db.query(query, param);
            return true;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            db.end();
        }
    }

    private createUpdateColumn(body: object, name: string): string {

        let updateQuery: string = '';

        switch (name) {
            case 'userName':
                updateQuery = `user_name ='${body[ name ]}', `;
                break;

            case 'isDelete':
                updateQuery = `is_delete ='${body[ name ]}', `;
                break;

            case 'updateUser':
                updateQuery = `update_user ='${body[ name ]}', `;
                break;

            default:
                break;
        }

        return updateQuery;
    }
}

export const mstUser = new MstUser();