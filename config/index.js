module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  debug: process.env.NODE_ENV !== 'production',
  databaseUrl: process.env.DATABASE_URL,
};
