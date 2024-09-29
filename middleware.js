const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRETKEY;

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (!token) return res.status(403).json({ message: "No token provided" });
  try {
    const decodedId = jwt.verify(token, secretKey);
    req.sellerId = decodedId.sellerId;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = verifyToken;
