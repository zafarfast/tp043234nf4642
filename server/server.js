const db = require('./connection');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path')
const addPost = require("./seed/seed")
const typeDefs = require('./schemas/typeDefs')
const resolvers = require('./schemas/resolvers')
const {authMiddleware} = require("./utils/auth")

const PORT = process.env.PORT || 3005;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.static(path.join(__dirname, '../client/build/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


db.once('open', async () => {
  await server.start()
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
})

//seed the database
addPost()