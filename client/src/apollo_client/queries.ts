import { gql } from '@apollo/client';

export const GET_DATA = gql`
  query data {
    currencies {
      id
      name
      rate
    }
    plans {
      id
      code
      name
      monthlyCost
      annualCost
    }
  }
`;
