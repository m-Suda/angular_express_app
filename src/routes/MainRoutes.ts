import * as express from 'express';
import { mainController } from '../controller/MainController';

class MainRoutes {

    public router: express.Router = express.Router();

    constructor() {

        this.config();
    }

    private config(): void {

        this.router.get('/fetchAll', (req: express.Request, res: express.Response) => {
            mainController.fetch_all(req, res);
        });
        this.router.post('/fetch', (req: express.Request, res: express.Response) => {
            mainController.fetch(req, res);
        });
        this.router.post('/register', (req: express.Request, res: express.Response) => {
            mainController.register(req, res);
        });
        this.router.post('/modify', (req: express.Request, res: express.Response) => {
            mainController.modify(req, res);
        });
    }
}

export const mainRoutes = new MainRoutes().router;