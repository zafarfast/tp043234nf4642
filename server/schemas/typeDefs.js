const {gql} = require("apollo-server-express");
// findUser(email: String!): User

const typeDefs = gql`
  type Query {
    findUser: User
    findUsers: [User]
    getfollowers: [User]
    getfollowed: [User]
  }

  type Mutation {
    addUser(
      email: String!
      firstName: String!
      lastName: String!
      password: String!
    ): User
    deleteUser(email: String!): User
    addPost(username: String!, thoughtText: String!, imageUrl: String!): Post
    deletePost(postId: ID!): Post
    addComment(commentBody: String!, commentBy: String!, postId: ID!): Post
    deleteComment(postId: ID!, commentId: ID!): Post
    userLogin(email: String!, password: String!): Auth
    editUser(
      email: String
      firstName: String
      lastName: String
      password: String
      displayPicture: String
    ): User
    getUserThought(thoughtText: String!): String
  }

  type Auth {
    user: User
    token: String
  }

  type User {
    _id: ID
    email: String
    firstName: String
    lastName: String
    displayPicture: String
    posts: [Post]
    followed: [User]
    followers: [User]
  }

  type Post {
    _id: ID
    username: String
    thoughtText: String
    imageUrl: String
    likes: [User]
    comments: [Comment]
    createdAt: String
  }

  type Comment {
    _id: ID
    commentBy: String
    commentBody: String
    createdAt: String
  }
`;

module.exports = typeDefs;
