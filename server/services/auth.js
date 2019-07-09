const jwt = require("express-jwt");
const jwksRSA = require("jwks-rsa");

const config = require("../config");
const NAMESPACE = config.NAMESPACE;

// Middleware
exports.checkJWT = jwt({
  secret: jwksRSA.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 50,
    jwksUri: "https://m3l6h.auth0.com/.well-known/jwks.json"
  }),
  audience: "3v8jHpE5nNT7Ipadrp2aqSj0nZs0LtbZ",
  issuer: "https://m3l6h.auth0.com/",
  algorithms: ["RS256"]
});

exports.checkRole = role => (req, res, next) => {
  const user = req.user;

  if (user && user[`${ NAMESPACE }/role`] && user[`${ NAMESPACE }/role`] === role) {
    next();
  } else {
    return res.status(401).send({ title: "Not authorized.", detail: "You are not authorized to access this data." });
  }
}