"use strict";

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _graphql = require("graphql");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = (0, _graphql.buildSchema)("\n    type Query {\n        hello: String\n        livre: Book\n        moi: User\n    }\n    type Book {\n        name: String\n        truc: String\n    }\n    type User {\n        username: String\n        age: Int\n    }\n");
var root = {
  hello: function hello() {
    return 'Hello world new !';
  },
  livre: function livre() {
    return {
      name: 'Patati',
      truc: 'Patata'
    };
  },
  moi: function moi() {
    return {
      username: 'PseudoTropCool',
      age: 28
    };
  }
};
var app = (0, _express["default"])();
app.use('/graphql', (0, _expressGraphql["default"])({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(process.env.PORT, function () {
  console.log("\uD83E\uDD84 Listening on PORT: ".concat(process.env.PORT));
});
/* 
graphql(schema, '{hello}', root).then((response) => {
    console.log(response);
    console.log(process.env.MY_SECRET);
}); */
//# sourceMappingURL=index.js.map