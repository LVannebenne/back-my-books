"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const auth = async (ctx, token, role) => {
  if (ctx.request.header.authorization) {
    const decode = await _jsonwebtoken.default.verify(ctx.request.header.authorization, token);

    if (role.includes(decode.role) || role == "all") {
      return decoded;
    } else {
      throw new Error("unauthorised for " + decode.role + "user");
    }
  } else {
    throw new Error('Please log in ');
  }
};

exports.auth = auth;