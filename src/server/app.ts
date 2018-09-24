import * as express from 'express';
import * as path from 'path';
import { config } from './config';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import server from './tracker';
import { Request, Response } from 'express';
import * as multer from 'multer';
import * as fallback from 'express-history-api-fallback';

/** 
 * Controllers
 */
import * as LoginController from './controllers/login_controller';
import * as TorrentController from './controllers/torrent_controller';
import * as TorrentDetailController from './controllers/torrent_detail_controller';
import { authMiddleware } from './middlewares/auth_middleware';

/**
 * Support for Phusion Passenger 
 * https://www.phusionpassenger.com/library/
 *
 * We need to disable auto install because trunk creates multiple HTTP servers
 * (the web server that serves the client and API, and the bittorrent tracker).
 */
declare var PhusionPassenger;
const isPhusionPassenger = typeof(PhusionPassenger) !== 'undefined';
if (isPhusionPassenger) {
  PhusionPassenger.configure({ autoInstall: false });
}


const app = express();


/**
 * Middlewares
 */
app.use(bodyParser.json());
app.use(cookieParser(config.cookieSecret));
app.use(cors({
  origin: config.corsUrl,
  credentials: true,
}));
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10000000, // 10 MB
    files: 1, // Amount of files
    fields: 10,
  }
});


/**
 * Start bittorrent tracking server
 */
const trackingServer = server();

// Custom endpoint to handle torrent authentication
app.get('/:torrentKey/announce', async (request: Request, response: Response) => {
  const torrentKey = request.params.torrentKey;

  try {
    // Remove the torrent_auth_key from the request url.
    // Before: /123456/announce?params=...
    // After:  /announce?params=...
    request.url = request.url.replace(/\/[a-z0-9]+?\/announce/, '/announce');

    // Attach torrent key to response for later use in the `filter` method of
    // the tracker.
    response.locals.torrentKey = torrentKey;

    // Forward request to tracking server
    trackingServer.onHttpRequest(request, response);
  } catch (error) {
    response.status(401).end();
  }
});

/**
 * API Endpoints
 */
app.post('/api/login', LoginController.loginUser);
app.get('/api/logout', LoginController.logoutUser);
app.post('/api/register/:inviteCode', LoginController.registerUser);
app.get('/api/invite/:inviteCode', LoginController.validateCode);
app.get('/api/me', authMiddleware, LoginController.getPersonalInfo);

app.post('/api/torrent', authMiddleware, TorrentController.getTorrents(trackingServer));
app.put('/api/torrent', authMiddleware, upload.fields([
  { name: 'torrent_file', maxCount: 1 }
]), TorrentController.uploadTorrent);
app.get('/api/torrent/:hash', authMiddleware, TorrentController.downloadTorrent);

app.get('/api/torrent/detail/:hash', authMiddleware, TorrentDetailController.getPostDetail);
app.post('/api/torrent/detail/comment', authMiddleware, TorrentDetailController.postComment);
app.post('/api/torrent/detail/rating', authMiddleware, TorrentDetailController.postRating);

/**
 * Serve client app with history api fallback support
 */
const root = `${__dirname}/../build-client`;
app.use(express.static(root));
app.use(fallback('index.html', { root }));


if (isPhusionPassenger) {
  app.listen('passenger', () => {
    console.log('Listening on a random port assigned by Passenger');
  });
} else {
  app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
  })
}
