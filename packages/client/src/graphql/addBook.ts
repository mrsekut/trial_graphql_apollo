import { gql } from '@apollo/client';

export const ADD_BOOK = gql`
  mutation AddBook($input: AddBookInput!) {
    addBook(input: $input) {
      id
      title
      author
    }
  }
`;
