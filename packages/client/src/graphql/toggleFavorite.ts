import { gql } from '@apollo/client';

export const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($id: ID!) {
    toggleFavorite(id: $id) {
      id
      title
      author
      createdAt
      isFavorite
    }
  }`