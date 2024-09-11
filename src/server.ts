import express, { Application } from 'express';
import cors from 'cors';
import * as config from './config';
import router from './router';

const app: Application = express();
const port = config.port;

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.listen(port);
console.log(`Server listening on port ${port}`);
