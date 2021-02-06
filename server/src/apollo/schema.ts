import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Currency {
    _id: ID!
    name: String
    rate: Float
  }

  type Discount {
    id: ID!
    name: String
    amount: Float
  }

  type Region {
    _id: ID!
    name: String
    description: String
    listPrice: Float
    netPrice: Float
    discounts: [Discount]
  }

  type Plan {
    name: String
    account: String
    billinPeriod: String
    regions: [Region]
    total: Float
    currency: Float
    isActive: Boolean
    isTrial: Boolean
    trialEnd: String
    cratedOn: String
    billingDate: String
  }

  type Query {
    currencies: [Currency]
    discounts: [Discount]
    regions: [Region]
  }
`;

export default typeDefs;
