export const config = {
  port: process.env.PORT || 3000,
  trackerPort: process.env.TRACKER_PORT || 6969,

  // Please do not include a / at the end of the URL
  announceUrlBase: process.env.ANNOUNCE_URL || 'http://192.168.178.21:3000',

  // Authentification
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
  jwtSecret: process.env.JWT_SECRET || 'insecurestringthatyoushouldabsolutelychange',
  jwtCookieName: 'trunk-jwt',
  cookieSecret: process.env.COOKIE_SECRET || 'insecurestringthatyoushouldabsolutelychange',
};
