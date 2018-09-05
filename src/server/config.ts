export const config = {
  port: process.env.PORT || 3000,
  trackerPort: process.env.TRACKER_PORT || 420069,
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
  jwtSecret: process.env.JWT_SECRET || 'unsecurestringthatyoushouldabsolutelychange',
  jwtCookieName: 'trunk-jwt',
  cookieSecret: process.env.COOKIE_SECRET || 'unsecurestringthatyoushouldabsolutelychange',
};
