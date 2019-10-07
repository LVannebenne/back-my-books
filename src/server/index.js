import express from "express";
import  graphqlHTTP  from "express-graphql";
import { buildSchema }  from "graphql";

const schema = buildSchema(`
    type Query {
        hello: String
        livre: Book
        moi: User
    }
    type Book {
        name: String
        truc: String
    }
    type User {
        username: String
        age: Int
    }
`);

const root = { 
    hello: () => 'Hello world new !', 
    livre: () => {return {name:'Patati', truc: 'Patata'}},
    moi: () => {return {username:'PseudoTropCool', age: 28}}
};

var app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(process.env.PORT, () => {
    console.log(`🦄 Listening on PORT: ${process.env.PORT}`)
})
/* 
graphql(schema, '{hello}', root).then((response) => {
    console.log(response);
    console.log(process.env.MY_SECRET);
}); */

