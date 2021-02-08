import { gql } from 'apollo-server';

const typeDefs = gql`
  type Currency {
    id: ID!
    name: String
    rate: Float
  }

  type Plan {
    id: ID!
    code: String
    name: String
    monthlyCost: Float
    annualCost: Float
  }

  type Query {
    currencies: [Currency]
    plans: [Plan]
  }
`;

export default typeDefs;
