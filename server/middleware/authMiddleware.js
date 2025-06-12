const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const token = req.cookies.token; // Read token from cookie

  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
