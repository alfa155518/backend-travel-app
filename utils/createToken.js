const jwt = require("jsonwebtoken");

const creteToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

module.exports = creteToken;
