module.exports = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[LOGGER] ${timestamp} ${req.method} ${req.originalUrl}`);
  next();
};
