import * as express from 'express';
import * as bodyParser from 'body-parser';
import { mainRoutes } from "./routes/MainRoutes";

class App {

    public app: express.Application;

    constructor() {

        this.app = express();
        this.config();
    }

    private config() {

        this.app.use(bodyParser.json());

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/main', mainRoutes);
    }

}

export default new App().app;