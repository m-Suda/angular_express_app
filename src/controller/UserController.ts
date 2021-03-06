import { Request, Response } from "express";
import { mstUser } from "../repository/MstUser";

export class UserController {

    public async fetch_all(req: Request, res: Response) {

        try {

            const result = await mstUser.selectAll();
            res.status(200).send({
                users: result
            });
        } catch (e) {

            console.error(e);
            res.status(500).send({
                message: 'User Fetch Failed!'
            });
        }
    }

    public async fetch(req: Request, res: Response) {

        try {

            const result = await mstUser.select(req.params.userId);
            res.status(200).send({
                user: result
            });
        } catch (e) {

            console.error(e);
            res.status(500).send({
                message: 'User Fetch Failed!'
            });
        }
    }

    public async register(req: Request, res: Response) {

        try {

            await mstUser.insert(req.body);
            res.status(200).send({
                message: 'Insert Success!'
            });
        } catch (e) {

            console.error(e);
            res.status(500).send({
                message: 'User Insert Failed!'
            });
        }
    }

    public async modify(req: Request, res: Response) {

        try {

            await mstUser.update(req.body);
            res.status(200).send({
                message: 'Update Success!'
            });
        } catch (e) {

            console.error(e);
            res.status(500).send({
                message: 'User Update Failed!'
            });
        }
    }
}

export const userController = new UserController();