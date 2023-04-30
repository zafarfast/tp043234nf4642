const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const db = require('./connection');
const path = require('path')
// const cors = require('cors');

const PORT = process.env.PORT || 3005;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200
// }));


const Users = [
  {
    id: 1,
    firstName: 'Zafar',
    lastName: 'Ahmed',
    email: 'zafar@hotmail.com',
    image: 'google.com',

  },
  {
    id: 2,
    firstName: 'Anna',
    lastName: 'Marcus',
    email: 'anna@hotmail.com',
    image: 'google.com',

  },
  {
    id: 3,
    firstName: 'Bryan',
    lastName: 'Fazal',
    email: 'bryan@hotmail.com',
    image: 'google.com',

  }
]
const typeDefs = gql`
type Query
{
  findUser(id: Int): Users
},
type Query
{
  findUsers: [Users]
},

type Users
{
    id: Int
    firstName: String
    lastName: String
    email: String
    image: String
}
`

const resolvers = {
  Query:
  {
    findUser: (_, args) => {
      return Users[args.id]
    },
    findUsers: () => {
      console.log('Request received')
      return Users
    }

  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
});



app.use(express.static(path.join(__dirname, '../myapp/build/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../myapp/build/index.html'));
});


db.once('open', async () => {
  await server.start()
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
})
