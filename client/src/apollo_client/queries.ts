import { gql } from '@apollo/client';

export const GET_CURRENCIES = gql`
  query currencies {
    currencies {
      _id
      name
      rate
    }
  }
`;
