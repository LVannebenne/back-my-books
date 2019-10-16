"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDef = void 0;
// opinion resolvers
const typeDef = `
    type Opinion {
        id: ID
        comment_id: ID
        user_id: ID
        opinion: Boolean
    }
`;
exports.typeDef = typeDef;