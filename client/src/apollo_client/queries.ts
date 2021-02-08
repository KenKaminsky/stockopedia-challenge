import { gql } from '@apollo/client';

export const GET_DATA = gql`
  query data {
    plans {
      id
      code
      name
      monthlyCost
      annualCost
    }
  }
`;
