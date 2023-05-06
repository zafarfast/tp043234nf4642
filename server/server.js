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


const typeDefs = gql`
type Query
{
  findUser(email: String!): User
  findUsers: [User]
  getfollowers: [User]
  getfollowed: [User]

}


type Mutation {
  addUser(email:String!, firstName: String!, lastName: String!, password:String!): User
  deleteUser(email:String!): User
  addPost(username:String!, thoughtText: String!, imageUrl: String!): Post
  deletePost(postId: ID!): Post  
  addComment(commentBody:String!, commentBy: String!, postId: ID!): Post
  deleteComment(postId:ID!, commentId:ID!): Post
  userLogin(username:String!, password:String!) : Boolean  editUser(userId: ID!, email:String!, firstName: String!, lastName: String!, password:String!): User

}

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
      const a = await User.findOne({ email: args.email }).populate({
        path: 'posts', populate: {
          path: 'comments'
        }, select: '-__v'
      });
      console.log(a)
      return a
    },
    findUsers: async () => {
      console.log('Request received')
      const a = await User.find({}).populate({
        path: 'posts', populate: {
          path: 'comments'
        }, select: '-__v'
      });
      return a
    },
    getfollowers: async (_, args) => {
      const a = await User.findOne({ email: args.email }).populate({path: 'followers', select: '-__v' });
      console.log(a)
      return a
    },
    getfollowed: async (_, args) => {
      const a = await User.findOne({ email: args.email }).populate({path: 'followers', select: '-__v' });
      console.log(a)
      return a
    }


  },

  Mutation: {

    //create a new user
    addUser: async (parent, args) => {
      return User.create({
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        password: args.password,
        displayPicture: 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg',
        posts: [],
        followers: [],
        followed: [],
      });
    },

    editUser: async (parent, args) => {

      const update = {}

      if(args.password == "") {
        console.log("Not updating password");
        update = {
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName,
        }
      } else {
        update = {
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName,
          password: args.password,
            // displayPicture: 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg',

        }
      }

      return User.findOneAndUpdate(
        {
          _id: args.userId
        },
        update
      );

      // email: args.email,
      // firstName: args.firstName,
      // lastName: args.lastName,
      // password: args.password,
      // displayPicture: 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg',
      // posts: [],
      // followers: [],
      // followed: [],
    },

    //delete user from the database
    deleteUser: async (parent, args) => {
      return User.deleteOne({ email: args.email });
    },

    addPost: async (parent, args) => {
      //create a new post in the database
      const newPost = await Post.create({
        username: args.username,
        thoughtText: args.thoughtText,
        imageUrl: args.imageUrl,
      })

      // add the post to User profile
      const findUser = await User.find({ email: args.username })
      findUser[0].posts.push(newPost._id)
      findUser[0].save()

      return newPost;
    },

    deletePost: async (parent, args) => {
      return Post.deleteOne({ _id: args.postId });
    },

    // add comment to the post
    addComment: async (parent, args) => {
      const findPost = await Post.find({ username: args.email })
      const newComment = {
        commentBody: args.commentBody,
        commentBy: args.commentBy,
      }
      findPost[0].comments.push(newComment)
      findPost[0].save()

      return findPost[0];
    },

    deleteComment: async (parent, args) => {
      const result = await Post.findOneAndUpdate(
        { _id: args.postId },
        { $pull: { comments: {_id: args.commentId} } },
        { new: true },
      )      
      return result;
    },

    userLogin: async(parent, args) => {
      console.log(args)
      const isLoginValid = false
      const findUser = await User.find({email: args.username})
      console.log(findUser[0])
      if (findUser[0].email ===  args.username && findUser[0].password === args.password)
      { return true } else {return false}
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