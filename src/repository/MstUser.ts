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

        const query: string = `
          SELECT userId, userName, createDate, createUser, updateDate, updateUser
          FROM MstUser
          WHERE isDelete = 0
        `;

        try {
            return await db.query(query);
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

        const query: string = `
          SELECT userId, userName, createDate, createUser, updateDate, updateUser
          FROM MstUser
          WHERE userId = $1
            AND isDelete = 0
        `;
        const param = [ userId ];

        try {
            return await db.query(query, param);
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            db.end();
        }
    }

    public async insert(values) {

        const db: Postgres = new Postgres(config.host, config.database, config.dbUser, config.dbUserPassword);
        db.connect();

        const query = `
          INSERT INTO MstUser (userId, userName, createDate, createUser, updateDate, updateUser)
          VALUES ($1, $2, to_char(now(), 'YYYYMMDDHH24MISS'), $3, to_char(now(), 'YYYYMMDDHH24MISS'), $4);
        `
        const param = [
            values.userId,
            values.userName,
            values.createUser,
            values.updateUser
        ];

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

    public async update(values) {

        // userIdが無い場合はError
        if (!values.hasOwnProperty('userId')) {
            throw new Error('Does not UserID');
        }

        const db: Postgres = new Postgres(config.host, config.database, config.dbUser, config.dbUserPassword);
        db.connect();

        var query: string = 'UPDATE MstUser SET ';
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
            if (!values.hasOwnProperty(name)) {
                continue;
            }
            query += `${name}='${values[ name ]}', `
        }

        query += "updateDate = to_char(now(), 'YYYYMMDDHH24MISS') WHERE userId = $1";
        const param = [ values.userId ];

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
}

export const mstUser = new MstUser();