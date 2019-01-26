import { Request, Response } from "express";
import * as config from '../settings/config';

import { Postgres } from "../database/Postgres";

export class MainController {

    public async index(req: Request, res: Response) {

        const db: Postgres = new Postgres(config.host, config.database, config.dbUser, config.dbUserPassword);
        db.connect();

        const query: string = `
          SELECT user_id, user_name, create_date, create_user, update_date, update_user
          FROM mst_user
          WHERE is_delete = $1
        `;
        const param = [ 0 ];

        try {

            const result = await db.query(query, param);
            db.end();
            res.status(200).send({
                message: result
            });
        } catch (e) {

            db.end();
            console.error(e);
            res.status(500).send({
                message: 'Query Failed!'
            });
        }
    }
}

export const mainController = new MainController();