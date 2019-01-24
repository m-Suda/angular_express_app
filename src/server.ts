import * as Express from 'express';

const app = Express();
const port = 3000;

app.get('/', (req: Express.Request, res: Express.Response) => {
    return res.send('Hello World');
});

app.listen(port, () => {
    console.log('Express app listening on port 3000!');
});

export default app;