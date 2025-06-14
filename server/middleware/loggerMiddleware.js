const requestLogger = (req, res, next) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.ip;

  console.log(`[${new Date().toISOString()}]`);
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.originalUrl}`);
  console.log(`IP: ${ip}`);
  console.log(`User-Agent: ${req.headers["user-agent"]}`);
  console.log("Body:", req.body);
  console.log("------------------------------");

  next();
};

module.exports = requestLogger;
