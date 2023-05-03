const db = require('./connection');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path')

const User = require('./models/User')
const Post = require('./models/Post')
const Comment = require('./models/Comment')
const addPost = require("./seed/seed")

const PORT = process.env.PORT || 3005;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// const Users = [
//   {
//     id: 1,
//     firstName: 'Zafar',
//     lastName: 'Ahmed',
//     email: 'zafar@hotmail.com',
//     image: './images/drinking coffee on mars.jpg',
//     thought: 'Drinking coffee on Mars'

//   },
//   {
//     id: 2,
//     firstName: 'Anna',
//     lastName: 'Marcus',
//     email: 'anna@hotmail.com',
//     image: './images/travelling the world alone.jpg',
//     thought: 'Travelling the world alone'

//   },
//   {
//     id: 3,
//     firstName: 'Bryan',
//     lastName: 'Fazal',
//     email: 'bryan@hotmail.com',
//     image: './images/hut at the lake side.jpg',
//     thought: 'Enjoying serenity at the lakeside'

//   }
// ]
const typeDefs = gql`
type Query
{
  findUser(email: String!): User
},
type Query
{
  findUsers: [User]
},

type User
{
  _id:ID
  email: String
  firstName:String
  lastName:String
  displayPicture:String
  posts: [Post]
  followed: [User]
  followers: [User]
}

type Post
{
  _id: ID
  username: String
  thoughtText: String
  imageUrl: String
  likes: [User]
  comments: [Comment]
  createdAt: String
}

type Comment
{
  _id: ID
  commentBy: String
  commentBody: String
  createdAt: String
}

`

const resolvers = {
  Query:
  {
    findUser: async (_, args) => {
      const a = await User.findOne({ email: args.email }).populate({ path: 'posts', populate : {
        path : 'comments'
      }, select: '-__v' });
      console.log(a)
      return a
    },
    findUsers: async () => {
      console.log('Request received')
      const a = await User.find({}).populate({ path: 'posts', populate : {
        path : 'comments'
      }, select: '-__v' });
      return a
    }

  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
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


addPost()