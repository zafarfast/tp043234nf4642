import {gql} from "@apollo/client";

export const GET_USER = gql`
  query findUser {
    findUser {
      _id
      email
      firstName
      lastName
      displayPicture
      posts {
        _id
        createdAt
        imageUrl
        likes {
          _id
          displayPicture
          email
          firstName
          lastName
        }
        thoughtText
        username
        comments {
          _id
          commentBody
          commentBy
          createdAt
        }
      }
      followed {
        _id
        displayPicture
        email
        firstName
        lastName
      }
      followers {
        _id
        displayPicture
        email
        firstName
        lastName
      }
    }
  }
`;

export const FIND_SINGLE_USER = gql`
query FindSingleUser($email: String!) {
  findSingleUser(email: $email) {
    _id
    displayPicture
    email
    firstName
    followed {
      firstName
      lastName
      _id
      displayPicture
      email
    }
    followers {
      _id
      email
      displayPicture
      firstName
      lastName
    }
    lastName
  }
}`;

export const FIND_SINGLE_USER_BY_ID = gql`
query FindSingleUserById($_id: ID!) {
  findSingleUserById(id: $_id) {
    _id
    displayPicture
    email
    firstName
    followed {
      firstName
      lastName
      _id
      displayPicture
      email
    }
    followers {
      _id
      email
      displayPicture
      firstName
      lastName
    }
    lastName
  }
}`;

export const FIND_POSTS = gql`
query FindPosts {
  findPosts {
    _id
    createdAt
    imageUrl
    username
    thoughtText
    displayPicture
    firstName
    isFollowed
    userID
  }
}`;

export const QUERY_USERS = gql`
  query findUsers {
    findUsers {
      _id
      email
      firstName
      lastName
      displayPicture
      posts {
        _id
        createdAt
        imageUrl
        likes {
          _id
          displayPicture
          email
          firstName
          lastName
        }
        thoughtText
        username
        comments {
          _id
          commentBody
          commentBy
          createdAt
        }
      }
      followed {
        _id
        displayPicture
        email
        firstName
        lastName
      }
      followers {
        _id
        displayPicture
        email
        firstName
        lastName
      }
    }
  }
`;
