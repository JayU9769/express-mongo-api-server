const jwt = require("jsonwebtoken");
const {sendForbiddenResponse, sendUnauthorizedResponse} = require("../helper/responseHelper");
require("dotenv").config();
const accessTokenSecret = process.env.SECRET_TOKEN || 'youraccesstokensecret';

const verifyAdminToken = (req, res, next) => {

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return sendForbiddenResponse(res, "A token is required for authentication", {})
  }
  try {
    req.user = jwt.verify(token, accessTokenSecret);
  } catch (err) {
    return sendUnauthorizedResponse(res);
  }
  return next();
};

module.exports = verifyAdminToken;