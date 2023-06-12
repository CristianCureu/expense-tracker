const jwt = require("jsonwebtoken");
//This is a middleware function that we can add
//to the routes that we want to be protected
const verifyToken = (req, res, next) => {
  //The name of the token lives in the header
  const token = req.header("user-token");
  if (!token)
    return res.status(401).json({
      message: "Access Denied!",
    });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token!" });
  }
};

module.exports = {
  verifyToken,
};
