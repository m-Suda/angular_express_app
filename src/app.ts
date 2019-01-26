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
        // SPAからAPIを叩くとCORSに引っかかるので設定
        // this.app.use((req, res, next) => {
        //     res.header('Access-Control-Allow-Origin', '*');
        //     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        //     next();
        // });

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/main', mainRoutes);
    }

}

export default new App().app;