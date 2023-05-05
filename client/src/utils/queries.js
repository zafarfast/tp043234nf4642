import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
query findUser($email: String!) {
    findUser(email: $email) {
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