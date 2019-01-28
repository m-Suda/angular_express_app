import * as express from 'express';
import * as bodyParser from 'body-parser';
import { userRoutes } from "./routes/UserRoutes";

class App {

    public app: express.Application;

    constructor() {

        this.app = express();
        this.config();
    }

    private config() {

        this.app.use(bodyParser.json());
        // SPAからAPIを叩くとCORSに引っかかるので設定
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET, POST');
            next();
        });

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/user', userRoutes);
    }

}

export default new App().app;