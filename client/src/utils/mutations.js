import {gql} from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    addUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      _id
      displayPicture
      email
      firstName
      lastName
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost(
    $username: String!
    $thoughtText: String!
    $imageUrl: String!
  ) {
    addPost(
      username: $username
      thoughtText: $thoughtText
      imageUrl: $imageUrl
    ) {
      _id
      createdAt
      imageUrl
      thoughtText
      username
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $commentBody: String!
    $commentBy: String!
    $postId: ID!
  ) {
    addComment(
      commentBody: $commentBody
      commentBy: $commentBy
      postId: $postId
    ) {
      _id
      createdAt
      imageUrl
      thoughtText
      username
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($email: String!) {
    deleteUser(email: $email) {
      _id
      displayPicture
      email
      firstName
      lastName
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
      createdAt
      imageUrl
      thoughtText
      username
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      _id
      createdAt
      imageUrl
      thoughtText
      username
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $displayPicture: String!
  ) {
    editUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      displayPicture: $displayPicture
    ) {
      _id
      displayPicture
      email
      firstName
      lastName
    }
  }
`;

// export const USER_LOGIN = gql`
// mutation UserLogin($username: String!, $password: String!) {
//   userLogin(username: $username, password: $password)
// }`
export const ADD_FOLLOWER = gql`
mutation AddFollower($follower: ID, $addFollowerId: ID) {
  addFollower(follower: $follower, id: $addFollowerId) {
    _id
    email
    firstName
    lastName
    displayPicture
    posts {
      _id
      createdAt
      thoughtText
      imageUrl
    }
  }
}`;

export const USER_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;
