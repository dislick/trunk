import * as express from 'express';
import * as path from 'path';
import { config } from './config';
import * as bodyParser from 'body-parser';

/** 
 * Controllers
 */
import * as LoginController from './controllers/login_controller';
import * as PostController from './controllers/post_controller';
import { authMiddleware } from './middlewares/auth_middleware';

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
app.post('/login', LoginController.loginUser);
app.post('/register', LoginController.registerUser);

app.get('/posts', authMiddleware, PostController.getPosts);


app.listen(config.port, () => console.log(`trunk API listening on port ${config.port}`));
