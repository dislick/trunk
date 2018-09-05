export const config = {
  port: process.env.PORT || 3000,
  trackerPort: process.env.TRACKER_PORT || 42069,
  announceUrl: process.env.ANNOUNCE_URL || 'http://localhost/',

  // Authentification
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
  jwtSecret: process.env.JWT_SECRET || 'insecurestringthatyoushouldabsolutelychange',
  jwtCookieName: 'trunk-jwt',
  cookieSecret: process.env.COOKIE_SECRET || 'insecurestringthatyoushouldabsolutelychange',
};
