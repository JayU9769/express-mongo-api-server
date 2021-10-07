module.exports = {
  sendResponse: (res, statusCode, success, message, data) => {
    return res.status(statusCode).send({
      success: success,
      message: message,
      data: data,
    });
  },
  sendValidationResponse: (res, errors) => {
    return res.status(422).send({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array()[0]
    });
  },
  sendUnauthorizedResponse: (res, data) => {
    return res.status(401).send({
      success: false,
      message: "Unauthorized access",
      data: data,
    });
  },
  sendForbiddenResponse: (res,message, data) => {
    return res.status(403).send({
      success: false,
      message: message ? message : "Forbidden access",
      data: data,
    });
  },
  sendSuccessResponse: (res, message, data) => {
    return res.status(200).send({
      success: true,
      message: message ? message : "success",
      data: data,
    });
  },
  sendFailResponse: (res, message) => {
    return res.status(404).send({
      success: false,
      message: message ? message : "unable to process data",
    });
  },
  sendCatchResponse: (res, err) => {
    return res.status(500).send({
      success: false,
      message: (typeof err === "string") ? err : (err.message ? err.message : "internal server error"),
    });
  },
  sendUserInactiveResponse: (res, message) => {
    return res.status(403).send({
      success: false,
      message: message ? message : "User is not verified",
    });
  }
};
