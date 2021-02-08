import { gql } from 'apollo-server';

const typeDefs = gql`
  type Plan {
    id: ID!
    code: String
    name: String
    monthlyCost: Float
    annualCost: Float
  }

  type Query {
    plans: [Plan]
  }
`;

export default typeDefs;
