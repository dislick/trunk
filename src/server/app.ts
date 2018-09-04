import * as express from 'express';
import * as path from 'path';
import { config } from './config';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

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
app.use(cookieParser(config.cookieSecret));
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));


/**
 * Serve client app
 */
app.use('/', express.static(path.join(__dirname, '../build-client')));

/**
 * API Endpoints
 */
app.post('/api/login', LoginController.loginUser);
app.get('/api/logout', LoginController.logoutUser);
app.post('/api/register/:inviteCode', LoginController.registerUser);

app.get('/api/posts', authMiddleware, PostController.getPosts);


app.listen(config.port, () => console.log(`trunk API listening on port ${config.port}`));
