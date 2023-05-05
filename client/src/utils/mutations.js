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

//   mutation addComment($commentBody: String!, $commentBy: String!, $postId: ID!) {
//     addComment(commentBody: $commentBody, commentBy: $commentBy, postId: $postId) {
//       _id
//       createdAt
//       imageUrl
//       thoughtText
//       username
//     }
//   }

//   mutation deleteUser($email: String!) {
//     deleteUser(email: $email) {
//       _id
//       displayPicture
//       email
//       firstName
//       lastName
//     }
//   }

//   mutation deletePost($postId: ID!) {
//     deletePost(postId: $postId) {
//       _id
//       createdAt
//       imageUrl
//       thoughtText
//       username
//     }
//   }

//   mutation deleteComment($postId: ID!, $commentId: ID!) {
//     deleteComment(postId: $postId, commentId: $commentId) {
//       _id
//       createdAt
//       imageUrl
//       thoughtText
//       username
//     }
//   }
