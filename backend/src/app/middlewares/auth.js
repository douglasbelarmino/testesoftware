const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.json({ message: "Token não informado", ok: false });

  const parts = authHeader.split(" ");

  if (!parts.lenght === 2)
    return res.json({ message: "Token invalido", ok: false });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.json({ message: "Token mal formado", ok: false });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.json({ message: "Token invalido", ok: false });

    req.userId = decoded.id;
    next();
  });
};
