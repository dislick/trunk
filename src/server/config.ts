export const config = {
  port: process.env.PORT || 3000,
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
};
