import * as express from 'express';
import { userController } from '../controller/UserController';

class UserRoutes {

    public router: express.Router = express.Router();

    constructor() {

        this.config();
    }

    private config(): void {

        this.router.get('/fetchAll', (req: express.Request, res: express.Response) => {
            userController.fetch_all(req, res);
        });
        this.router.get('/fetch/:userId', (req: express.Request, res: express.Response) => {
            userController.fetch(req, res);
        });
        this.router.post('/register', (req: express.Request, res: express.Response) => {
            userController.register(req, res);
        });
        this.router.post('/modify', (req: express.Request, res: express.Response) => {
            userController.modify(req, res);
        });
    }
}

export const userRoutes = new UserRoutes().router;