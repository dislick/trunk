export const config = {
  port: process.env.PORT || 3000,
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
  jwtSecret: process.env.JWT_SECRET || 'unsecurestringthatyoushouldabsolutelychange',
  jwtCookieName: 'trunk-jwt',
  cookieSecret: process.env.COOKIE_SECRET || 'unsecurestringthatyoushouldabsolutelychange',
};
