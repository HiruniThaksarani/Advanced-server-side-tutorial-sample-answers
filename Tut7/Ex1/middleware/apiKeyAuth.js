const API_KEY = "123456";

function apiKeyAuth(req, res, next) {
  const key = req.header("x-api-key");

  if (!key) {
    return res.status(401).json({ message: "API key missing" });
  }

  if (key !== API_KEY) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  next();
}

module.exports = apiKeyAuth;