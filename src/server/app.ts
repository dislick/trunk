import * as express from 'express';
import * as path from 'path';
import { config } from './config';
import * as bodyParser from 'body-parser';

/** 
 * Controllers
 */
import * as LoginController from './controllers/login_controller';

const app = express();


/**
 * Middlewares
 */
app.use(bodyParser.json());


/**
 * Serve client app
 */
app.use('/', express.static(path.join(__dirname, '../build-client')));

/**
 * API Endpoints
 */
app.get('/login', LoginController.loginUser);
app.post('/register', LoginController.registerUser);


app.listen(config.port, () => console.log(`trunk API listening on port ${config.port}`));
