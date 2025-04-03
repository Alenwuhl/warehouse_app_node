
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

// JWT
export const PRIVATE_KEY = process.env.privateSessionKey;


// Token
export const generateToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" });
};

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .send({ error: "User not authenticated or missing token." });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error)
      return res.status(403).send({ error: "Token invalid, Unauthorized!" });
    req.user = credentials.user;
    next();
  });
};

//middleware fot authorization
export const authorization = (allowedRoles) => {
    return async (req, res, next) => {
      if (!req.session.user || !req.session.user.role) {
        return res.status(401).send("Unauthorized");
      }
      if (!allowedRoles.includes(req.session.user.role)) {
        return res.status(403).send("Forbidden: You don't have permission to access here");
      }
      next();
    }
  }
  