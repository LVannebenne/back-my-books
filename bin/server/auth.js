"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function auth(request, token, role) {
  console.log(request.headers.authorization);
  console.log(token);

  if (request.headers.authorization) {
    const decode = _jsonwebtoken.default.verify(request.headers.authorization, token);

    if (role.includes(decode.role) || role == "all") {
      return decode;
    } else {
      throw new Error("unauthorised for " + decode.role);
    }
  } else {
    throw new Error('Please log in ');
  }
}

;
module.exports = auth;