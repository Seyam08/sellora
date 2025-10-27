export const userTypeDefs = /* GraphQL */ `
  type Greetings {
    first: String
    last: String
  }
  type Query {
    greetings: Greetings
  }
  type User {
    id: ID!
    name: String!
  }
  type Mutation {
    createUser(name: String!): User
  }
  type Mutation {
    updateUser(name: String): User
  }
`;
