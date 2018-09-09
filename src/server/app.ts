import * as express from 'express';
import * as path from 'path';
import { config } from './config';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import server from './tracker';
import { Request, Response } from 'express';
import * as multer from 'multer';

/** 
 * Controllers
 */
import * as LoginController from './controllers/login_controller';
import * as TorrentController from './controllers/torrent_controller';
import * as TorrentDetailController from './controllers/torrent_detail_controller';
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
const upload = multer({ storage: multer.memoryStorage() });


/**
 * Serve client app
 */
app.use('/', express.static(path.join(__dirname, '../build-client')));


/**
 * Start bittorrent tracking server
 */
const trackingServer = server();

// Custom endpoint to handle torrent authentication
app.get('/:torrentKey/announce', async (request: Request, response: Response) => {
  const torrentKey = request.params.torrentKey;

  try {
    // Remove the torrent_auth_key from the request url.
    // Before: /123456/announce=params=...
    // After:  /announce?params=...
    request.url = request.url.replace(/\/[a-z0-9]+?\/announce/, '/announce');

    // Attach torrent key to response for later use in the `filter` method of
    // the tracker.
    response.locals.torrentKey = torrentKey;

    // Forward request to tracking server
    trackingServer.onHttpRequest(request, response);
  } catch (error) {
    response.end();
  }
});

/**
 * API Endpoints
 */
app.post('/api/login', LoginController.loginUser);
app.get('/api/logout', LoginController.logoutUser);
app.post('/api/register/:inviteCode', LoginController.registerUser);

app.post('/api/torrent', authMiddleware, TorrentController.getTorrents(trackingServer));
app.put('/api/torrent', authMiddleware, upload.fields([
  { name: 'torrent_file', maxCount: 1 }
]), TorrentController.uploadTorrent);
app.get('/api/torrent/:hash', authMiddleware, TorrentController.downloadTorrent);
app.get('/api/torrent/detail/:hash', authMiddleware, TorrentDetailController.getPostDetail);

app.listen(config.port, () => console.log(`trunk API listening on port ${config.port}`));
