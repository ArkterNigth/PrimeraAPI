require('dotenv').config();

const jwt = require("jsonwebtoken");

  
/*
    Create json web token
*/
function createToken(user) {
  const payload = user;
  return jwt.sign(payload, process.env.SECRET_TOKEN);
};

/*
    Get payload from token
*/
function getPayload(bearerToken) {
  let token = bearerToken.split(" ")[1];
  return jwt.decode(token);     
};

module.exports = {
  createToken,
  getPayload
};
